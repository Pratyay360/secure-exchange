"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Copy, Lock, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useClipboard } from "@/hooks/useClipboard";
import { useAESEncryption } from "@/hooks/useEncryption";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-8 px-4">
      <div className="max-w-2xl mx-auto py-12">
        <Card className="shadow-lg bg-card border-border">
          <CardHeader className="bg-gradient-to-r from-primary to-blue-600 text-white p-6 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">AES Encryption</CardTitle>
                <CardDescription className="text-white/80 mt-1">
                  Encrypt your message using AES-256 encryption
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {!aesKey && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No encryption key provided</AlertTitle>
                <AlertDescription>
                  Please use a valid encryption link with a key parameter.
                </AlertDescription>
              </Alert>
            )}

            {aesKey && (
              <Alert>
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-200">Encryption key loaded</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-300">
                  <code className="text-xs bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded">
                    {aesKey.substring(0, 20)}...
                  </code>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                Your Message
              </Label>
              <Textarea
                id="message"
                className="h-40 resize-none"
                placeholder="Enter your secret message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!aesKey}
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length} characters
              </p>
            </div>

            <Button 
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all" 
              onClick={handleEncrypt}
              disabled={isLoading || !message.trim() || !aesKey}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
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
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <Label htmlFor="encrypted-result" className="text-sm font-medium text-foreground">
                    Encrypted Result
                  </Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-primary hover:text-primary/90"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="encrypted-result"
                  className="font-mono text-sm"
                  value={encryptedText}
                  readOnly
                />
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
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
