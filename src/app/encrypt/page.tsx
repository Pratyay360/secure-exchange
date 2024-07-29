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
let publicKey = "";
function copyFunction() {
  const value = document.getElementById("encryptedBox");
  if (value) {
    navigator.clipboard.writeText(value.textContent || "");
    toast.success("Encrypted text copied to clipboard");
  }
}

const encryptRsa = (publicKey: string, text: string) => {
  return text;
};
function encrypt() {
  if (publicKey === "") {
    toast.error("Please enter public key");
    return;
  } else {
    const value = document.getElementById("excryptBox") as HTMLTextAreaElement;
    const eView = document.getElementById("eView");
    const eBox = document.getElementById("encryptedBox") as HTMLTextAreaElement;
    if (value.value === "") {
      toast.error("Please enter normal text");
      return;
    }
    eBox.value = encryptRsa(publicKey, value.value);
    eView?.classList.remove("hidden");
  }
}
export default function Home() {
  const searchParams = useSearchParams();
  publicKey = searchParams.get("key") || "";
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
        <Toaster richColors closeButton position="bottom-right" expand={true} />
        <div className="w-full max-w-md">
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-gray-50 p-6 dark:bg-gray-900">
              <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Enter Normal text
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2 dark:text-gray-400">
                Enter Normal text to get the Encrypted one
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <textarea
                className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter encrypted text here"
                id="excryptBox"
              />
              <Button className="w-full" onClick={encrypt}>
                Encrypt
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
