import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Lock, Key, Zap, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About - Secure Exchange",
  description: "Learn about AES and ECC encryption methods and how to use them securely",
};

function AESDropdown() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="item-1" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">What is AES Encryption?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used across the globe to secure sensitive data. It encrypts and decrypts data in fixed block sizes of 128 bits, using key sizes of 128, 192, or 256 bits. AES is known for its speed and security, and it has become the encryption standard for many applications including financial transactions, secure communications, and data storage.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">How does AES work?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          AES works by transforming plaintext into ciphertext through a series of well-defined steps. These steps include SubBytes, ShiftRows, MixColumns, and AddRoundKey. The process is repeated for a number of rounds depending on the key size: 10 rounds for 128-bit keys, 12 rounds for 192-bit keys, and 14 rounds for 256-bit keys. Each round involves a unique round key derived from the original key.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Why is AES secure?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          AES is considered secure due to its complex key schedule, large key size, and resistance to known cryptographic attacks. The algorithm has undergone extensive analysis and testing by cryptographers worldwide, and it is currently used by governments and organizations for high-level security.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Can AES be broken?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          As of now, there are no practical attacks that can break AES when used with strong keys and properly implemented. The computational effort required to brute-force AES encryption is astronomically high, making it infeasible with current technology.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function ECCDropdown() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="ecc-1" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">What is ECC (Elliptic Curve Cryptography)?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          ECC is a public-key cryptography approach based on the algebraic structure of elliptic curves over finite fields. It provides the same level of security as RSA but with much smaller key sizes, making it more efficient for mobile devices and embedded systems. ECC is widely used in modern cryptographic applications including TLS/SSL, cryptocurrency, and digital signatures.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ecc-2" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">How does ECC work?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          ECC works by using the mathematical properties of elliptic curves. The security is based on the difficulty of the Elliptic Curve Discrete Logarithm Problem (ECDLP). In ECC, a private key is a randomly selected integer, and the corresponding public key is a point on the elliptic curve obtained by multiplying the private key with a generator point. The encryption and decryption processes use these mathematical relationships.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ecc-3" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Why choose ECC over RSA?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          ECC offers several advantages over RSA: smaller key sizes (256-bit ECC provides equivalent security to 3072-bit RSA), faster computations, lower power consumption, and reduced storage requirements. This makes ECC particularly suitable for mobile devices, IoT devices, and applications where bandwidth and storage are limited.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ecc-4" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Is ECC secure?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          Yes, ECC is considered highly secure when implemented correctly. It is recommended by major security organizations including NIST and is used in many security standards. The security of ECC relies on well-studied mathematical problems, and there are no known practical attacks against properly implemented ECC systems with adequate key sizes.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function RSADropdown() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="rsa-1" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">What is RSA Encryption?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          RSA (Rivest–Shamir–Adleman) is one of the first public-key cryptosystems and is widely used for secure data transmission. It uses asymmetric encryption with a public key for encryption and a private key for decryption. RSA is named after its inventors and has been a cornerstone of internet security for decades, used in SSL/TLS, email encryption, and digital signatures.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="rsa-2" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">How does RSA work?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          RSA works by using the mathematical properties of large prime numbers. The security is based on the difficulty of factoring the product of two large prime numbers. A public key is used to encrypt data, and only the corresponding private key can decrypt it. The algorithm involves modular exponentiation with large numbers, making it computationally infeasible to derive the private key from the public key.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="rsa-3" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Why use RSA?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          RSA is widely trusted and has been extensively studied for over 40 years. It&apos;s supported by virtually all cryptographic libraries and systems. RSA is particularly useful for key exchange, digital signatures, and scenarios where you need to encrypt data for someone without sharing a secret key beforehand. The 2048-bit key size provides strong security for most applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="rsa-4" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Is RSA secure?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          Yes, RSA with proper key sizes (2048 bits or higher) is considered secure for most applications. While quantum computers pose a theoretical threat to RSA in the future, current technology cannot break properly implemented RSA encryption. Organizations like NIST recommend 2048-bit keys for security through 2030 and beyond.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FAQ() {
  return (
    <Accordion type="single" collapsible className="space-y-2">
      <AccordionItem value="faq-1" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Is this site secure?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          Yes, all encryption and decryption is done completely on the browser side using Web Crypto API and iso-crypto library. Nothing is stored on the server - all processing happens locally in your browser for maximum security.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-2" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Can I trust the generated keys?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          Yes, the keys are generated using cryptographically secure random number generators provided by your browser&apos;s Web Crypto API. For AES, we use random character generation, and for ECC, we use the P-256 elliptic curve which is widely trusted and standardized.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-3" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">How do I share the keys?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          For AES: Share the same key with both parties (symmetric encryption). For ECC: Share your public key openly for encryption, but keep your private key secret for decryption. You can copy the generated links and send them to recipients through secure channels.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-4" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Which encryption method should I choose?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          AES is faster and suitable when you can securely share a key beforehand. ECC is better for scenarios where you can&apos;t share keys in advance - others can encrypt messages using your public key, and only you can decrypt them with your private key.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-5" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">What happens to my data?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          Your messages and keys never leave your browser. All encryption/decryption happens locally using JavaScript and Web Crypto API. The site doesn&apos;t have a backend database or logging system that could store your sensitive information.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="faq-6" className="border rounded-lg px-4 bg-white dark:bg-gray-800">
        <AccordionTrigger className="hover:no-underline">
          <span className="text-left font-semibold">Can I use this for sensitive information?</span>
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 dark:text-gray-300">
          While the encryption methods used are industry-standard and secure, this is an educational tool. For highly sensitive information, consider using established, audited encryption software. Always follow your organization&apos;s security policies.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
            <Shield className="w-4 h-4" />
            Educational Encryption Platform
          </div>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Secure Exchange
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An educational platform to learn about modern encryption algorithms and securely exchange encrypted messages. 
            All encryption happens in your browser - no data is ever stored on our servers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg w-fit mb-4">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Client-Side Encryption
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              All encryption and decryption happens in your browser using Web Crypto API
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mb-4">
              <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Multiple Algorithms
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Support for AES-256, ECC P-256, and RSA-2048 encryption methods
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mb-4">
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Data Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your messages and keys never leave your device or get stored anywhere
            </p>
          </div>
        </div>

        {/* AES Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Understanding AES Encryption
            </h2>
          </div>
          <AESDropdown />
        </div>
        
        {/* ECC Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Understanding ECC Encryption
            </h2>
          </div>
          <ECCDropdown />
        </div>

        {/* RSA Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Lock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Understanding RSA Encryption
            </h2>
          </div>
          <RSADropdown />
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <FAQ />
        </div>

        {/* Footer Note */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Educational Purpose:</strong> While this platform uses industry-standard encryption, 
            it&apos;s designed for learning and demonstration. For highly sensitive data, use established, 
            audited encryption software and follow your organization&apos;s security policies.
          </p>
        </div>
      </div>
    </div>
  );
}
