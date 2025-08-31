import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useNavigation } from "../../contexts/NavigationContext";
import { 
  Home, 
  BarChart3, 
  Calendar, 
  Settings, 
  MapPin,
  Wifi,
  User
} from "lucide-react";

const navigationItems = [
  {
    id: 'overview' as const,
    label: 'Overview',
    icon: Home,
  },
  {
    id: 'analytics' as const,
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    id: 'forecasts' as const,
    label: 'Forecasts',
    icon: Calendar,
  },
  {
    id: 'settings' as const,
    label: 'Settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-medium">Cloudsine</h2>
            <p className="text-sm text-muted-foreground">Weather Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
                onClick={() => setCurrentPage(item.id)}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-6" />

        {/* Location Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Current Location</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-3 h-3" />
                <span>Central Station</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wifi className="w-3 h-3 text-green-500" />
              <span className="text-sm text-muted-foreground">Connected</span>
            </div>
            <Badge variant="outline" className="text-xs">
              Live
            </Badge>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Weather Monitor</p>
            <p className="text-xs text-muted-foreground">Station Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}