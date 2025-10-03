import { Metadata } from "next";
import { Shield, Key, Lock, Unlock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Home - Secure Encryption Platform",
  description: "Choose between AES and ECC encryption methods for secure communication",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
            <Sparkles className="w-4 h-4" />
            Military-Grade Encryption
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Secure Encryption
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Platform
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose your preferred encryption method for secure, private communication
          </p>
        </div>

        {/* Encryption Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* AES Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Key className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  AES Encryption
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Symmetric encryption using Advanced Encryption Standard with shared keys
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>256-bit encryption strength</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Unlock className="w-4 h-4" />
                  <span>Fast encryption & decryption</span>
                </div>
              </div>
              <a 
                href="/aes-keys"
                className="inline-block w-full text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Started with AES
              </a>
            </div>
          </div>

          {/* ECC Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  ECC Encryption
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Elliptic Curve Cryptography for strong security with smaller key sizes
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>P-256 curve standard</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Key className="w-4 h-4" />
                  <span>Public/private key pairs</span>
                </div>
              </div>
              <a 
                href="/ecc-keys"
                className="inline-block w-full text-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Started with ECC
              </a>
            </div>
          </div>

          {/* RSA Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-amber-400 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  RSA Encryption
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                Industry-standard asymmetric encryption with 2048-bit keys
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock className="w-4 h-4" />
                  <span>2048-bit key strength</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Key className="w-4 h-4" />
                  <span>Public/private key pairs</span>
                </div>
              </div>
              <a 
                href="/rsa-keys"
                className="inline-block w-full text-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
              >
                Get Started with RSA
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
