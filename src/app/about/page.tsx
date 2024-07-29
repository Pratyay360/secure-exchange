import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function Dropdown() {
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

function FAQ() {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is this site secure?</AccordionTrigger>
          <AccordionContent>
            Yes, encrypton is done completely on the browser side nothing is getting stored on the server.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Can I trust the generated keys?</AccordionTrigger>
          <AccordionContent>
            Yes, the keys generated on our site are random and secure.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I share the keys?</AccordionTrigger>
          <AccordionContent>
            You can share the keys by copying the generated links and sending them to the intended recipients. Ensure that you share the private key securely to maintain the confidentiality of your encrypted data.
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
          Created this site to learn about AES encryption and provide a secure platform for encrypting and decrypting messages.
          The aim is to let users use and send encrypted messages securely without the need for additional software or tools.
          This site don&apos;t even store any messages or keys, purely using the browser to encrypt and decrypt messages. 
        </p>
    
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 dark:text-white">
          Understanding AES Encryption
        </h2>
        <Dropdown />
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 mt-12 dark:text-white">
          Frequently Asked Questions
        </h2>
        <FAQ />
      </div>
    </div>
  );
}
