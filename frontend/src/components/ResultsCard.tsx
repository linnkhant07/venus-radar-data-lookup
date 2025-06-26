import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Target, Eye, Ruler } from 'lucide-react';

interface MetadataResult {
  incidenceAngle: number;
  numberOfLooks: number;
  crossTrackResolution: number;
  alongTrackResolution: number;
  cycle1Coverage: boolean;
  cycle2Coverage: string;
  cycle2ViewDirection: string | null;
  latitude: number;
  longitude: number;
}

interface ResultsCardProps {
  result: MetadataResult;
}

export const ResultsCard = ({ result }: ResultsCardProps) => {
  const getCycle2BadgeColor = (coverage: string) => {
    switch (coverage) {
      case "Covered":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      case "Partial":
        return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-red-600/20 text-red-400 border-red-500/30";
    }
  };

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      <Card className="bg-venus-bg-secondary/90 border-venus-orange/30 backdrop-blur-sm shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-venus-gold font-mono text-xl flex items-center gap-2">
              <Target className="h-5 w-5 text-venus-orange" />
              Radar Metadata Results
            </CardTitle>
            <div className="text-venus-gold/70 font-mono text-sm">
              {result.latitude.toFixed(4)}°, {result.longitude.toFixed(4)}°
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">Incidence Angle</span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.incidenceAngle.toFixed(2)}°
                </div>
              </div>
              
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">Number of Looks</span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.numberOfLooks}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">Cross-track Resolution</span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.crossTrackResolution.toFixed(1)} m
                </div>
              </div>
              
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-venus-orange rotate-90" />
                  <span className="text-venus-gold/90 font-medium">Along-track Resolution</span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.alongTrackResolution.toFixed(1)} m
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
              <div className="flex items-center justify-between">
                <span className="text-venus-gold/90 font-medium">Cycle 1 Coverage</span>
                <Badge 
                  variant={result.cycle1Coverage ? "default" : "secondary"}
                  className={`font-mono ${
                    result.cycle1Coverage 
                      ? "bg-green-600/20 text-green-400 border-green-500/30" 
                      : "bg-red-600/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {result.cycle1Coverage ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Covered
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Not Covered
                    </div>
                  )}
                </Badge>
              </div>
            </div>

            <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-venus-gold/90 font-medium">Cycle 2 Coverage (Right-looking)</span>
                <Badge 
                  variant="secondary"
                  className={`font-mono ${getCycle2BadgeColor(result.cycle2Coverage)}`}
                >
                  {result.cycle2Coverage}
                </Badge>
              </div>
              {result.cycle2ViewDirection && (
                <div className="text-venus-gold/70 text-sm font-mono">
                  View Direction: {result.cycle2ViewDirection}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
