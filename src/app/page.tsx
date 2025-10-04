import { Metadata } from "next";
import { Shield, Key, Lock, Unlock, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home - Secure Encryption Platform",
  description: "Choose between AES and ECC encryption methods for secure communication",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Military-Grade Encryption
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
            Secure <span className="relative inline-block">
              <span className="relative z-10">Encryption</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-primary/20 -z-0"></span>
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mt-2 text-3xl sm:text-4xl md:text-5xl">
              Platform
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your preferred encryption method for secure, private communication
          </p>
        </div>

        {/* Encryption Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {/* AES Card */}
          <Card className="flex flex-col border border-border/60 shadow-lg hover:shadow-xl bg-card rounded-2xl p-0 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 h-full flex-grow backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-105 transition-transform">
                  <Key className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">AES Encryption</CardTitle>
                  <CardDescription className="text-white/90 mt-1 font-medium text-sm">
                    Symmetric encryption with shared keys
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Advanced Encryption Standard with 256-bit strength
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                    <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-foreground">256-bit encryption strength</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-blue-100 dark:bg-blue-950/50 rounded-lg">
                    <Unlock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-foreground">Fast encryption & decryption</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-300"
              >
                <a href="/aes-keys">Get Started with AES</a>
              </Button>
            </CardFooter>
          </Card>

          {/* ECC Card */}
          <Card className="flex flex-col border border-border/60 shadow-lg hover:shadow-xl bg-card rounded-2xl p-0 overflow-hidden group hover:border-emerald-500/50 transition-all duration-300 h-full flex-grow backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-105 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">ECC Encryption</CardTitle>
                  <CardDescription className="text-white/90 mt-1 font-medium text-sm">
                    Elliptic Curve Cryptography with smaller keys
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Strong security with smaller key sizes
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                    <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-foreground">P-256 curve standard</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950/50 rounded-lg">
                    <Key className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-foreground">Public/private key pairs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all duration-300"
              >
                <a href="/ecc-keys">Get Started with ECC</a>
              </Button>
            </CardFooter>
          </Card>

          {/* RSA Card */}
          <Card className="flex flex-col border border-border/60 shadow-lg hover:shadow-xl bg-card rounded-2xl p-0 overflow-hidden group hover:border-amber-500/50 transition-all duration-300 h-full flex-grow backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-br from-amber-600 to-orange-700 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-105 transition-transform">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">RSA Encryption</CardTitle>
                  <CardDescription className="text-white/90 mt-1 font-medium text-sm">
                    Industry-standard asymmetric encryption
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4 leading-relaxed">
                2048-bit keys for maximum security
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-amber-100 dark:bg-amber-950/50 rounded-lg">
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-foreground">2048-bit key strength</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-amber-100 dark:bg-amber-950/50 rounded-lg">
                    <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <span className="text-foreground">Public/private key pairs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all duration-300"
              >
                <a href="/rsa-keys">Get Started with RSA</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
