import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Satellite } from "lucide-react";
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

interface Cycle2CardProps {
  result: MetadataResult;
}

export const Cycle2Card = ({ result }: Cycle2CardProps) => {
  const getCycle2BadgeColor = (coverage: string) => {
    switch (coverage) {
      case "Likely Covered":
        return "bg-green-600/20 text-green-400 border-green-500/30";
      default:
        return "bg-red-600/20 text-red-400 border-red-500/30";
    }
  };

  return (
    <Card className="bg-venus-bg-secondary/90 border-venus-orange/30 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-venus-gold font-mono text-xl flex items-center gap-2">
          <Satellite className="h-5 w-5 text-venus-orange" />
          Cycle 2 - Right-looking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-venus-gold/90 font-medium">
              Coverage Status
            </span>
            <Badge
              variant="secondary"
              className={`font-mono ${getCycle2BadgeColor(
                result.cycle2.coverage
              )}`}
            >
              {result.cycle2.coverage}
            </Badge>
          </div>
        </div>

        {/* Always show incidence angle */}
        <div className="bg-venus-bg-primary/30 rounded-lg p-4 border border-venus-orange/20">
          <div className="flex items-center gap-2 mb-2">
            <Satellite className="h-4 w-4 text-venus-orange" />
            <span className="text-venus-gold/90 font-medium">
              Incidence Angle
            </span>
          </div>
          <div className="text-2xl font-mono text-white">
            {result.cycle2.incidenceAngle.toFixed(2)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
