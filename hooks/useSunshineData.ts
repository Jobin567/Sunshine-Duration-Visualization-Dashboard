import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  fetchHourlyData, 
  fetchDailyData, 
  fetchLocationInfo,
  ApiResponse,
  HourlyData,
  DailyData,
  LocationInfo,
  ApiError 
} from '../services/api';

export interface SunshineDataState {
  hourlyData: HourlyData[];
  dailyData: DailyData[];
  locationInfo: LocationInfo | null;
  metadata: ApiResponse<any>['metadata'] | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useSunshineData(locationId: string) {
  const [state, setState] = useState<SunshineDataState>({
    hourlyData: [],
    dailyData: [],
    locationInfo: null,
    metadata: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(15 * 60 * 1000); // 15 minutes
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const fetchData = useCallback(async (showLoading = true, isRetry = false) => {
    if (showLoading && !isRetry) {
      setState(prev => ({ ...prev, loading: true, error: null }));
    }

    try {
      // Fetch all data concurrently with timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
      });

      const [hourlyResponse, dailyResponse, locationInfo] = await Promise.race([
        Promise.all([
          fetchHourlyData(locationId),
          fetchDailyData(locationId),
          fetchLocationInfo(locationId),
        ]),
        timeoutPromise
      ]) as [ApiResponse<HourlyData>, ApiResponse<DailyData>, LocationInfo];

      setState(prev => ({
        ...prev,
        hourlyData: hourlyResponse.data,
        dailyData: dailyResponse.data,
        locationInfo,
        metadata: hourlyResponse.metadata,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      }));

      // Reset retry count on success
      retryCountRef.current = 0;

    } catch (error) {
      console.error('Error fetching sunshine data:', error);
      
      let errorMessage = 'Failed to load data. Please try again.';
      let shouldRetry = false;
      
      if (error instanceof ApiError) {
        switch (error.code) {
          case 'SERVER_ERROR':
            errorMessage = 'Server temporarily unavailable. Retrying automatically...';
            shouldRetry = true;
            break;
          case 'SERVICE_UNAVAILABLE':
            errorMessage = 'Data service briefly unavailable. Retrying...';
            shouldRetry = true;
            break;
          case 'LOCATION_NOT_FOUND':
            errorMessage = 'Location not found. Please select a different location.';
            shouldRetry = false;
            break;
          default:
            errorMessage = error.message;
            shouldRetry = false;
        }
      } else if (error instanceof Error && error.message === 'Request timeout') {
        errorMessage = 'Request timed out. Retrying...';
        shouldRetry = true;
      }

      // Auto-retry logic for temporary errors
      if (shouldRetry && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        console.log(`Retrying data fetch (attempt ${retryCountRef.current}/${maxRetries})`);
        
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, retryCountRef.current - 1) * 1000;
        setTimeout(() => {
          fetchData(false, true);
        }, delay);
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: `${errorMessage} (Attempt ${retryCountRef.current}/${maxRetries})`,
        }));
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        retryCountRef.current = 0;
      }
    }
  }, [locationId]);

  const retryFetch = useCallback(() => {
    retryCountRef.current = 0; // Reset retry count for manual retry
    fetchData(true);
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData(true);
  }, [fetchData]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      // Only auto-refresh if not currently loading and no persistent errors
      if (!state.loading && retryCountRef.current === 0) {
        fetchData(false); // Silent refresh
      }
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, fetchData, state.loading]);

  // Provide default data if fetch fails completely
  const safeData = {
    ...state,
    hourlyData: state.hourlyData.length > 0 ? state.hourlyData : generateFallbackHourlyData(),
    dailyData: state.dailyData.length > 0 ? state.dailyData : generateFallbackDailyData(),
  };

  return {
    ...safeData,
    refetch: retryFetch,
    autoRefresh,
    setAutoRefresh,
    refreshInterval,
    setRefreshInterval,
  };
}

// Fallback data generators for when API fails completely
function generateFallbackHourlyData(): HourlyData[] {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    duration: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 50),
    uvIndex: Math.max(0, Math.sin((i - 6) * Math.PI / 12) * 10),
    timestamp: new Date(2025, 7, 28, i).toISOString(),
  }));
}

function generateFallbackDailyData(): DailyData[] {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      duration: 300 + Math.random() * 200,
      avgTemperature: 15 + Math.random() * 10,
      timestamp: date.toISOString(),
    };
  });
}