import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Target, Eye, Ruler } from "lucide-react";

interface MetadataResult {
  latitude: number;
  longitude: number;
  cycle1: {
    covered: boolean;
    incidenceAngle?: number;
    numberOfLooks?: number;
    crossTrackResolution?: number;
    alongTrackResolution?: number;
  };
  cycle2: {
    coverage: string;
    viewDirection?: string | null;
    incidenceAngle: number;
  };
}

interface Cycle1CardProps {
  result: MetadataResult;
}

export const Cycle1Card = ({ result }: Cycle1CardProps) => {
  return (
    <Card className="bg-venus-bg-secondary/90 border-venus-orange/30 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-venus-gold font-mono text-xl flex items-center gap-2">
            <Target className="h-5 w-5 text-venus-orange" />
            Cycle 1
          </CardTitle>
          <div className="text-venus-gold/70 font-mono text-sm">
            {result.latitude.toFixed(4)}°, {result.longitude.toFixed(4)}°
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Coverage Status */}
        <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
          <div className="flex items-center justify-between">
            <span className="text-venus-gold/90 font-medium">
              Coverage Status
            </span>
            <Badge
              variant={result.cycle1.covered ? "default" : "secondary"}
              className={`font-mono ${
                result.cycle1.covered
                  ? "bg-green-600/20 text-green-400 border-green-500/30"
                  : "bg-red-600/20 text-red-400 border-red-500/30"
              }`}
            >
              {result.cycle1.covered ? (
                <div className="flex items-center gap-1">Likely Covered</div>
              ) : (
                <div className="flex items-center gap-1">
                  Likely Not Covered
                </div>
              )}
            </Badge>
          </div>
        </div>

        {/* Radar Parameters - Only show if covered */}
        {result.cycle1.covered && result.cycle1.incidenceAngle && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">
                    Incidence Angle
                  </span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.cycle1.incidenceAngle.toFixed(2)}°
                </div>
              </div>

              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">
                    Number of Looks
                  </span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.cycle1.numberOfLooks}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-venus-orange" />
                  <span className="text-venus-gold/90 font-medium">
                    Cross-track Resolution
                  </span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.cycle1.crossTrackResolution?.toFixed(1)} m
                </div>
              </div>

              <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-venus-orange rotate-90" />
                  <span className="text-venus-gold/90 font-medium">
                    Along-track Resolution
                  </span>
                </div>
                <div className="text-2xl font-mono text-white">
                  {result.cycle1.alongTrackResolution?.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
