import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useSunshineData } from "../../hooks/useSunshineData";
import { 
  Sun, 
  Wind, 
  Droplets, 
  Gauge, 
  Eye,
  Thermometer,
  CloudRain,
  Sunrise,
  Sunset,
  Activity
} from "lucide-react";

interface WeatherWidgetProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  progress?: number;
  color?: string;
}

function WeatherWidget({ icon: Icon, title, value, subtitle, progress, color = "text-primary" }: WeatherWidgetProps) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm text-muted-foreground">{title}</span>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-medium">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {progress !== undefined && (
            <Progress value={progress} className="h-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function OverviewPage() {
  const { 
    hourlyData, 
    dailyData, 
    locationInfo, 
    loading, 
    error 
  } = useSunshineData('station-001');

  // Calculate current weather metrics from sunshine data
  const currentHour = new Date().getHours();
  const currentSunshine = hourlyData[currentHour]?.duration || 0;
  const currentUV = hourlyData[currentHour]?.uvIndex || 0;
  const avgTemp = dailyData.length > 0 ? dailyData[dailyData.length - 1]?.avgTemperature || 14 : 14;

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium mb-1">Good afternoon!</h1>
            <p className="text-muted-foreground">Here's today's weather overview</p>
          </div>
          <Badge variant="secondary" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Live Data
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Temperature Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Current Weather</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-8">
                <div>
                  <div className="text-6xl font-light mb-2">
                    {Math.round(avgTemp)}°
                  </div>
                  <p className="text-lg text-muted-foreground">Partly Cloudy</p>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4" />
                      <span>Feels like {Math.round(avgTemp + 2)}°</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>10km visibility</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm text-muted-foreground">Wind</p>
                      <p className="font-medium">15 km/h</p>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-medium">72%</p>
                    </div>
                    <div className="text-center">
                      <Sun className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                      <p className="text-sm text-muted-foreground">UV Index</p>
                      <p className="font-medium">{currentUV.toFixed(1)}</p>
                    </div>
                    <div className="text-center">
                      <Gauge className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                      <p className="text-sm text-muted-foreground">Pressure</p>
                      <p className="font-medium">1013 hPa</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Forecast */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className={`w-4 h-4 ${index === 0 ? 'text-orange-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${index === 0 ? 'font-medium' : 'text-muted-foreground'}`}>
                      {day}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {Math.round(avgTemp - index)}°
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(avgTemp - index - 5)}°
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Weather Widgets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <WeatherWidget
            icon={Wind}
            title="Wind"
            value="15 km/h"
            subtitle="NW direction"
            color="text-blue-500"
          />
          
          <WeatherWidget
            icon={CloudRain}
            title="Rain Chance"
            value="24%"
            subtitle="Light rain expected"
            progress={24}
            color="text-blue-500"
          />
          
          <WeatherWidget
            icon={Gauge}
            title="Pressure"
            value="1013 hPa"
            subtitle="Stable conditions"
            color="text-gray-500"
          />
          
          <WeatherWidget
            icon={Sun}
            title="UV Index"
            value={currentUV.toFixed(1)}
            subtitle={currentUV > 6 ? "High exposure" : "Moderate exposure"}
            progress={(currentUV / 12) * 100}
            color="text-orange-500"
          />
          
          <WeatherWidget
            icon={Eye}
            title="Visibility"
            value="10 km"
            subtitle="Clear conditions"
            color="text-green-500"
          />
          
          <WeatherWidget
            icon={Droplets}
            title="Humidity"
            value="72%"
            subtitle="Comfortable level"
            progress={72}
            color="text-blue-500"
          />
          
          <WeatherWidget
            icon={Sunrise}
            title="Sunrise"
            value="6:42 AM"
            subtitle="7h ago"
            color="text-orange-500"
          />
          
          <WeatherWidget
            icon={Sunset}
            title="Sunset"
            value="7:23 PM"
            subtitle="In 5h"
            color="text-orange-600"
          />
        </div>

        {/* Today's Highlights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Today's Highlights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Sunshine Duration</h4>
                <p className="text-2xl font-semibold mb-1">
                  {(currentSunshine / 60).toFixed(1)}h
                </p>
                <p className="text-sm text-muted-foreground">
                  Peak at {currentHour}:00
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Air Quality</h4>
                <p className="text-2xl font-semibold mb-1">Good</p>
                <p className="text-sm text-muted-foreground">
                  AQI: 45
                </p>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Comfort Level</h4>
                <p className="text-2xl font-semibold mb-1">Very Good</p>
                <p className="text-sm text-muted-foreground">
                  Ideal for outdoor activities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}