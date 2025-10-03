"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Unlock, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { decryptWithRSA } from "@/utils/rsa-crypto";

export default function RSADecryptClient() {
  const searchParams = useSearchParams();
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { copyToClipboard } = useClipboard();
  const privateKey = searchParams.get("key") || "";

  const handleDecrypt = async () => {
    if (!encryptedMessage.trim()) {
      toast.error("Please enter encrypted text to decrypt");
      return;
    }

    if (!privateKey) {
      toast.error("Please enter RSA private key");
      return;
    }

    setIsLoading(true);
    try {
      const decrypted = await decryptWithRSA(encryptedMessage, privateKey);
      setDecryptedText(decrypted);
      setShowResult(true);
      toast.success("Message decrypted successfully!");
    } catch (error) {
      console.error('RSA Decryption error:', error);
      toast.error("Decryption failed. Please check your private key and encrypted text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    copyToClipboard(decryptedText, "Decrypted text copied to clipboard");
  };

  const handleReset = () => {
    setEncryptedMessage("");
    setDecryptedText("");
    setShowResult(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950 py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-2 border-red-200 dark:border-red-800">
          <CardHeader className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Unlock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">RSA Decryption</CardTitle>
                <CardDescription className="text-red-100 mt-2 text-base">
                  Decrypt messages encrypted with RSA public key encryption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {!privateKey && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">No private key provided</p>
                  <p>Please use a valid decryption link with a private key parameter.</p>
                </div>
              </div>
            )}

            {privateKey && (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-semibold mb-1">Private key loaded</p>
                  <code className="text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded break-all">
                    {privateKey.substring(0, 40)}...
                  </code>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Encrypted Message
              </label>
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white font-mono text-sm transition-all"
                placeholder="Paste the encrypted text here..."
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
                disabled={!privateKey}
              />
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold bg-red-600 hover:bg-red-700 transition-all" 
              onClick={handleDecrypt}
              disabled={isLoading || !encryptedMessage.trim() || !privateKey}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Decrypting...
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5 mr-2" />
                  Decrypt with RSA
                </>
              )}
            </Button>
            
            {showResult && (
              <div className="space-y-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Decrypted Message
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                  <p className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">
                    {decryptedText}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full"
                >
                  Decrypt Another Message
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
