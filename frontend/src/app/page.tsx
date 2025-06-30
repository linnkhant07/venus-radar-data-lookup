"use client";

import React, { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { Cycle1Card } from "@/components/Cycle1Card";
import { Cycle2Card } from "@/components/Cycle2Card";
import { fetchMetadata } from "@/lib/fetchMetadata";
import { useToast } from "@/hooks/use-toast";

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

export default function Page() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState<MetadataResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid latitude and longitude values.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const metadata = await fetchMetadata(lat, lon);
      setResult(metadata);
      toast({
        title: "Metadata retrieved",
        description: `Successfully fetched data for coordinates ${lat.toFixed(
          4
        )}°, ${lon.toFixed(4)}°`,
      });
    } catch (error) {
      console.error("Error fetching metadata:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to retrieve metadata. Please try again.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-venus-bg-primary relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-venus-orange/5 via-transparent to-venus-gold/5" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-venus-gold mb-4 font-mono">
            Magellan Radar Characteristics Lookup
          </h1>
          <p className="text-venus-gold/70 text-lg max-w-2xl mx-auto">
            Venus SAR Data (Cycle 1-2)
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-venus-orange to-venus-gold mx-auto mt-4 rounded-full" />
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center gap-8">
          <InputPanel
            latitude={latitude}
            longitude={longitude}
            onLatitudeChange={setLatitude}
            onLongitudeChange={setLongitude}
            onSubmit={handleSubmit}
            isLoading={loading}
          />

          {error && (
            <div className="w-full max-w-md bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {result && (
            <div className="w-full max-w-4xl space-y-6 animate-fade-in">
              <Cycle1Card result={result} />
              <Cycle2Card result={result} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-venus-gold/50 text-sm font-mono">
          <p> VERITAS • contact linn.thuya247@gmail.com for issues </p>
        </div>
      </div>
    </div>
  );
}
