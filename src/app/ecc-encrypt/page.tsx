"use client";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { encryptWithECC } from "@/utils/ecc-crypto";

let publicKey = "";

function copyFunction() {
  const value = document.getElementById("encryptedBox") as HTMLTextAreaElement;
  if (value) {
    navigator.clipboard.writeText(value.textContent || "");
    toast.success("Encrypted text copied to clipboard");
  }
}

async function encryptECC() {
  if (publicKey === "") {
    toast.error("Please enter ECC public key");
    return;
  }
  
  const value = document.getElementById("eccEncryptBox") as HTMLTextAreaElement;
  const eView = document.getElementById("eView");
  const eBox = document.getElementById("encryptedBox") as HTMLTextAreaElement;
  
  if (value.value === "") {
    toast.error("Please enter normal text");
    return;
  }

  try {
    const encryptedBase64 = await encryptWithECC(value.value, publicKey);
    eBox.innerHTML = encryptedBase64;
    eView?.classList.remove("hidden");
  } catch (error) {
    console.error('ECC Encryption error:', error);
    toast.error("Encryption failed. Please check your public key format.");
  }
}

export default function ECCEncrypt() {
  const searchParams = useSearchParams();
  publicKey = searchParams.get("key") || "";

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-green-50 p-6 dark:bg-gray-900">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                ECC Encryption
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 dark:text-gray-400">
                Enter normal text to encrypt using Elliptic Curve Cryptography
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Enter normal text here"
                id="eccEncryptBox"
              />
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={encryptECC}>
                Encrypt with ECC
              </Button>
              <div id="eView" className="hidden space-y-4">
                <textarea
                  id="encryptedBox"
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