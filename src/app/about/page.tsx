import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function AESDropdown() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is AES Encryption?</AccordionTrigger>
          <AccordionContent>
            AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used across the globe to secure sensitive data. It encrypts and decrypts data in fixed block sizes of 128 bits, using key sizes of 128, 192, or 256 bits. AES is known for its speed and security, and it has become the encryption standard for many applications including financial transactions, secure communications, and data storage.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does AES work?</AccordionTrigger>
          <AccordionContent>
            AES works by transforming plaintext into ciphertext through a series of well-defined steps. These steps include SubBytes, ShiftRows, MixColumns, and AddRoundKey. The process is repeated for a number of rounds depending on the key size: 10 rounds for 128-bit keys, 12 rounds for 192-bit keys, and 14 rounds for 256-bit keys. Each round involves a unique round key derived from the original key.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Why is AES secure?</AccordionTrigger>
          <AccordionContent>
            AES is considered secure due to its complex key schedule, large key size, and resistance to known cryptographic attacks. The algorithm has undergone extensive analysis and testing by cryptographers worldwide, and it is currently used by governments and organizations for high-level security.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can AES be broken?</AccordionTrigger>
          <AccordionContent>
            As of now, there are no practical attacks that can break AES when used with strong keys and properly implemented. The computational effort required to brute-force AES encryption is astronomically high, making it infeasible with current technology.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function ECCDropdown() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="ecc-1">
          <AccordionTrigger>What is ECC (Elliptic Curve Cryptography)?</AccordionTrigger>
          <AccordionContent>
            ECC is a public-key cryptography approach based on the algebraic structure of elliptic curves over finite fields. It provides the same level of security as RSA but with much smaller key sizes, making it more efficient for mobile devices and embedded systems. ECC is widely used in modern cryptographic applications including TLS/SSL, cryptocurrency, and digital signatures.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ecc-2">
          <AccordionTrigger>How does ECC work?</AccordionTrigger>
          <AccordionContent>
            ECC works by using the mathematical properties of elliptic curves. The security is based on the difficulty of the Elliptic Curve Discrete Logarithm Problem (ECDLP). In ECC, a private key is a randomly selected integer, and the corresponding public key is a point on the elliptic curve obtained by multiplying the private key with a generator point. The encryption and decryption processes use these mathematical relationships.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ecc-3">
          <AccordionTrigger>Why choose ECC over RSA?</AccordionTrigger>
          <AccordionContent>
            ECC offers several advantages over RSA: smaller key sizes (256-bit ECC provides equivalent security to 3072-bit RSA), faster computations, lower power consumption, and reduced storage requirements. This makes ECC particularly suitable for mobile devices, IoT devices, and applications where bandwidth and storage are limited.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ecc-4">
          <AccordionTrigger>Is ECC secure?</AccordionTrigger>
          <AccordionContent>
            Yes, ECC is considered highly secure when implemented correctly. It is recommended by major security organizations including NIST and is used in many security standards. The security of ECC relies on well-studied mathematical problems, and there are no known practical attacks against properly implemented ECC systems with adequate key sizes.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function FAQ() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="faq-1">
          <AccordionTrigger>Is this site secure?</AccordionTrigger>
          <AccordionContent>
            Yes, all encryption and decryption is done completely on the browser side using Web Crypto API and iso-crypto library. Nothing is stored on the server - all processing happens locally in your browser for maximum security.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>Can I trust the generated keys?</AccordionTrigger>
          <AccordionContent>
            Yes, the keys are generated using cryptographically secure random number generators provided by your browser's Web Crypto API. For AES, we use random character generation, and for ECC, we use the P-256 elliptic curve which is widely trusted and standardized.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>How do I share the keys?</AccordionTrigger>
          <AccordionContent>
            For AES: Share the same key with both parties (symmetric encryption). For ECC: Share your public key openly for encryption, but keep your private key secret for decryption. You can copy the generated links and send them to recipients through secure channels.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>Which encryption method should I choose?</AccordionTrigger>
          <AccordionContent>
            AES is faster and suitable when you can securely share a key beforehand. ECC is better for scenarios where you can't share keys in advance - others can encrypt messages using your public key, and only you can decrypt them with your private key.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-5">
          <AccordionTrigger>What happens to my data?</AccordionTrigger>
          <AccordionContent>
            Your messages and keys never leave your browser. All encryption/decryption happens locally using JavaScript and Web Crypto API. The site doesn't have a backend database or logging system that could store your sensitive information.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-6">
          <AccordionTrigger>Can I use this for sensitive information?</AccordionTrigger>
          <AccordionContent>
            While the encryption methods used are industry-standard and secure, this is an educational tool. For highly sensitive information, consider using established, audited encryption software. Always follow your organization's security policies.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-700">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 dark:text-white">
          About This Site
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8 dark:text-gray-300">
          Created this site to learn about modern encryption algorithms and provide a secure platform for encrypting and decrypting messages.
          The aim is to let users use and send encrypted messages securely without the need for additional software or tools.
          This site supports both AES (symmetric) and ECC (asymmetric) encryption methods, and doesn&apos;t store any messages or keys - everything is processed in your browser.
        </p>
    
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
          Understanding AES Encryption
        </h2>
        <AESDropdown />
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 mt-12 dark:text-white">
          Understanding ECC Encryption
        </h2>
        <ECCDropdown />
        
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 mt-12 dark:text-white">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </div>
    </div>
  );
}
