import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { ChartLoadingSkeleton } from "./LoadingSkeleton";
import { Skeleton } from "./ui/skeleton";
import { AlertCircle } from "lucide-react";

interface SunshineChartProps {
  data: any[];
  type: 'hourly' | 'daily';
  title: string;
  loading?: boolean;
  error?: string | null;
}

export function SunshineChart({ data, type, title, loading = false, error = null }: SunshineChartProps) {
  const formatTooltip = (value: number, name: string) => {
    if (name === 'duration') {
      if (type === 'hourly') {
        return [`${value.toFixed(1)} minutes`, 'Duration'];
      } else {
        return [`${(value / 60).toFixed(1)} hours`, 'Duration'];
      }
    }
    if (name === 'uvIndex') {
      return [`${value.toFixed(1)}`, 'UV Index'];
    }
    if (name === 'avgTemperature') {
      return [`${value.toFixed(1)}°C`, 'Avg Temperature'];
    }
    return [value, name];
  };

  const formatXAxisLabel = (tickItem: string, index: number) => {
    if (type === 'hourly') {
      // Show every 4th hour on mobile, every 2nd hour on desktop
      const interval = window.innerWidth < 768 ? 4 : 2;
      return index % interval === 0 ? tickItem : '';
    } else {
      // Show every 5th day on mobile, every 3rd day on desktop
      const interval = window.innerWidth < 768 ? 5 : 3;
      return index % interval === 0 ? tickItem : '';
    }
  };

  // Show loading skeleton if loading and no data
  if (loading && (!data || data.length === 0)) {
    return <ChartLoadingSkeleton />;
  }

  // Show error state if there's an error and no data
  if (error && (!data || data.length === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-80">
          <div className="text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ensure we have valid data
  const chartData = data && data.length > 0 ? data : [];
  const hasValidData = chartData.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-lg sm:text-xl">{title}</span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            {type === 'hourly' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span>Sunshine Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <span>UV Index</span>
                </div>
              </>
            )}
            {type === 'daily' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-1 rounded-full"></div>
                  <span>Duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-chart-3 rounded-full"></div>
                  <span>Temperature</span>
                </div>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Skeleton className="w-4 h-4 rounded-full animate-spin" />
                <span className="text-sm">Updating data...</span>
              </div>
            </div>
          )}
          
          <div className="h-64 sm:h-80">
            {hasValidData ? (
              <ResponsiveContainer width="100%" height="100%">
                {type === 'hourly' ? (
                  <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="time" 
                      className="text-muted-foreground"
                      fontSize={12}
                      tickFormatter={formatXAxisLabel}
                      interval={0}
                    />
                    <YAxis 
                      yAxisId="duration"
                      className="text-muted-foreground"
                      fontSize={12}
                      width={40}
                    />
                    <YAxis 
                      yAxisId="uv"
                      orientation="right"
                      className="text-muted-foreground"
                      fontSize={12}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--card-foreground))',
                        fontSize: '12px'
                      }}
                      formatter={formatTooltip}
                    />
                    <Area
                      yAxisId="duration"
                      type="monotone"
                      dataKey="duration"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="uv"
                      type="monotone"
                      dataKey="uvIndex"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </AreaChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="date" 
                      className="text-muted-foreground"
                      fontSize={12}
                      tickFormatter={formatXAxisLabel}
                      interval={0}
                    />
                    <YAxis 
                      yAxisId="duration"
                      className="text-muted-foreground"
                      fontSize={12}
                      width={40}
                    />
                    <YAxis 
                      yAxisId="temp"
                      orientation="right"
                      className="text-muted-foreground"
                      fontSize={12}
                      width={40}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                        color: 'hsl(var(--card-foreground))',
                        fontSize: '12px'
                      }}
                      formatter={formatTooltip}
                    />
                    <Bar
                      yAxisId="duration"
                      dataKey="duration"
                      fill="hsl(var(--chart-1))"
                      radius={[2, 2, 0, 0]}
                      maxBarSize={60}
                    />
                    <Line
                      yAxisId="temp"
                      type="monotone"
                      dataKey="avgTemperature"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-3">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">No data available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}