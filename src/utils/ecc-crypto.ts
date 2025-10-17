/**
 * ECC Cryptography utilities using iso-crypto
 * Implements ECIES (Elliptic Curve Integrated Encryption Scheme)
 * Uses P-256 curve with AES-256-CTR encryption
 */

import { 
    generateEccPrivateKey, 
    generateEccPublicKey, 
    eccEncrypt, 
    eccDecrypt,
    encode,
    decode
} from 'iso-crypto';
import { safeJsonParse, isValidBase64 } from '@/utils/crypto-helpers';

export interface ECCKeyPair {
    publicKey: string;
    privateKey: string;
}

export interface EncryptedData {
    encrypted: string;
    iv: string;
    senderPublicKey: string;
    version: string;
}

const ECC_CONFIG = {
    curve: 'p256' as const,
    encryption: {
        cipher: 'AES' as const,
        size: 256,
        mode: 'CTR' as const
    },
    version: '2.0'
} as const;

/**
 * Generate an ECC key pair using P-256 curve
 * @returns Promise<ECCKeyPair> Base64 encoded key pair
 * @throws Error if key generation fails
 */
export async function generateECCKeyPair(): Promise<ECCKeyPair> {
    try {
        const privateKeyBytes = await generateEccPrivateKey(ECC_CONFIG.curve);
        const publicKeyBytes = generateEccPublicKey(privateKeyBytes, ECC_CONFIG.curve);

        const privateKey = encode(privateKeyBytes, 'base64');
        const publicKey = encode(publicKeyBytes, 'base64');

        return { publicKey, privateKey };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to generate ECC key pair: ${message}`);
    }
}

/**
 * Encrypt a message using ECC public key (ECIES)
 * @param message - Plain text message to encrypt
 * @param publicKeyBase64 - Base64 encoded public key
 * @returns Promise<string> Base64 encoded encrypted data
 * @throws Error if encryption fails or key is invalid
 */
export async function encryptWithECC(message: string, publicKeyBase64: string): Promise<string> {
    if (!message.trim()) {
        throw new Error('Message cannot be empty');
    }

    if (!isValidBase64(publicKeyBase64)) {
        throw new Error('Invalid public key format');
    }

    try {
        const senderPrivateKey = await generateEccPrivateKey(ECC_CONFIG.curve);
        const receiverPublicKey = decode({ text: publicKeyBase64, encoding: 'base64' });

        const result = await eccEncrypt({
            data: message,
            privateKey: senderPrivateKey,
            publicKey: receiverPublicKey
        }, {
            curve: ECC_CONFIG.curve,
            encryption: ECC_CONFIG.encryption
        });

        const encryptedData: EncryptedData = {
            encrypted: encode(result.encrypted, 'base64'),
            iv: encode(result.iv, 'base64'),
            senderPublicKey: encode(result.publicKey, 'base64'),
            version: ECC_CONFIG.version
        };

        return btoa(JSON.stringify(encryptedData));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`ECC encryption failed: ${message}`);
    }
}

/**
 * Decrypt a message using ECC private key (ECIES)
 * @param encryptedBase64 - Base64 encoded encrypted data
 * @param privateKeyBase64 - Base64 encoded private key
 * @returns Promise<string> Decrypted message
 * @throws Error if decryption fails
 */
export async function decryptWithECC(encryptedBase64: string, privateKeyBase64: string): Promise<string> {
    if (!isValidBase64(encryptedBase64) || !isValidBase64(privateKeyBase64)) {
        throw new Error('Invalid key or encrypted data format');
    }

    try {
        const encryptedData = safeJsonParse<EncryptedData>(atob(encryptedBase64));
        if (!encryptedData) {
            throw new Error('Invalid encrypted data format');
        }

        const encrypted = decode({ text: encryptedData.encrypted, encoding: 'base64' });
        const iv = decode({ text: encryptedData.iv, encoding: 'base64' });
        const senderPublicKey = decode({ text: encryptedData.senderPublicKey, encoding: 'base64' });
        const receiverPrivateKey = decode({ text: privateKeyBase64, encoding: 'base64' });

        const decryptedBytes = await eccDecrypt({
            encrypted,
            iv,
            publicKey: senderPublicKey,
            privateKey: receiverPrivateKey
        }, {
            curve: ECC_CONFIG.curve,
            encryption: ECC_CONFIG.encryption
        });

        return new TextDecoder().decode(decryptedBytes);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`ECC decryption failed: ${message}`);
    }
}