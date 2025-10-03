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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary dark:text-primary-foreground">
            <Sparkles className="w-4 h-4" />
            Military-Grade Encryption
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Secure Encryption
            <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mt-2">
              Platform
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred encryption method for secure, private communication
          </p>
        </div>

        {/* Encryption Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* AES Card */}
          <Card className="flex flex-col border-0 shadow-lg bg-card dark:bg-card rounded-2xl p-0 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">AES Encryption</CardTitle>
                  <CardDescription className="text-white/80 mt-1">
                    Symmetric encryption with shared keys
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4">
                Advanced Encryption Standard with 256-bit strength
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>256-bit encryption strength</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Unlock className="w-4 h-4 text-primary" />
                  <span>Fast encryption & decryption</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <a href="/aes-keys">Get Started with AES</a>
              </Button>
            </CardFooter>
          </Card>

          {/* ECC Card */}
          <Card className="flex flex-col border-0 shadow-lg bg-card dark:bg-card rounded-2xl p-0 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">ECC Encryption</CardTitle>
                  <CardDescription className="text-white/80 mt-1">
                    Elliptic Curve Cryptography with smaller keys
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4">
                Strong security with smaller key sizes
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>P-256 curve standard</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Key className="w-4 h-4 text-primary" />
                  <span>Public/private key pairs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white"
              >
                <a href="/ecc-keys">Get Started with ECC</a>
              </Button>
            </CardFooter>
          </Card>

          {/* RSA Card */}
          <Card className="flex flex-col border-0 shadow-lg bg-card dark:bg-card rounded-2xl p-0 overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">RSA Encryption</CardTitle>
                  <CardDescription className="text-white/80 mt-1">
                    Industry-standard asymmetric encryption
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-muted-foreground mb-4">
                2048-bit keys for maximum security
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>2048-bit key strength</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Key className="w-4 h-4 text-primary" />
                  <span>Public/private key pairs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-white"
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
