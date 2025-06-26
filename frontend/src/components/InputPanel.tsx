
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, Info } from 'lucide-react';

interface InputPanelProps {
  latitude: string;
  longitude: string;
  onLatitudeChange: (value: string) => void;
  onLongitudeChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputPanel = ({
  latitude,
  longitude,
  onLatitudeChange,
  onLongitudeChange,
  onSubmit,
  isLoading
}: InputPanelProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Card className="w-full max-w-md bg-venus-bg-secondary/90 border-venus-orange/30 backdrop-blur-sm shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Radar className="h-6 w-6 text-venus-orange animate-pulse-glow" />
          <CardTitle className="text-venus-gold font-mono text-xl">
            Venus Metadata Query
          </CardTitle>
        </div>
        <p className="text-venus-gold/70 text-sm">
          Enter coordinates to retrieve radar metadata
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Coordinate Instructions */}
          <div className="bg-venus-bg-primary/30 rounded-lg p-3 border border-venus-orange/20 mb-4">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-venus-orange mt-0.5 shrink-0" />
              <div className="text-venus-gold/80 text-sm">
                <p className="font-medium mb-1">Coordinate Format:</p>
                <p>• Latitude: +43 for 43°N, -32 for 32°S</p>
                <p>• Longitude: +43 for 43°E, -32 for 32°W</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-venus-gold/90 font-medium">
                Latitude (°) - North (+) / South (-)
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => onLatitudeChange(e.target.value)}
                placeholder="e.g., +43 or -32"
                className="bg-venus-bg-primary/50 border-venus-orange/40 text-white placeholder:text-venus-gold/50 focus:border-venus-orange focus:ring-venus-orange/20 font-mono"
                required
                min="-90"
                max="90"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-venus-gold/90 font-medium">
                Longitude (°) - East (+) / West (-)
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => onLongitudeChange(e.target.value)}
                placeholder="e.g., +43 or -32"
                className="bg-venus-bg-primary/50 border-venus-orange/40 text-white placeholder:text-venus-gold/50 focus:border-venus-orange focus:ring-venus-orange/20 font-mono"
                required
                min="-180"
                max="360"
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!latitude || !longitude || isLoading}
            className="w-full bg-venus-orange hover:bg-venus-orange-dark text-white font-medium py-3 transition-all duration-200 hover:shadow-lg hover:shadow-venus-orange/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Get Metadata"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
