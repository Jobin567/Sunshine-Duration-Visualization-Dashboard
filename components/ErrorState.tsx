import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  variant?: 'error' | 'offline' | 'warning';
  className?: string;
}

export function ErrorState({ 
  title,
  message, 
  onRetry, 
  showRetry = true,
  variant = 'error',
  className = ''
}: ErrorStateProps) {
  const getIcon = () => {
    switch (variant) {
      case 'offline':
        return <WifiOff className="w-8 h-8 text-muted-foreground" />;
      case 'warning':
        return <AlertCircle className="w-8 h-8 text-amber-500" />;
      default:
        return <AlertCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (variant) {
      case 'offline':
        return 'Connection Error';
      case 'warning':
        return 'Warning';
      default:
        return 'Error';
    }
  };

  return (
    <Card className={`${className}`}>
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          {getIcon()}
        </div>
        
        <CardTitle className="mb-2 text-lg">
          {getTitle()}
        </CardTitle>
        
        <p className="text-muted-foreground mb-6 max-w-sm">
          {message}
        </p>
        
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" className="min-w-32">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Specialized error state for network errors
export function NetworkErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      variant="offline"
      title="No Internet Connection"
      message="Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

// Specialized error state for API errors
export function ApiErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <ErrorState
      title="Unable to Load Data"
      message={message}
      onRetry={onRetry}
    />
  );
}