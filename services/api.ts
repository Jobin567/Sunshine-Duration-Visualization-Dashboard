// API service for sunshine duration data
export interface SunshineDataPoint {
  timestamp: string;
  duration: number;
  uvIndex?: number;
  temperature?: number;
  location: string;
}

export interface HourlyData {
  time: string;
  duration: number;
  uvIndex: number;
  timestamp: string;
}

export interface DailyData {
  date: string;
  duration: number;
  avgTemperature: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T[];
  metadata: {
    location: string;
    lastUpdated: string;
    source: string;
    accuracy: number;
    completeness: number;
    status: 'operational' | 'degraded' | 'maintenance';
  };
}

export interface LocationInfo {
  id: string;
  name: string;
  coordinates: string;
  elevation: string;
  timezone: string;
}

// Simulate API delays with shorter times for better UX
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

// Reduced error rate for better development experience (1% chance instead of 10%)
const shouldSimulateError = () => Math.random() < 0.01;

// Mock API base URL (in real app, this would be your FastAPI backend)
const API_BASE_URL = 'http://localhost:8000/api';

export class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generate mock data with realistic patterns
const generateHourlyData = (location: string): HourlyData[] => {
  const now = new Date();
  return Array.from({ length: 24 }, (_, i) => {
    const hour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), i);
    const solarAngle = Math.sin((i - 6) * Math.PI / 12);
    const baseIntensity = Math.max(0, solarAngle);
    
    // Add weather variability with more realistic patterns
    const cloudiness = Math.random() * 0.3; // 0-30% cloud cover (reduced)
    const weatherFactor = 1 - cloudiness;
    
    // More stable sunshine duration calculation
    const duration = Math.max(0, baseIntensity * 55 * weatherFactor + (Math.random() - 0.5) * 8);
    const uvIndex = Math.max(0, baseIntensity * 11 * weatherFactor + (Math.random() - 0.5) * 1.5);
    
    return {
      time: `${i.toString().padStart(2, '0')}:00`,
      duration: Math.round(duration * 10) / 10, // Round to 1 decimal place
      uvIndex: Math.round(uvIndex * 10) / 10,
      timestamp: hour.toISOString(),
    };
  });
};

const generateDailyData = (location: string): DailyData[] => {
  const now = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (29 - i));
    
    // More realistic seasonal patterns
    const monthFactor = Math.sin((date.getMonth() + 1) * Math.PI / 6) * 0.4 + 0.6;
    const dailyVariation = (Math.random() - 0.5) * 0.3;
    const weekendBonus = (date.getDay() === 0 || date.getDay() === 6) ? 0.1 : 0;
    
    const duration = Math.max(200, monthFactor * 450 + dailyVariation * 150 + weekendBonus * 50);
    const temperature = 12 + monthFactor * 18 + (Math.random() - 0.5) * 6;
    
    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      duration: Math.round(duration),
      avgTemperature: Math.round(temperature * 10) / 10,
      timestamp: date.toISOString(),
    };
  });
};

// API functions with improved error handling
export const fetchHourlyData = async (locationId: string): Promise<ApiResponse<HourlyData>> => {
  await simulateApiDelay();
  
  // Very rare error simulation
  if (shouldSimulateError()) {
    throw new ApiError(500, 'Temporary server issue. Please try again.', 'SERVER_ERROR');
  }

  const data = generateHourlyData(locationId);
  
  return {
    data,
    metadata: {
      location: locationId,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA Weather API v2.1.3',
      accuracy: 98.5 + Math.random() * 1, // Slight variation
      completeness: 99.0 + Math.random() * 0.5,
      status: 'operational',
    },
  };
};

export const fetchDailyData = async (locationId: string): Promise<ApiResponse<DailyData>> => {
  await simulateApiDelay();
  
  // Very rare error simulation
  if (shouldSimulateError()) {
    throw new ApiError(503, 'Data service briefly unavailable. Retrying...', 'SERVICE_UNAVAILABLE');
  }

  const data = generateDailyData(locationId);
  
  return {
    data,
    metadata: {
      location: locationId,
      lastUpdated: new Date().toISOString(),
      source: 'NOAA Weather API v2.1.3',
      accuracy: 98.5 + Math.random() * 1,
      completeness: 99.0 + Math.random() * 0.5,
      status: 'operational',
    },
  };
};

export const fetchLocationInfo = async (locationId: string): Promise<LocationInfo> => {
  await simulateApiDelay();
  
  const locations: Record<string, LocationInfo> = {
    'station-001': {
      id: 'station-001',
      name: 'Central Weather Station',
      coordinates: '40.7128° N, 74.0060° W',
      elevation: '45m',
      timezone: 'UTC-5',
    },
    'station-002': {
      id: 'station-002',
      name: 'North Observatory',
      coordinates: '40.7589° N, 73.9851° W',
      elevation: '82m',
      timezone: 'UTC-5',
    },
    'station-003': {
      id: 'station-003',
      name: 'South Monitoring Point',
      coordinates: '40.6782° N, 73.9442° W',
      elevation: '23m',
      timezone: 'UTC-5',
    },
  };

  // No error simulation for location info as it's critical
  return locations[locationId] || locations['station-001'];
};

export const fetchAvailableLocations = async (): Promise<LocationInfo[]> => {
  await simulateApiDelay();
  
  return [
    {
      id: 'station-001',
      name: 'Central Weather Station',
      coordinates: '40.7128° N, 74.0060° W',
      elevation: '45m',
      timezone: 'UTC-5',
    },
    {
      id: 'station-002',
      name: 'North Observatory',
      coordinates: '40.7589° N, 73.9851° W',
      elevation: '82m',
      timezone: 'UTC-5',
    },
    {
      id: 'station-003',
      name: 'South Monitoring Point',
      coordinates: '40.6782° N, 73.9442° W',
      elevation: '23m',
      timezone: 'UTC-5',
    },
  ];
};

// Health check endpoint - always returns healthy for development
export const checkApiHealth = async (): Promise<{ status: string; timestamp: string; uptime: string }> => {
  await simulateApiDelay();
  
  return {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: '99.9%',
  };
};