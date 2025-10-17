

![image](https://github.com/user-attachments/assets/ad8a2bd8-14aa-4858-929d-d11ef331ad20)
project screenshot 

# Secure Exchange - Encryption Platform

A modern web application for secure message encryption and decryption using both AES (symmetric) and ECC (asymmetric) cryptography. Built with Next.js and powered by Web Crypto API and iso-crypto.

## Features

### 🔐 Dual Encryption Support
- **AES Encryption**: Fast symmetric encryption with customizable key lengths (1-256 characters)
- **ECC Encryption**: Elliptic Curve Cryptography using P-256 curve for public-key encryption

### 🛡️ Security First
- All encryption/decryption happens client-side in your browser
- No data is stored on servers - complete privacy
- Uses Web Crypto API for cryptographically secure operations
- Industry-standard encryption algorithms

### 🎨 Modern UI/UX
- Clean, responsive design with dark/light theme support
- Intuitive dock navigation for easy access to all features
- Real-time feedback with toast notifications
- Mobile-friendly interface

## Encryption Methods

### AES (Advanced Encryption Standard)
- **Use Case**: When you can securely share a key beforehand
- **Type**: Symmetric encryption (same key for encrypt/decrypt)
- **Key Length**: Customizable from 1-256 characters
- **Speed**: Very fast encryption/decryption

### ECC (Elliptic Curve Cryptography)
- **Use Case**: When you can't share keys in advance
- **Type**: Asymmetric encryption (public/private key pair)
- **Curve**: P-256 (NIST recommended)
- **Security**: Strong security with smaller key sizes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Cryptography**: Web Crypto API, iso-crypto library
- **Build Tool**: Bun
- **Deployment**: Vercel

## Security Notes

- This is an educational tool demonstrating modern cryptographic techniques
- All cryptographic operations use browser-native Web Crypto API
- For production use with highly sensitive data, consider audited enterprise solutions
- Always follow your organization's security policies

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
