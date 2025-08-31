import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SunshineChart } from "./SunshineChart";
import { MetadataPanel } from "./MetadataPanel";
import { InsightsPanel } from "./InsightsPanel";
import { ErrorState } from "./ErrorState";
import { DashboardLoadingSkeleton } from "./LoadingSkeleton";
import { useSunshineData } from "../hooks/useSunshineData";
import { Sun, Calendar, Clock, TrendingUp, RefreshCw, Settings, Smartphone } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function SunshineDashboard() {
  const [viewType, setViewType] = useState<'hourly' | 'daily'>('hourly');
  const [selectedLocation, setSelectedLocation] = useState('station-001');
  const [isMobileView, setIsMobileView] = useState(false);

  const { 
    hourlyData, 
    dailyData, 
    locationInfo, 
    metadata, 
    loading, 
    error, 
    lastUpdated,
    refetch,
    autoRefresh,
    setAutoRefresh 
  } = useSunshineData(selectedLocation);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show toast on successful data refresh
  useEffect(() => {
    if (lastUpdated && !loading && !error) {
      toast.success("Data updated successfully", {
        duration: 2000,
        position: "bottom-right"
      });
    }
  }, [lastUpdated, loading, error]);

  const handleRefresh = () => {
    refetch();
    toast.info("Refreshing data...", {
      duration: 1000,
      position: "bottom-right"
    });
  };

  const currentData = viewType === 'hourly' ? hourlyData : dailyData;
  
  // Calculate stats from actual data
  const todaysTotal = hourlyData.reduce((sum, item) => sum + item.duration, 0) / 60; // Convert to hours
  const weeklyAverage = dailyData.slice(-7).reduce((sum, item) => sum + item.duration, 0) / (7 * 60);
  const peakHour = hourlyData.reduce((peak, item, index) => 
    item.duration > hourlyData[peak].duration ? index : peak, 0
  );

  if (loading && currentData.length === 0) {
    return <DashboardLoadingSkeleton />;
  }

  if (error && currentData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorState
          message={error}
          onRetry={refetch}
          className="w-full max-w-md"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg shrink-0">
            <Sun className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-medium truncate">
              Sunshine Duration Analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              {isMobileView ? "Live monitoring" : "Real-time monitoring and historical trends"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="station-001">
                {isMobileView ? "Station 001" : "Weather Station 001"}
              </SelectItem>
              <SelectItem value="station-002">
                {isMobileView ? "Station 002" : "Weather Station 002"}
              </SelectItem>
              <SelectItem value="station-003">
                {isMobileView ? "Station 003" : "Weather Station 003"}
              </SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <Badge 
              variant="outline" 
              className={`flex items-center gap-2 ${metadata?.status === 'operational' ? '' : 'bg-yellow-50 border-yellow-200'}`}
            >
              <div className={`w-2 h-2 rounded-full ${metadata?.status === 'operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              {metadata?.status === 'operational' ? 'Live Data' : 'Limited Service'}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {!isMobileView && 'Refresh'}
            </Button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && currentData.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-800 text-sm">
            <Settings className="w-4 h-4" />
            <span>Using cached data. {error}</span>
            <Button variant="outline" size="sm" onClick={refetch} className="ml-auto">
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'hourly' | 'daily')}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="hourly" className="flex items-center gap-2 flex-1 sm:flex-initial">
                  <Clock className="w-4 h-4" />
                  <span className="hidden xs:inline">Hourly View</span>
                  <span className="xs:hidden">Hourly</span>
                </TabsTrigger>
                <TabsTrigger value="daily" className="flex items-center gap-2 flex-1 sm:flex-initial">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden xs:inline">Daily View</span>
                  <span className="xs:hidden">Daily</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                {isMobileView && <Smartphone className="w-3 h-3" />}
                <span>
                  {lastUpdated 
                    ? `Updated ${lastUpdated.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}`
                    : 'Loading...'
                  }
                </span>
              </div>
            </div>
            
            <TabsContent value="hourly" className="space-y-4">
              <SunshineChart 
                data={hourlyData} 
                type="hourly" 
                title="Hourly Sunshine Duration"
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="daily" className="space-y-4">
              <SunshineChart 
                data={dailyData} 
                type="daily" 
                title="Daily Sunshine Duration"
                loading={loading}
              />
            </TabsContent>
          </Tabs>

          {/* Quick Stats - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5 text-chart-1" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Today's Total</p>
                  <p className="text-lg sm:text-xl font-medium truncate">
                    {todaysTotal.toFixed(1)} hours
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-chart-2" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Weekly Average</p>
                  <p className="text-lg sm:text-xl font-medium truncate">
                    {weeklyAverage.toFixed(1)} hours
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Peak Hour</p>
                  <p className="text-lg sm:text-xl font-medium">
                    {peakHour.toString().padStart(2, '0')}:00
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar - Stack on Mobile */}
        <div className="space-y-6">
          <MetadataPanel 
            locationInfo={locationInfo} 
            metadata={metadata}
            loading={loading}
          />
          <InsightsPanel 
            viewType={viewType} 
            hourlyData={hourlyData}
            dailyData={dailyData}
            loading={loading}
          />
        </div>
      </div>

      {/* Auto-refresh indicator */}
      {autoRefresh && (
        <div className="fixed bottom-4 right-4 z-50">
          <Badge variant="secondary" className="flex items-center gap-2 px-3 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs">Auto-refresh enabled</span>
          </Badge>
        </div>
      )}
    </div>
  );
}