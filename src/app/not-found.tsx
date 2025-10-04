"use client";

import Link from "next/link";
import { Home, ArrowLeft, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="text-center max-w-2xl animate-fade-in">
        {/* Enhanced 404 display */}
        <div className="relative mb-12">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse-subtle">
            404
          </h1>

          {/* Decorative elements */}
          <div
            className={`absolute -top-4 -right-4 ${
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? ""
                : "animate-bounce-gentle"
            }`}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <div
            className={`absolute -bottom-2 -left-2 ${
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? ""
                : "animate-pulse"
            }`}
          >
            <Shield className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
          {/* Enhanced action buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-4">
            <Link href="/">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all">
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="gap-2 hover:bg-accent/50"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>

          {/* Security notice */}
          <div className="pt-8 max-w-sm mx-auto">
            <div className="glass dark:glass-dark rounded-xl p-4 border border-primary/20">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Your security is our priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
