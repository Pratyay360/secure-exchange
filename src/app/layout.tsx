import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import DockNav from "@/components/DockNav";
import { Toaster } from "sonner";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "Secure Exchange - Encrypted Messaging Platform",
    template: "%s | Secure Exchange"
  },
  description: "Securely exchange encrypted messages using AES and ECC encryption. Generate keys, encrypt, and decrypt messages with military-grade security.",
  keywords: ["encryption", "AES", "ECC", "secure messaging", "cryptography", "privacy"],
  authors: [{ name: "Secure Exchange" }],
  openGraph: {
    title: "Secure Exchange - Encrypted Messaging Platform",
    description: "Securely exchange encrypted messages using AES and ECC encryption",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DockNav />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster richColors closeButton position="bottom-right" expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
