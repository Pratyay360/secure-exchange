"use client";

import { Copy, Shield, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateECCKeyPair } from "@/utils/ecc-crypto";
import { useClipboard } from "@/hooks/useClipboard";
import { generateShareableLink } from "@/utils/crypto-helpers";
import { ROUTES, TOAST_MESSAGES } from "@/constants/app";

interface ECCCardProps {
  type: "public" | "private";
  keyCode: string;
}

function ECCCustomCard({ type, keyCode }: ECCCardProps) {
  const [link, setLink] = useState("");
  const { copyToClipboard } = useClipboard();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const endpoint = type === "public" ? ROUTES.ecc.encrypt : ROUTES.ecc.decrypt;
      setLink(generateShareableLink(window.location.origin, endpoint, keyCode));
    }
  }, [type, keyCode]);

  const isPublic = type === "public";
  const bgColor = isPublic ? "from-green-500 to-emerald-600" : "from-blue-500 to-blue-600";
  const title = isPublic ? "Public Key (Encryption)" : "Private Key (Decryption)";
  const description = isPublic
    ? "Share this key and link to allow others to encrypt messages for you"
    : "Keep this key secret! Use it to decrypt messages encrypted with your public key";

  return (
    <Card className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
      <CardHeader className={`bg-gradient-to-r ${bgColor} text-white p-6`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Shield className="w-6 h-6" />
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

export default function ECCKeysClient() {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateECCKeys = async () => {
    setIsGenerating(true);
    try {
      const keyPair = await generateECCKeyPair();
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
    generateECCKeys();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-green-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm font-medium text-green-700 dark:text-green-300 mb-4">
            <Shield className="w-4 h-4" />
            Elliptic Curve Cryptography
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            ECC Key Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate secure public/private key pairs using P-256 elliptic curve
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <Button 
            onClick={generateECCKeys} 
            disabled={isGenerating}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating Keys...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate New ECC Keys
              </>
            )}
          </Button>
        </div>

        {publicKey && privateKey && (
          <div className="grid md:grid-cols-2 gap-8">
            <ECCCustomCard type="public" keyCode={publicKey} />
            <ECCCustomCard type="private" keyCode={privateKey} />
          </div>
        )}

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              How to use ECC encryption:
            </h3>
            <ol className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                <span>Share your <strong>public key</strong> or encryption link with others</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
                <span>They can use it to encrypt messages that only you can decrypt</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                <span>Keep your <strong>private key</strong> secret to decrypt received messages</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
