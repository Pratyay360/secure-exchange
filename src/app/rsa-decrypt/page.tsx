import { Metadata } from "next";
import { Suspense } from "react";
import RSADecryptClient from "./RSADecryptClient";

export const metadata: Metadata = {
  title: "RSA Decryption",
  description: "Decrypt messages encrypted with RSA encryption",
};

export default function RSADecryptPage() {
  return (
    <Suspense fallback={<RSADecryptSkeleton />}>
      <RSADecryptClient />
    </Suspense>
  );
}

function RSADecryptSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-red-950 py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8">
            <div className="h-8 bg-red-400 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-red-400 rounded w-2/3"></div>
          </div>
          <div className="p-8 space-y-6">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
