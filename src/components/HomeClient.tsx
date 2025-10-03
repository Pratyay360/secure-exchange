"use client";

import { useEffect, useState } from "react";
import { Copy, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KEY_GENERATION } from "@/constants/app";

function generateKeys(length: number): string {
  return Array.from({ length }, () => 
    KEY_GENERATION.characters.charAt(Math.floor(Math.random() * KEY_GENERATION.characters.length))
  ).join("");
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

interface KeyCardProps {
  type: "encrypt" | "decrypt";
  keyCode: string;
}

function KeyCard({ type, keyCode }: KeyCardProps) {
  const [link, setLink] = useState("");
  
  useEffect(() => {
    const endpoint = type === "encrypt" ? "/encrypt" : "/decrypt";
    setLink(`${getBaseUrl()}${endpoint}?key=${keyCode}`);
  }, [type, keyCode]);

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const icon = type === "encrypt" ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />;
  const title = type === "encrypt" ? "Encryption Link" : "Decryption Link";
  const description = type === "encrypt" 
    ? "Share this link to allow others to encrypt messages"
    : "Use this link to decrypt messages";

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-300 dark:hover:border-blue-700">
      <CardHeader className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
            {icon}
          </div>
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Shared Key:
          </label>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
              {keyCode}
            </code>
            <button
              onClick={() => copyToClipboard(keyCode, "Key copied to clipboard!")}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
              aria-label="Copy key"
            >
              <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Shareable Link:
          </label>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
              {link}
            </code>
            <button
              onClick={() => copyToClipboard(link, "Link copied to clipboard!")}
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

export default function HomeClient() {
  const [length, setLength] = useState<number>(KEY_GENERATION.defaultLength);
  const [keys, setKeys] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setKeys(generateKeys(length));
    }
  }, [length]);

  return (
    <div id="aes-section" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          AES Key Management
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Generate a shared key for symmetric encryption
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Key Length: <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{length}</span> characters
          </label>
          <input
            type="range"
            value={length}
            min={KEY_GENERATION.minLength}
            max={KEY_GENERATION.maxLength}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>{KEY_GENERATION.minLength}</span>
            <span>{KEY_GENERATION.maxLength}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <KeyCard type="encrypt" keyCode={keys} />
        <KeyCard type="decrypt" keyCode={keys} />
      </div>
    </div>
  );
}
