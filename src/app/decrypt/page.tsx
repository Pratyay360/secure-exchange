"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useClipboard } from "@/hooks/useClipboard";
import { useAESEncryption } from "@/hooks/useEncryption";
export default function DecryptPage() {
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

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-gray-50 p-6 dark:bg-gray-900">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                AES Decryption
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 dark:text-gray-400">
                Enter encrypted text to decrypt using AES
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter encrypted text here..."
                value={encryptedMessage}
                onChange={(e) => setEncryptedMessage(e.target.value)}
              />
              <Button 
                className="w-full" 
                onClick={handleDecrypt}
                disabled={isLoading || !encryptedMessage.trim() || !aesKey}
              >
                {isLoading ? "Decrypting..." : "Decrypt"}
              </Button>
              
              {showResult && (
                <div className="space-y-4">
                  <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    value={decryptedText}
                    readOnly
                  />
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                      onClick={handleCopy}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
