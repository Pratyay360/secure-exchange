/**
 * Application constants and configuration
 */

export const APP_CONFIG = {
  name: 'secure-exchange',
  description: 'Securely exchange encrypted messages',
  version: '1.0.0',
  baseUrl: typeof window !== 'undefined' ? window.location.origin : ''
} as const;

export const ENCRYPTION_CONFIG = {
  ecc: {
    algorithm: 'ECDH' as const,
    curve: 'P-256' as const
  },
  aes: {
    algorithm: 'AES-GCM' as const,
    keyLength: 256,
    ivLength: 12
  },
  rsa: {
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1])
  }
} as const;

export const ROUTES = {
  home: '/',
  encrypt: '/encrypt',
  decrypt: '/decrypt',
  eccKeys: '/ecc-keys',
  eccEncrypt: '/ecc-encrypt',
  eccDecrypt: '/ecc-decrypt',
  about: '/about',
  ecc: {
    encrypt: '/ecc-encrypt',
    decrypt: '/ecc-decrypt'
  }
} as const;

export const TOAST_MESSAGES = {
  keyGenerated: 'Keys generated successfully!',
  keyCopied: 'Key copied to clipboard!',
  linkCopied: 'Link copied to clipboard!',
  encryptionSuccess: 'Message encrypted successfully!',
  decryptionSuccess: 'Message decrypted successfully!',
  encryptionError: 'Encryption failed. Please check your inputs.',
  decryptionError: 'Decryption failed. Please check your inputs.',
  invalidKey: 'Invalid key format.',
  invalidMessage: 'Please enter a message to encrypt.',
  copyError: 'Failed to copy to clipboard.',
  success: {
    keyGenerated: 'Keys generated successfully!',
    encryptionSuccess: 'Message encrypted successfully!',
    decryptionSuccess: 'Message decrypted successfully!'
  },
  error: {
    keyGenerationFailed: 'Failed to generate keys. Please try again.',
    encryptionError: 'Encryption failed. Please check your inputs.',
    decryptionError: 'Decryption failed. Please check your inputs.',
    invalidKey: 'Invalid key format.',
    invalidMessage: 'Please enter a message to encrypt.'
  }
} as const;

export const CRYPTO_METHODS = [
  {
    title: 'RSA Encryption',
    description: 'Traditional asymmetric encryption using RSA algorithm',
    href: ROUTES.encrypt,
    color: 'bg-blue-100',
    icon: '🔐'
  },
  {
    title: 'ECC Encryption', 
    description: 'Modern elliptic curve cryptography for enhanced security',
    href: ROUTES.eccEncrypt,
    color: 'bg-green-100',
    icon: '🔑'
  }
] as const;