import React from 'react';
import { MapPin, Navigation, AlertCircle, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface LocationPermissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAllowLocation: () => void;
  onDenyLocation: () => void;
}

export const LocationPermissionDialog: React.FC<LocationPermissionDialogProps> = ({
  open,
  onOpenChange,
  onAllowLocation,
  onDenyLocation,
}) => {
  const handleAllowLocation = () => {
    onAllowLocation();
    onOpenChange(false);
  };

  const handleDenyLocation = () => {
    onDenyLocation();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-br from-blue-50 to-indigo-50 p-0 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400 rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative p-6">
          <DialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
              <MapPin className="h-10 w-10 text-white relative z-10" strokeWidth={2.5} />
            </div>
            <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Enable Location Access
            </DialogTitle>
            <p className="text-center text-sm text-gray-500 mt-2">
              Get personalized weather updates for your area
            </p>
          </DialogHeader>

          <div className="space-y-3 pt-6">
            {/* Feature highlight */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shrink-0">
                <Navigation className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-1">Accurate Weather Data</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Get real-time weather information based on your exact location for the most accurate forecasts.
                </p>
              </div>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start space-x-3 p-4 rounded-xl bg-amber-50/80 backdrop-blur-sm border border-amber-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 text-sm mb-1">Optional Feature</h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                  No worries if you prefer not to share! We'll display weather for New York, US by default.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
              onClick={handleDenyLocation}
            >
              Maybe Later
            </Button>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              onClick={handleAllowLocation}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Allow Location Access
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPermissionDialog;