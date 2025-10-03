"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Unlock, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { useAESEncryption } from "@/hooks/useEncryption";

export default function DecryptClient() {
  const searchParams = useSearchParams();
  const [encryptedMessage, setEncryptedMessage] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [showResult, setShowResult] = useState(false);
  
  const { copyToClipboard } = useClipboard();
  const { decrypt, isLoading } = useAESEncryption();
  
  const aesKey = searchParams.get("key") || "";

  const handleDecrypt = async () => {
    const result = await decrypt(encryptedMessage, aesKey);
    if (result) {
      setDecryptedText(result);
      setShowResult(true);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950 py-12 px-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Unlock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold">AES Decryption</CardTitle>
                <CardDescription className="text-purple-100 mt-2 text-base">
                  Decrypt messages encrypted with AES-256
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-6">
            {!aesKey && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-semibold mb-1">No decryption key provided</p>
                  <p>Please use a valid decryption link with a key parameter.</p>
                </div>
              </div>
            )}

            {aesKey && (
              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-semibold mb-1">Decryption key loaded</p>
                  <code className="text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                    {aesKey.substring(0, 20)}...
                  </code>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Encrypted Message
              </label>
              <textarea
                className="w-full h-40 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:text-white font-mono text-sm transition-all"
                placeholder="Paste the encrypted text here..."
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
                disabled={!aesKey}
              />
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-all" 
              onClick={handleDecrypt}
              disabled={isLoading || !encryptedMessage.trim() || !aesKey}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Decrypting...
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5 mr-2" />
                  Decrypt Message
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
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
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
