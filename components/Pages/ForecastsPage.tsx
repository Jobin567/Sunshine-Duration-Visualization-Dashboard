import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Wind,
  Droplets,
  Thermometer,
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

interface ForecastCardProps {
  date: string;
  day: string;
  icon: React.ElementType;
  condition: string;
  high: number;
  low: number;
  sunshine: number;
  precipitation: number;
  wind: number;
}

function ForecastCard({ date, day, icon: Icon, condition, high, low, sunshine, precipitation, wind }: ForecastCardProps) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-medium">{day}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
          <Icon className="w-8 h-8 text-orange-500" />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold">{high}°</span>
            <span className="text-lg text-muted-foreground">{low}°</span>
          </div>
          
          <p className="text-sm font-medium">{condition}</p>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sunshine</span>
              <span>{sunshine}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rain</span>
              <span>{precipitation}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Wind</span>
              <span>{wind} km/h</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ForecastsPage() {
  const [forecastType, setForecastType] = useState('7-day');
  
  const weeklyForecast = [
    {
      date: 'Aug 28',
      day: 'Today',
      icon: Sun,
      condition: 'Sunny',
      high: 24,
      low: 16,
      sunshine: 8.2,
      precipitation: 5,
      wind: 12
    },
    {
      date: 'Aug 29',
      day: 'Tomorrow',
      icon: Cloud,
      condition: 'Partly Cloudy',
      high: 22,
      low: 15,
      sunshine: 6.5,
      precipitation: 20,
      wind: 15
    },
    {
      date: 'Aug 30',
      day: 'Friday',
      icon: CloudRain,
      condition: 'Light Rain',
      high: 19,
      low: 13,
      sunshine: 3.2,
      precipitation: 75,
      wind: 18
    },
    {
      date: 'Aug 31',
      day: 'Saturday',
      icon: Cloud,
      condition: 'Cloudy',
      high: 21,
      low: 14,
      sunshine: 4.8,
      precipitation: 30,
      wind: 14
    },
    {
      date: 'Sep 1',
      day: 'Sunday',
      icon: Sun,
      condition: 'Sunny',
      high: 26,
      low: 18,
      sunshine: 9.1,
      precipitation: 0,
      wind: 8
    },
    {
      date: 'Sep 2',
      day: 'Monday',
      icon: Sun,
      condition: 'Sunny',
      high: 28,
      low: 19,
      sunshine: 9.5,
      precipitation: 0,
      wind: 10
    },
    {
      date: 'Sep 3',
      day: 'Tuesday',
      icon: Cloud,
      condition: 'Partly Cloudy',
      high: 25,
      low: 17,
      sunshine: 7.2,
      precipitation: 15,
      wind: 12
    }
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-1">Weather Forecasts</h1>
            <p className="text-muted-foreground">Extended weather predictions and sunshine duration forecasts</p>
          </div>
          
          <Select value={forecastType} onValueChange={setForecastType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-day">7-Day Forecast</SelectItem>
              <SelectItem value="14-day">14-Day Forecast</SelectItem>
              <SelectItem value="monthly">Monthly Outlook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Weather Alert */}
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-medium text-amber-900 dark:text-amber-100">Weather Advisory</h3>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Light rain expected Friday morning. Sunshine duration may be reduced by 60%.
                </p>
              </div>
              <Badge variant="outline" className="border-amber-200 text-amber-800">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Forecast Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {weeklyForecast.map((forecast, index) => (
                <ForecastCard key={index} {...forecast} />
              ))}
            </div>

            {/* Sunshine Duration Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5" />
                  Weekly Sunshine Duration Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyForecast.map((forecast, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm text-muted-foreground">{forecast.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{forecast.sunshine}h sunshine</span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round((forecast.sunshine / 12) * 100)}% of maximum
                          </span>
                        </div>
                        <Progress value={(forecast.sunshine / 12) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Summary and Details */}
          <div className="space-y-6">
            {/* Week Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Week Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <Thermometer className="w-6 h-6 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-muted-foreground">Avg High</p>
                    <p className="text-xl font-medium">24°C</p>
                  </div>
                  <div>
                    <Thermometer className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm text-muted-foreground">Avg Low</p>
                    <p className="text-xl font-medium">16°C</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">Total Sunshine</span>
                    </div>
                    <span className="font-medium">48.5h</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Rain Days</span>
                    </div>
                    <span className="font-medium">2 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Avg Wind</span>
                    </div>
                    <span className="font-medium">13 km/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Outlook */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seasonal Outlook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h4 className="font-medium mb-1">Late Summer Transition</h4>
                  <p className="text-sm text-muted-foreground">
                    Gradual decrease in sunshine hours as we approach autumn. Expect more variable weather patterns.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">September Avg</span>
                    <span className="text-sm font-medium">7.2h/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">vs Last Year</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-sm">+8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Days */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Best Days This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Sun className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">Monday, Sep 2</p>
                    <p className="text-sm text-muted-foreground">9.5h sunshine, 28°C</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Sun className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium">Sunday, Sep 1</p>
                    <p className="text-sm text-muted-foreground">9.1h sunshine, 26°C</p>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground pt-2">
                  Perfect for outdoor activities and solar energy generation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}