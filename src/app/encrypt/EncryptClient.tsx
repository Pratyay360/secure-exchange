"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { useAESEncryption } from "@/hooks/useEncryption";

export default function EncryptClient() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const { copyToClipboard } = useClipboard();
  const { encrypt, isLoading } = useAESEncryption();
  
  const aesKey = searchParams.get("key") || "";

  const handleEncrypt = async () => {
    const result = await encrypt(message, aesKey);
    if (result) {
      setEncryptedText(result);
      setShowResult(true);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">AES Encryption</CardTitle>
                <CardDescription className="text-blue-100 mt-2 text-base">
                  Encrypt your message using AES-256 encryption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {!aesKey && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">No encryption key provided</p>
                  <p>Please use a valid encryption link with a key parameter.</p>
                </div>
              </div>
            )}

            {aesKey && (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-semibold mb-1">Encryption key loaded</p>
                  <code className="text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                    {aesKey.substring(0, 20)}...
                  </code>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white transition-all"
                placeholder="Enter your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!aesKey}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {message.length} characters
              </p>
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all" 
              onClick={handleEncrypt}
              disabled={isLoading || !message.trim() || !aesKey}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Encrypting...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Encrypt Message
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
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
