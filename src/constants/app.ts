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
  aesKeys: '/aes-keys',
  encrypt: '/encrypt',
  decrypt: '/decrypt',
  eccKeys: '/ecc-keys',
  eccEncrypt: '/ecc-encrypt',
  eccDecrypt: '/ecc-decrypt',
  rsaKeys: '/rsa-keys',
  rsaEncrypt: '/rsa-encrypt',
  rsaDecrypt: '/rsa-decrypt',
  about: '/about',
  aes: {
    keys: '/aes-keys',
    encrypt: '/encrypt',
    decrypt: '/decrypt'
  },
  ecc: {
    keys: '/ecc-keys',
    encrypt: '/ecc-encrypt',
    decrypt: '/ecc-decrypt'
  },
  rsa: {
    keys: '/rsa-keys',
    encrypt: '/rsa-encrypt',
    decrypt: '/rsa-decrypt'
  }
} as const;

export const TOAST_MESSAGES = {
  success: {
    keyGenerated: 'Keys generated successfully!',
    keyCopied: 'Key copied to clipboard!',
    linkCopied: 'Link copied to clipboard!',
    encrypted: 'Message encrypted successfully!',
    decrypted: 'Message decrypted successfully!',
    copied: 'Copied to clipboard!'
  },
  error: {
    keyGenerationFailed: 'Failed to generate keys. Please try again.',
    encryptionFailed: 'Encryption failed. Please check your inputs.',
    decryptionFailed: 'Decryption failed. Please check your inputs.',
    invalidKey: 'Invalid key format.',
    invalidMessage: 'Please enter a message to encrypt.',
    copyFailed: 'Failed to copy to clipboard.'
  }
} as const;

export const KEY_GENERATION = {
  minLength: 1,
  maxLength: 256,
  defaultLength: 1,
  characters: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
} as const;