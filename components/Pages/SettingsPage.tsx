import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { 
  Settings, 
  Bell, 
  Globe, 
  Database, 
  Shield, 
  Download,
  Trash2,
  RefreshCw,
  MapPin
} from "lucide-react";

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState('metric');
  const [language, setLanguage] = useState('en');

  return (
    <div className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your weather dashboard preferences and data settings</p>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units">Units</Label>
                  <Select value={units} onValueChange={setUnits}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (°C, km/h, mm)</SelectItem>
                      <SelectItem value="imperial">Imperial (°F, mph, in)</SelectItem>
                      <SelectItem value="mixed">Mixed Units</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weather alerts and forecast updates
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Weather Alerts</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Daily Forecast</span>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Data Quality Reports</span>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data & Sync */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data & Sync
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Refresh</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update data every 15 minutes
                  </p>
                </div>
                <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Cache Size</span>
                  <Badge variant="secondary">2.3 MB</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Sync</span>
                  <span className="text-sm text-muted-foreground">2 minutes ago</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Primary Location</Label>
                <Select defaultValue="station-001">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="station-001">Central Weather Station</SelectItem>
                    <SelectItem value="station-002">North Observatory</SelectItem>
                    <SelectItem value="station-003">South Monitoring Point</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coordinates">Manual Coordinates</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Latitude" />
                  <Input placeholder="Longitude" />
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                Detect Current Location
              </Button>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow usage analytics to improve the service
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Data Export</h4>
                <p className="text-sm text-muted-foreground">
                  Download your weather data and settings
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  type="password" 
                  placeholder="Enter your API key"
                  defaultValue="sk-***************************"
                />
                <p className="text-xs text-muted-foreground">
                  Your API key is encrypted and stored securely
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input 
                  id="endpoint" 
                  placeholder="https://api.weather.com/v1"
                  defaultValue="https://api.noaa.gov/v2"
                />
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Connected
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t">
          <div className="flex gap-3">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}