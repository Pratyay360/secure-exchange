"use client";
import { Copy, Shield, Key } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

function copyFunction(value: string) {
  const copyText = document.getElementById(value + "Link");
  if (copyText?.textContent) {
    navigator.clipboard.writeText(copyText.textContent);
    toast.success(`${value} link copied to clipboard`);
  }
}

const BASE_URL = "https://secure-exchange.netlify.app";

function CustomCard({ value, keyCode }: { value: string; keyCode: string }) {
  const [link, setLink] = useState("");
  
  useEffect(() => {
    const endpoint = value === "public" ? "/encrypt" : "/decrypt";
    setLink(`${BASE_URL}${endpoint}?key=${keyCode}`);
  }, [value, keyCode]);
  return (
    <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden dark:bg-blue-800 dark:border-amber-200">
      <CardHeader className="bg-gray-50 p-6 dark:bg-zinc-900">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {value === "public" ? "Encrypt" : "Decrypt"}
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2 dark:text-white">
          {value === "public"
            ? "Open the link below to access the Encryption link"
            : "Copy the link below to share the Decryption link"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md dark:bg-slate-800">
          <p
            id={`${value}Link`}
            className="text-sm text-gray-800 font-mono break-all dark:text-violet-200 overflow-hidden"
          >
            {link}
          </p>
          <Copy
            className="cursor-pointer text-gray-600 hover:text-gray-800 transition-colors dark:text-gray-300 dark:hover:text-gray-200 w-6 h-6 flex justify-center items-center min-w-6 min-h-6 p-1"
            onClick={() => copyFunction(value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function CryptoMethodCard({ title, description, icon, href, color }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  href: string;
  color: string;
}) {
  return (
    <Link href={href}>
      <Card className={`w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transform transition-transform`}>
        <CardHeader className={`${color} p-6 dark:bg-gray-900`}>
          <div className="flex items-center space-x-3">
            {icon}
            <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 mt-2 dark:text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Button className="w-full">
            Get Started with {title}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

const CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const MIN_KEY_LENGTH = 1;
const MAX_KEY_LENGTH = 256;

function generateKeys(length: number): string {
  return Array.from({ length }, () => 
    CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
  ).join("");
}

export default function Home() {
  const [length, setLength] = useState(MIN_KEY_LENGTH);
  const [keys, setKeys] = useState("");

  // Only generate keys on the client to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      setKeys(generateKeys(length));
    }
  }, [length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 dark:text-white">
          Secure Encryption Platform
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg">
          Choose your preferred encryption method for secure communication
        </p>

        {/* Encryption Method Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <CryptoMethodCard
            title="AES Encryption"
            description="Symmetric encryption using Advanced Encryption Standard with shared keys"
            icon={<Key className="w-8 h-8 text-blue-600" />}
            href="#aes-section"
            color="bg-blue-50"
          />
          <CryptoMethodCard
            title="ECC Encryption"
            description="Elliptic Curve Cryptography for strong security with smaller key sizes"
            icon={<Shield className="w-8 h-8 text-green-600" />}
            href="/ecc-keys"
            color="bg-green-50"
          />
        </div>

        {/* AES Section */}
        <div id="aes-section" className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
            AES Key Management
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 dark:text-gray-300">Key Length:</label>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">{length}</span>
              <input
                type="range"
                id="length"
                value={length}
                min={MIN_KEY_LENGTH}
                max={MAX_KEY_LENGTH}
                className="slider w-48"
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
          <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            <CustomCard value="public" keyCode={keys} />
            <CustomCard value="private" keyCode={keys} />
          </div>
        </div>
      </div>
      <Toaster richColors closeButton position="bottom-right" expand={true} />
    </div>
  );
}
