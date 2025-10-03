"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { decryptWithECC } from "@/utils/ecc-crypto";

let privateKey = "";

function copyFunction() {
  const value = document.getElementById("decryptedBox") as HTMLTextAreaElement;
  if (value) {
    navigator.clipboard.writeText(value.value || "");
    toast.success("Decrypted text copied to clipboard");
  }
}

async function decryptECC() {
  if (privateKey === "") {
    toast.error("Please enter ECC private key");
    return;
  }
  
  const value = document.getElementById("eccDecryptBox") as HTMLTextAreaElement;
  const dView = document.getElementById("dView");
  const dBox = document.getElementById("decryptedBox") as HTMLTextAreaElement;
  
  if (value.value === "") {
    toast.error("Please enter encrypted text");
    return;
  }

  try {
    const decryptedText = await decryptWithECC(value.value, privateKey);
    dBox.innerHTML = decryptedText;
    dView?.classList.remove("hidden");
  } catch (error) {
    console.error('ECC Decryption error:', error);
    toast.error("Decryption failed. Please check your private key and encrypted text.");
  }
}

export default function ECCDecrypt() {
  const searchParams = useSearchParams();
  privateKey = searchParams.get("key") || "";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-green-50 p-6 dark:bg-gray-900">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                ECC Decryption
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 dark:text-gray-400">
                Enter encrypted text to decrypt using Elliptic Curve Cryptography
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Enter encrypted text here"
                id="eccDecryptBox"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={decryptECC}>
                Decrypt with ECC
              </Button>
              <div id="dView" className="hidden space-y-4">
                <textarea
                  id="decryptedBox"
                  className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  readOnly
                />
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={copyFunction}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}