"use client";

import React, { useEffect, useState } from "react";
import { Copy, Lock, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateRSAKeyPair } from "@/utils/rsa-crypto";
import { useClipboard } from "@/hooks/useClipboard";
import { generateShareableLink } from "@/utils/crypto-helpers";
import { ROUTES, TOAST_MESSAGES } from "@/constants/app";

interface RSACardProps {
  type: "public" | "private";
  keyCode: string;
}

function RSACustomCard({ type, keyCode }: RSACardProps) {
  const [link, setLink] = useState("");
  const { copyToClipboard } = useClipboard();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const endpoint = type === "public" ? ROUTES.rsa.encrypt : ROUTES.rsa.decrypt;
      setLink(generateShareableLink(window.location.origin, endpoint, keyCode));
    }
  }, [type, keyCode]);

  const isPublic = type === "public";
  const bgColor = isPublic ? "from-orange-500 to-amber-600" : "from-red-500 to-rose-600";
  const title = isPublic ? "Public Key (Encryption)" : "Private Key (Decryption)";
  const description = isPublic
    ? "Share this key and link to allow others to encrypt messages for you"
    : "Keep this key secret! Use it to decrypt messages encrypted with your public key";

  return (
    <Card className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
      <CardHeader className={`bg-gradient-to-r ${bgColor} text-white p-6`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="text-white/90 mt-1">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {isPublic ? "Public" : "Private"} Key:
          </label>
          <div className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
              {keyCode}
            </code>
            <button
              onClick={() => copyToClipboard(keyCode, `${type} key copied!`)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
              aria-label="Copy key"
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Shareable Link:
          </label>
          <div className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
              {link}
            </code>
            <button
              onClick={() => copyToClipboard(link, "Link copied!")}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
              aria-label="Copy link"
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function RSAKeysClient() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRSAKeys = async () => {
    setIsGenerating(true);
    try {
      const keyPair = await generateRSAKeyPair();
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.privateKey);
      toast.success(TOAST_MESSAGES.success.keyGenerated);
    } catch (error) {
      console.error('Key generation error:', error);
      toast.error(TOAST_MESSAGES.error.keyGenerationFailed);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateRSAKeys();
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-full text-sm font-medium text-orange-700 dark:text-orange-300 mb-4">
            <Lock className="w-4 h-4" />
            Rivest–Shamir–Adleman
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            RSA Key Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate secure public/private key pairs using 2048-bit RSA encryption
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <Button 
            onClick={generateRSAKeys} 
            disabled={isGenerating}
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Keys...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate New RSA Keys
              </>
            )}
          </Button>
        </div>

        {publicKey && privateKey && (
          <div className="grid md:grid-cols-2 gap-8">
            <RSACustomCard type="public" keyCode={publicKey} />
            <RSACustomCard type="private" keyCode={privateKey} />
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How to use RSA encryption:
            </h3>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">1.</span>
                <span>Share your <strong>public key</strong> or encryption link with others</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">2.</span>
                <span>They can use it to encrypt messages that only you can decrypt</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">3.</span>
                <span>Keep your <strong>private key</strong> secret to decrypt received messages</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">4.</span>
                <span>RSA uses 2048-bit keys for strong security</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
