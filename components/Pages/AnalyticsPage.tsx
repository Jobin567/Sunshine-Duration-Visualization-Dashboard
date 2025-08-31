import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { SunshineChart } from "../SunshineChart";
import { InsightsPanel } from "../InsightsPanel";
import { useSunshineData } from "../../hooks/useSunshineData";
import { 
  TrendingUp, 
  Download, 
  Calendar,
  BarChart3,
  LineChart,
  RefreshCw
} from "lucide-react";

export function AnalyticsPage() {
  const [viewType, setViewType] = useState<'hourly' | 'daily'>('hourly');
  const [selectedLocation, setSelectedLocation] = useState('station-001');
  const [timeRange, setTimeRange] = useState('7d');

  const { 
    hourlyData, 
    dailyData, 
    locationInfo, 
    metadata,
    loading, 
    error,
    refetch
  } = useSunshineData(selectedLocation);

  const handleExport = () => {
    // Mock export functionality
    const data = viewType === 'hourly' ? hourlyData : dailyData;
    const csvContent = "data:text/csv;charset=utf-8," + 
      data.map(item => Object.values(item).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sunshine-data-${viewType}-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-1">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Detailed sunshine duration analysis and trends</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button variant="outline" onClick={refetch} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Daily</p>
                  <p className="text-xl font-medium">7.2h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peak Day</p>
                  <p className="text-xl font-medium">11.8h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Trend</p>
                  <p className="text-xl font-medium">+12%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-chart-4/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data Points</p>
                  <p className="text-xl font-medium">{hourlyData.length + dailyData.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'hourly' | 'daily')}>
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
                  <TabsTrigger value="daily">Daily Trends</TabsTrigger>
                </TabsList>
                
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="station-001">Central Weather Station</SelectItem>
                    <SelectItem value="station-002">North Observatory</SelectItem>
                    <SelectItem value="station-003">South Monitoring Point</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="hourly">
                <SunshineChart 
                  data={hourlyData} 
                  type="hourly" 
                  title="24-Hour Sunshine Duration Pattern"
                  loading={loading}
                />
              </TabsContent>
              
              <TabsContent value="daily">
                <SunshineChart 
                  data={dailyData} 
                  type="daily" 
                  title="30-Day Sunshine Duration Trend"
                  loading={loading}
                />
              </TabsContent>
            </Tabs>

            {/* Correlation Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Correlation Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Temperature vs Sunshine</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div className="bg-chart-1 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <span className="text-sm font-medium">0.78</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Strong positive correlation</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">UV Index vs Sunshine</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div className="bg-chart-2 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-sm font-medium">0.92</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Very strong correlation</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Cloud Cover Impact</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div className="bg-chart-3 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                      <span className="text-sm font-medium">-0.65</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Moderate negative impact</p>
                  </div>
                  
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Seasonal Variation</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-medium">0.85</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Strong seasonal pattern</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Sidebar */}
          <div className="space-y-6">
            <InsightsPanel 
              viewType={viewType}
              hourlyData={hourlyData}
              dailyData={dailyData}
              loading={loading}
            />

            {/* Data Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Quality</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completeness</span>
                    <span className="font-medium">99.2%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">98.5%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Timeliness</span>
                    <span className="font-medium">97.8%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '97.8%' }}></div>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Overall Score</span>
                    <span className="font-medium text-green-600">A+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}