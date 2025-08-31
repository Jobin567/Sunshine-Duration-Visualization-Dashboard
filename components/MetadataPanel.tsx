import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { MapPin, Database, Clock, Wifi, Settings } from "lucide-react";
import { LocationInfo } from "../services/api";

interface MetadataPanelProps {
  locationInfo: LocationInfo | null;
  metadata: any;
  loading?: boolean;
}

export function MetadataPanel({ locationInfo, metadata, loading = false }: MetadataPanelProps) {
  if (loading && !locationInfo && !metadata) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-6 w-48" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="pl-6 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'degraded':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'maintenance':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatPercentage = (value: number) => `${value?.toFixed(1)}%`;
  const formatLastUpdated = (timestamp: string) => {
    if (!timestamp) return 'Unknown';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    }) + ' UTC';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Database className="w-4 h-4 sm:w-5 sm:h-5" />
          Data Source & Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            Location Details
          </div>
          <div className="pl-4 sm:pl-6 space-y-1 text-xs sm:text-sm text-muted-foreground">
            <p className="break-words">{locationInfo?.name || 'Loading...'}</p>
            <p className="break-words">{locationInfo?.coordinates || '...'}</p>
            <p>Elevation: {locationInfo?.elevation || '...'}</p>
            <p>Timezone: {locationInfo?.timezone || '...'}</p>
          </div>
        </div>

        <Separator />

        {/* Data Source */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Wifi className="w-3 h-3 sm:w-4 sm:h-4" />
            Data Source
          </div>
          <div className="pl-4 sm:pl-6 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Provider</span>
              <Badge variant="secondary" className="text-xs">
                {metadata?.source?.includes('NOAA') ? 'NOAA Weather' : 'Weather API'}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">API Version</span>
              <span className="text-xs sm:text-sm">
                {metadata?.source?.match(/v[\d.]+/)?.[0] || 'v2.1.3'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Update Freq.</span>
              <span className="text-xs sm:text-sm">Every 15 min</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            Timestamps
          </div>
          <div className="pl-4 sm:pl-6 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Last Update</span>
              <span className="text-xs sm:text-sm font-mono">
                {formatLastUpdated(metadata?.lastUpdated)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Data Range</span>
              <span className="text-xs sm:text-sm">30 days</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Collection Start</span>
              <span className="text-xs sm:text-sm">28 Aug 2025</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quality Indicators */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            Data Quality
          </div>
          <div className="pl-4 sm:pl-6 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Accuracy</span>
              <Badge variant="outline" className={`text-xs ${getStatusColor('operational')}`}>
                {formatPercentage(metadata?.accuracy || 98.5)}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Completeness</span>
              <Badge variant="outline" className={`text-xs ${getStatusColor('operational')}`}>
                {formatPercentage(metadata?.completeness || 99.2)}
              </Badge>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Status</span>
              <Badge variant="outline" className={`text-xs ${getStatusColor(metadata?.status || 'operational')}`}>
                {metadata?.status || 'Operational'}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}