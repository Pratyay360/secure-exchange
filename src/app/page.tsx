"use client";
import { Copy } from "lucide-react";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function copyFunction(value: string) {
  var copyText = document.getElementById(value + "Link");
  if (copyText) {
    const textContent = copyText.textContent;
    if (textContent) {
      navigator.clipboard.writeText(textContent);
      toast.success(value + " link copied to clipboard");
    }
  }
}

function CustomCard({ value, keyCode }: { value: string; keyCode: string }) {
  const [link, setLink] = useState("");
  useEffect(() => {
    if (value === "public") {
      setLink("https://secure-exchange.netlify.app/encrypt?key=" + keyCode);
    } else {
      setLink("https://secure-exchange.netlify.app/decrypt?key=" + keyCode);
    }
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

export default function Home() {
  const [length, setLength] = useState(1);
  const [keys, setKeys] = useState("");

  const generateKeys = (len: number) => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let number = "0123456789";
    let characters = lower + upper + number;
    let generatedKeys = "";

    for (let i = 0; i < len; i++) {
      generatedKeys += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return generatedKeys;
  };

  useEffect(() => {
    setKeys(generateKeys(length));
  }, [length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 dark:text-white">
          Encryption Key Management
        </h1>
        <div className="flex justify-center mb-4">
          <p id="outputs" className="mr-4">{length}</p>
          <input
            type="range"
            id="length"
            value={length}
            min="1"
            max="256"
            className="slider"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          <CustomCard value="public" keyCode={keys} />
          <CustomCard value="private" keyCode={keys} />
        </div>
      </div>
      <Toaster richColors closeButton position="bottom-right" expand={true} />
    </div>
  );
}
