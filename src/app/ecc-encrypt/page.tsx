import { Metadata } from "next";
import { Suspense } from "react";
import ECCEncryptClient from "./ECCEncryptClient";

export const metadata: Metadata = {
  title: "ECC Encryption",
  description: "Encrypt messages using Elliptic Curve Cryptography",
};

export default function ECCEncryptPage() {
  return (
    <Suspense fallback={<ECCEncryptSkeleton />}>
      <ECCEncryptClient />
    </Suspense>
  );
}

function ECCEncryptSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card shadow-lg rounded-2xl overflow-hidden border border-border animate-pulse">
          <div className="gradient-success p-8">
            <div className="h-8 bg-white/30 rounded-lg w-1/3 mb-2"></div>
            <div className="h-4 bg-white/20 rounded-lg w-2/3"></div>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded-lg"></div>
            </div>
            <div className="h-11 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
