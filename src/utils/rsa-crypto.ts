/**
 * RSA Encryption/Decryption utilities using Web Crypto API
 */

interface RSAKeyPair {
  publicKey: string;
  privateKey: string;
}

interface EncryptedData {
  data: number[];
  version: string;
}

const RSA_CONFIG = {
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256' as const,
  version: '1.0'
} as const;

/**
 * Generate RSA key pair
 */
export async function generateRSAKeyPair(): Promise<RSAKeyPair> {
  try {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: RSA_CONFIG.modulusLength,
        publicExponent: RSA_CONFIG.publicExponent,
        hash: RSA_CONFIG.hash,
      },
      true,
      ['encrypt', 'decrypt']
    );

    const publicKeyJWK = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
    const privateKeyJWK = await crypto.subtle.exportKey('jwk', keyPair.privateKey);

    const publicKey = btoa(JSON.stringify(publicKeyJWK));
    const privateKey = btoa(JSON.stringify(privateKeyJWK));

    return { publicKey, privateKey };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to generate RSA key pair: ${message}`);
  }
}

/**
 * Encrypt message with RSA public key
 */
export async function encryptWithRSA(message: string, publicKeyBase64: string): Promise<string> {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }

  try {
    const publicKeyJWK = JSON.parse(atob(publicKeyBase64));

    const publicKeyObj = await crypto.subtle.importKey(
      'jwk',
      publicKeyJWK,
      {
        name: 'RSA-OAEP',
        hash: RSA_CONFIG.hash,
      },
      false,
      ['encrypt']
    );

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKeyObj,
      data
    );

    const encryptedData: EncryptedData = {
      data: Array.from(new Uint8Array(encrypted)),
      version: RSA_CONFIG.version
    };

    return btoa(JSON.stringify(encryptedData));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`RSA encryption failed: ${message}`);
  }
}

/**
 * Decrypt message with RSA private key
 */
export async function decryptWithRSA(encryptedBase64: string, privateKeyBase64: string): Promise<string> {
  try {
    const encryptedData: EncryptedData = JSON.parse(atob(encryptedBase64));
    const privateKeyJWK = JSON.parse(atob(privateKeyBase64));

    const privateKeyObj = await crypto.subtle.importKey(
      'jwk',
      privateKeyJWK,
      {
        name: 'RSA-OAEP',
        hash: RSA_CONFIG.hash,
      },
      false,
      ['decrypt']
    );

    const encryptedBytes = new Uint8Array(encryptedData.data);

    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKeyObj,
      encryptedBytes
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`RSA decryption failed: ${message}`);
  }
}
