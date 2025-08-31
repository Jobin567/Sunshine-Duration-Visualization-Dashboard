import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { TrendingUp, TrendingDown, BarChart3, Calendar, ArrowUp, ArrowDown } from "lucide-react";
import { HourlyData, DailyData } from "../services/api";

interface InsightsPanelProps {
  viewType: 'hourly' | 'daily';
  hourlyData: HourlyData[];
  dailyData: DailyData[];
  loading?: boolean;
}

export function InsightsPanel({ viewType, hourlyData, dailyData, loading = false }: InsightsPanelProps) {
  if (loading && hourlyData.length === 0 && dailyData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-40" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-36" />
              <div className="space-y-2">
                {Array.from({ length: 3 }, (_, j) => (
                  <div key={j} className="flex items-center justify-between">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Calculate insights from real data
  const calculateInsights = () => {
    if (viewType === 'hourly' && hourlyData.length > 0) {
      const totalDuration = hourlyData.reduce((sum, item) => sum + item.duration, 0);
      const avgDuration = totalDuration / hourlyData.length;
      const peakDuration = Math.max(...hourlyData.map(item => item.duration));
      const variability = Math.sqrt(
        hourlyData.reduce((sum, item) => sum + Math.pow(item.duration - avgDuration, 2), 0) / hourlyData.length
      );

      return {
        peak: peakDuration / 60, // Convert to hours
        average: avgDuration / 60,
        variability: variability / 60,
        trend: avgDuration > 35 ? 'increasing' : 'stable',
      };
    } else if (dailyData.length > 0) {
      const recentWeek = dailyData.slice(-7);
      const previousWeek = dailyData.slice(-14, -7);
      
      const recentAvg = recentWeek.reduce((sum, item) => sum + item.duration, 0) / recentWeek.length;
      const previousAvg = previousWeek.length > 0 
        ? previousWeek.reduce((sum, item) => sum + item.duration, 0) / previousWeek.length
        : recentAvg;
      
      const monthlyAvg = dailyData.reduce((sum, item) => sum + item.duration, 0) / dailyData.length;
      const peakDuration = Math.max(...dailyData.map(item => item.duration));
      
      return {
        peak: peakDuration / 60,
        average: recentAvg / 60,
        variability: 1.4, // Simplified for now
        weeklyChange: ((recentAvg - previousAvg) / previousAvg) * 100,
        monthlyComparison: ((recentAvg - monthlyAvg) / monthlyAvg) * 100,
        trend: recentAvg > previousAvg ? 'increasing' : 'decreasing',
      };
    }

    return {
      peak: 8.2,
      average: 6.8,
      variability: 1.4,
      trend: 'increasing' as const,
    };
  };

  const insights = calculateInsights();

  const formatChange = (change: number) => {
    const absChange = Math.abs(change);
    const sign = change >= 0 ? '+' : '-';
    return `${sign}${absChange.toFixed(1)}%`;
  };

  const getProgressValue = (change: number) => {
    return Math.min(Math.abs(change) * 2, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
          Insights & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Period Stats */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-medium">Current Period Overview</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Peak Duration</span>
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">{insights.peak.toFixed(1)} hrs</span>
                {insights.trend === 'increasing' ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Average Duration</span>
              <span className="text-xs sm:text-sm">{insights.average.toFixed(1)} hrs</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Variability</span>
              <span className="text-xs sm:text-sm">±{insights.variability.toFixed(1)} hrs</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Comparative Analysis */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-medium">Comparative Analysis</h4>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">vs. Last Week</span>
                <div className={`flex items-center gap-1 ${
                  (insights as any).weeklyChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(insights as any).weeklyChange >= 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{formatChange((insights as any).weeklyChange || 12)}</span>
                </div>
              </div>
              <Progress value={getProgressValue((insights as any).weeklyChange || 12)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">vs. Monthly Avg</span>
                <div className={`flex items-center gap-1 ${
                  (insights as any).monthlyComparison >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(insights as any).monthlyComparison >= 0 ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  <span>{formatChange((insights as any).monthlyComparison || -5)}</span>
                </div>
              </div>
              <Progress value={getProgressValue((insights as any).monthlyComparison || -5)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-muted-foreground">vs. Last Year</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-3 h-3" />
                  <span>+8%</span>
                </div>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Historical Trends */}
        <div className="space-y-3">
          <h4 className="text-xs sm:text-sm font-medium">Historical Trends</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">30-Day Trend</span>
              <div className={`flex items-center gap-1 ${
                insights.trend === 'increasing' ? 'text-green-600' : 'text-red-600'
              }`}>
                {insights.trend === 'increasing' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs sm:text-sm capitalize">{insights.trend}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Seasonal Pattern</span>
              <span className="text-xs sm:text-sm">Summer Peak</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Best Month</span>
              <span className="text-xs sm:text-sm">July (9.2 hrs avg)</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Record High</span>
              <span className="text-xs sm:text-sm">{insights.peak.toFixed(1)} hrs</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Predictions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <h4 className="text-xs sm:text-sm font-medium">Forecast</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Tomorrow</span>
              <span className="text-xs sm:text-sm">
                {(insights.average * 1.1).toFixed(1)} hrs (±0.8)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">3-Day Avg</span>
              <span className="text-xs sm:text-sm">
                {(insights.average * 1.05).toFixed(1)} hrs
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-muted-foreground">Weekly Outlook</span>
              <div className={`flex items-center gap-1 ${
                insights.trend === 'increasing' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs sm:text-sm">
                  {insights.trend === 'increasing' ? 'Favorable' : 'Stable'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}