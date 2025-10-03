"use client";

import React, { useEffect, useState } from "react";
import { Copy, Key, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/useClipboard";
import { generateShareableLink } from "@/utils/crypto-helpers";
import { ROUTES, TOAST_MESSAGES, KEY_GENERATION } from "@/constants/app";

function generateAESKey(length: number): string {
    return Array.from({ length }, () =>
        KEY_GENERATION.characters.charAt(Math.floor(Math.random() * KEY_GENERATION.characters.length))
    ).join("");
}

interface AESCardProps {
    type: "encrypt" | "decrypt";
    keyCode: string;
}

function AESCustomCard({ type, keyCode }: AESCardProps) {
    const [link, setLink] = useState("");
    const { copyToClipboard } = useClipboard();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const endpoint = type === "encrypt" ? ROUTES.encrypt : ROUTES.decrypt;
            setLink(generateShareableLink(window.location.origin, endpoint, keyCode));
        }
    }, [type, keyCode]);

    const isEncrypt = type === "encrypt";
    const bgColor = isEncrypt ? "from-blue-500 to-blue-600" : "from-purple-500 to-purple-600";
    const title = isEncrypt ? "Encryption Link" : "Decryption Link";
    const description = isEncrypt
        ? "Share this link to allow others to encrypt messages with this key"
        : "Use this link to decrypt messages encrypted with this key";

    return (
        <Card className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300">
            <CardHeader className={`bg-gradient-to-r ${bgColor} text-white p-6`}>
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Key className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle className="text-xl font-bold">{title}</CardTitle>
                        <CardDescription className="text-white/90 mt-1">
                            {description}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Shared Key:
                    </label>
                    <div className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                        <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                            {keyCode}
                        </code>
                        <button
                            onClick={() => copyToClipboard(keyCode, `${type} key copied!`)}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
                            aria-label="Copy key"
                        >
                            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Shareable Link:
                    </label>
                    <div className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                        <code className="flex-1 text-xs font-mono text-gray-800 dark:text-gray-200 break-all">
                            {link}
                        </code>
                        <button
                            onClick={() => copyToClipboard(link, "Link copied!")}
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

export default function AESKeysClient() {
    const [sharedKey, setSharedKey] = useState("");
    const [keyLength, setKeyLength] = useState<number>(KEY_GENERATION.defaultLength);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateKeys = React.useCallback(() => {
        setIsGenerating(true);
        try {
            const newKey = generateAESKey(keyLength);
            setSharedKey(newKey);
            toast.success(TOAST_MESSAGES.success.keyGenerated);
        } catch (error) {
            console.error('Key generation error:', error);
            toast.error(TOAST_MESSAGES.error.keyGenerationFailed);
        } finally {
            setIsGenerating(false);
        }
    }, [keyLength]);

    useEffect(() => {
        generateKeys();
    }, [generateKeys]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-4">
                        <Key className="w-4 h-4" />
                        Advanced Encryption Standard
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        AES Key Management
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Generate a shared key for symmetric encryption using AES-256
                    </p>
                </div>

                {/* Key Length Control */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                            Key Length: <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{keyLength}</span> characters
                        </label>
                        <input
                            type="range"
                            value={keyLength}
                            min={KEY_GENERATION.minLength}
                            max={KEY_GENERATION.maxLength}
                            onChange={(e) => setKeyLength(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                            disabled={isGenerating}
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span>{KEY_GENERATION.minLength}</span>
                            <span>{KEY_GENERATION.maxLength}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mb-12">
                    <Button
                        onClick={generateKeys}
                        disabled={isGenerating}
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Generating Key...
                            </>
                        ) : (
                            <>
                                <RefreshCw className="w-5 h-5 mr-2" />
                                Generate New AES Key
                            </>
                        )}
                    </Button>
                </div>

                {sharedKey && (
                    <div className="grid md:grid-cols-2 gap-8">
                        <AESCustomCard type="encrypt" keyCode={sharedKey} />
                        <AESCustomCard type="decrypt" keyCode={sharedKey} />
                    </div>
                )}

                <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            How to use AES encryption:
                        </h3>
                        <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">1.</span>
                                <span>Generate a shared key above (both parties need the same key)</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">2.</span>
                                <span>Share the key securely with the person you want to communicate with</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                                <span>Use the encryption link to encrypt messages, and the decryption link to decrypt them</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">4.</span>
                                <span>Both parties must use the <strong>same key</strong> for encryption and decryption</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
