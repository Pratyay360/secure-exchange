"use client";
import { Shield, Sparkles } from "lucide-react";

import { useEffect, useState } from "react";

export default function Loading() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className={reduceMotion ? "text-center" : "text-center animate-fade-in"}>
        {/* Enhanced loading spinner with gradient */}
        <div className="relative w-32 h-32 mx-auto mb-12">
          {/* Outer ring with gradient */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 opacity-20${reduceMotion ? "" : " animate-pulse-subtle"}`}></div>

          {/* Spinning ring */}
          <div className={`absolute inset-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600${reduceMotion ? "" : " animate-spin"}`}>
            <div className="absolute inset-0 rounded-full bg-background m-1"></div>
          </div>

          {/* Center icon with gentle bounce */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full${reduceMotion ? "" : " animate-bounce-gentle"}`}>
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <Sparkles className="w-4 h-4 text-yellow-400" style={reduceMotion ? undefined : { animation: "pulse 1s infinite" }} />
          </div>
          <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2">
            <Sparkles className="w-4 h-4 text-purple-400" style={reduceMotion ? undefined : { animation: "pulse 1s infinite", animationDelay: "1s" }} />
          </div>
        </div>

        {/* Enhanced typography */}
        <div className="space-y-4">
          <h2 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent${reduceMotion ? "" : " animate-slide-up"}`}>
            Preparing Secure Environment
          </h2>
          <p className={`text-lg text-muted-foreground max-w-md mx-auto leading-relaxed${reduceMotion ? "" : " animate-slide-up"}`} style={reduceMotion ? undefined : { animationDelay: "0.2s" }}>
            Initializing encryption protocols and establishing secure connections...
          </p>

          {/* Progress dots */}
          <div className={`flex justify-center space-x-2 mt-8${reduceMotion ? "" : " animate-slide-up"}`} style={reduceMotion ? undefined : { animationDelay: "0.4s" }}>
            <div className={`w-3 h-3 bg-blue-500 rounded-full${reduceMotion ? "" : " animate-pulse"}`}></div>
            <div className={`w-3 h-3 bg-indigo-500 rounded-full${reduceMotion ? "" : " animate-pulse"}`} style={reduceMotion ? undefined : { animationDelay: "0.2s" }}></div>
            <div className={`w-3 h-3 bg-purple-500 rounded-full${reduceMotion ? "" : " animate-pulse"}`} style={reduceMotion ? undefined : { animationDelay: "0.4s" }}></div>
          </div>
        </div>

        {/* Security notice */}
        <div className={`mt-12 max-w-sm mx-auto${reduceMotion ? "" : " animate-slide-up"}`} style={reduceMotion ? undefined : { animationDelay: "0.6s" }}>
          <div className="glass dark:glass-dark rounded-xl p-4 border border-primary/20">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className={`w-2 h-2 bg-green-500 rounded-full${reduceMotion ? "" : " animate-pulse"}`}></div>
              <span>256-bit encryption active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
