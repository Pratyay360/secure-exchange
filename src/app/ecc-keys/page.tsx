"use client";
import { Copy } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { generateECCKeyPair } from "@/utils/ecc-crypto";
import { useClipboard } from "@/hooks/useClipboard";
import { generateShareableLink } from "@/utils/crypto-helpers";
import { APP_CONFIG, ROUTES, TOAST_MESSAGES } from "@/constants/app";

interface ECCCardProps {
  type: "public" | "private";
  keyCode: string;
}

function ECCCustomCard({ type, keyCode }: ECCCardProps) {
  const [link, setLink] = useState("");
  const { copyToClipboard } = useClipboard();
  
  useEffect(() => {
    const endpoint = type === "public" ? ROUTES.ecc.encrypt : ROUTES.ecc.decrypt;
    setLink(generateShareableLink(APP_CONFIG.baseUrl, endpoint, keyCode));
  }, [type, keyCode]);

  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden dark:bg-green-800 dark:border-green-200">
      <CardHeader className="bg-green-50 p-6 dark:bg-zinc-900">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {type === "public" ? "ECC Encrypt" : "ECC Decrypt"}
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2 dark:text-white">
          {type === "public"
            ? "Share this link to allow others to encrypt messages for you"
            : "Use this link to decrypt messages encrypted with your public key"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {type === "public" ? "Public Key:" : "Private Key:"}
          </label>
          <div className="flex items-start justify-between bg-gray-100 p-3 rounded-md dark:bg-slate-800">
            <p className="text-xs text-gray-800 font-mono break-all dark:text-violet-200 overflow-hidden flex-1 mr-2">
              {keyCode}
            </p>
            <Copy
              className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors dark:text-gray-300 dark:hover:text-gray-200 w-5 h-5 flex-shrink-0 mt-1"
              onClick={() => copyToClipboard(keyCode, `${type} key copied to clipboard`)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {type === "public" ? "Encryption Link:" : "Decryption Link:"}
          </label>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md dark:bg-slate-800">
            <p className="text-xs text-gray-800 font-mono break-all dark:text-violet-200 overflow-hidden flex-1 mr-2">
              {link}
            </p>
            <Copy
              className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors dark:text-gray-300 dark:hover:text-gray-200 w-5 h-5 flex-shrink-0"
              onClick={() => copyToClipboard(link, `${type} link copied to clipboard`)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ECCKeys() {
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

  // Generate keys on component mount
  useEffect(() => {
    generateECCKeys();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 dark:text-white">
          ECC Key Management
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Elliptic Curve Cryptography provides strong security with smaller key sizes
        </p>
        
        <div className="flex justify-center mb-8">
          <Button 
            onClick={generateECCKeys} 
            disabled={isGenerating}
            className="bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? "Generating..." : "Generate New ECC Keys"}
          </Button>
        </div>

        {publicKey && privateKey && (
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            <ECCCustomCard type="public" keyCode={publicKey} />
            <ECCCustomCard type="private" keyCode={privateKey} />
          </div>
        )}
      </div>
      <Toaster richColors closeButton position="bottom-right" expand={true} />
    </div>
  );
}