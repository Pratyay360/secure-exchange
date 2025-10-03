"use client";

import React, { useEffect, useState } from "react";
import { Copy, Key, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClipboard } from "@/hooks/useClipboard";
import { generateShareableLink } from "@/utils/crypto-helpers";
import { ROUTES, TOAST_MESSAGES, KEY_GENERATION } from "@/constants/app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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
        <Card className="shadow-lg border-border bg-card hover:shadow-xl transition-all duration-300">
            <CardHeader className={`bg-gradient-to-r ${bgColor} text-white p-5`}>
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

            <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Shared Key:
                    </label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg border border-border">
                        <code className="flex-1 text-sm font-mono text-foreground break-all">
                            {keyCode}
                        </code>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(keyCode, `${type} key copied!`)}
                            className="p-2 hover:bg-accent"
                        >
                            <Copy className="w-4 h-4 text-foreground" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                        Shareable Link:
                    </label>
                    <div className="flex items-center gap-2 bg-muted p-3 rounded-lg border border-border">
                        <code className="flex-1 text-sm font-mono text-foreground break-all">
                            {link}
                        </code>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(link, "Link copied!")}
                            className="p-2 hover:bg-accent"
                        >
                            <Copy className="w-4 h-4 text-foreground" />
                        </Button>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 bg-primary/10 text-primary dark:text-primary-foreground">
                        <Key className="w-4 h-4" />
                        Advanced Encryption Standard
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        AES Key Management
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Generate a shared key for symmetric encryption using AES-256
                    </p>
                </div>

                {/* Key Length Control */}
                <div className="max-w-md mx-auto mb-8">
                    <Card className="shadow-lg bg-card border-border">
                        <CardContent className="p-6">
                            <label className="block text-sm font-medium text-foreground mb-4">
                                Key Length: <span className="text-xl font-bold text-primary">{keyLength}</span> characters
                            </label>
                            <input
                                type="range"
                                value={keyLength}
                                min={KEY_GENERATION.minLength}
                                max={KEY_GENERATION.maxLength}
                                onChange={(e) => setKeyLength(parseInt(e.target.value, 10))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                disabled={isGenerating}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>{KEY_GENERATION.minLength}</span>
                                <span>{KEY_GENERATION.maxLength}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex justify-center mb-10">
                    <Button
                        onClick={generateKeys}
                        disabled={isGenerating}
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
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
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <AESCustomCard type="encrypt" keyCode={sharedKey} />
                        <AESCustomCard type="decrypt" keyCode={sharedKey} />
                    </div>
                )}

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="instructions">
                            <AccordionTrigger className="text-lg font-semibold text-foreground">
                                How to use AES encryption
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 text-foreground">
                                    <ol className="space-y-3">
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 font-bold text-primary">1.</span>
                                            <span>Generate a shared key above (both parties need the same key)</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 font-bold text-primary">2.</span>
                                            <span>Share the key securely with the person you want to communicate with</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 font-bold text-primary">3.</span>
                                            <span>Use the encryption link to encrypt messages, and the decryption link to decrypt them</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="flex-shrink-0 font-bold text-primary">4.</span>
                                            <span>Both parties must use the <strong>same key</strong> for encryption and decryption</span>
                                        </li>
                                    </ol>
                                    <Separator className="my-4" />
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                        <h4 className="font-semibold text-primary mb-2">Security Note</h4>
                                        <p className="text-sm text-foreground/80">
                                            Always ensure secure sharing of keys. Never transmit keys through unsecured channels.
                                        </p>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
