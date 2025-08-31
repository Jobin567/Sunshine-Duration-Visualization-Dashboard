import { ErrorBoundary } from "./components/ErrorBoundary";
import { DashboardLayout } from "./components/DashboardLayout";
import { NavigationProvider } from "./contexts/NavigationContext";
import { Toaster } from "./components/ui/sonner";
import './styles/globals.css';

export default function App() {
  return (
    <ErrorBoundary>
      <NavigationProvider>
        <div className="min-h-screen bg-background">
          <DashboardLayout />
          <Toaster />
        </div>
      </NavigationProvider>
    </ErrorBoundary>
  );
}