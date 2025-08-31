import { useState, useEffect } from 'react';
import { Sidebar } from './Navigation/Sidebar';
import { OverviewPage } from './Pages/OverviewPage';
import { AnalyticsPage } from './Pages/AnalyticsPage';
import { ForecastsPage } from './Pages/ForecastsPage';
import { SettingsPage } from './Pages/SettingsPage';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export function DashboardLayout() {
  const { currentPage } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'forecasts':
        return <ForecastsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
      `}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        {isMobile && (
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">C</span>
              </div>
              <span className="font-medium">Cloudsine</span>
            </div>
            
            <div className="w-10"></div> {/* Spacer for alignment */}
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}