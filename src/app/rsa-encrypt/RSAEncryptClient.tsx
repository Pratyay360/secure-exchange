"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { encryptWithRSA } from "@/utils/rsa-crypto";

export default function RSAEncryptClient() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { copyToClipboard } = useClipboard();
  const publicKey = searchParams.get("key") || "";

  const handleEncrypt = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message to encrypt");
      return;
    }

    if (!publicKey) {
      toast.error("Please enter RSA public key");
      return;
    }

    setIsLoading(true);
    try {
      const encryptedBase64 = await encryptWithRSA(message, publicKey);
      setEncryptedText(encryptedBase64);
      setShowResult(true);
      toast.success("Message encrypted successfully!");
    } catch (error) {
      console.error('RSA Encryption error:', error);
      toast.error("Encryption failed. Please check your public key format.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    copyToClipboard(encryptedText, "Encrypted text copied to clipboard");
  };

  const handleReset = () => {
    setMessage("");
    setEncryptedText("");
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-2 border-orange-200 dark:border-orange-800">
          <CardHeader className="bg-gradient-warning text-white p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">RSA Encryption</CardTitle>
                <CardDescription className="text-orange-100 mt-2 text-base">
                  Encrypt your message using 2048-bit RSA encryption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {!publicKey && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">No public key provided</p>
                  <p>Please use a valid encryption link with a public key parameter.</p>
                </div>
              </div>
            )}

            {publicKey && (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-semibold mb-1">Public key loaded</p>
                  <code className="text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded break-all">
                    {publicKey.substring(0, 40)}...
                  </code>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Enter your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!publicKey}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {message.length} characters (RSA can encrypt up to ~190 bytes)
              </p>
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold bg-orange-600 hover:bg-orange-700 transition-all" 
              onClick={handleEncrypt}
              disabled={isLoading || !message.trim() || !publicKey}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Encrypting...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Encrypt with RSA
                </>
              )}
            </Button>
            
            {showResult && (
              <div className="space-y-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Encrypted Result
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <textarea
                  className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none bg-gray-50 dark:bg-gray-900 dark:text-white font-mono text-sm"
                  value={encryptedText}
                  readOnly
                />
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full"
                >
                  Encrypt Another Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
