/**
 * ECC Cryptography utilities using iso-crypto
 * Implements ECIES (Elliptic Curve Integrated Encryption Scheme)
 */

import { 
    generateEccPrivateKey, 
    generateEccPublicKey, 
    eccEncrypt, 
    eccDecrypt,
    encode,
    decode
} from 'iso-crypto';
import { safeJsonParse, isValidBase64 } from "@/utils/crypto-helpers";

export interface ECCKeyPair {
    publicKey: string;
    privateKey: string;
}

export interface EncryptedData {
    encrypted: string;
    iv: string;
    senderPublicKey: string;
    version: string; // For future compatibility
}

/**
 * Generate an ECC key pair using P-256 curve
 * @returns Promise<ECCKeyPair> Base64 encoded key pair
 * @throws Error if key generation fails
 */
export async function generateECCKeyPair(): Promise<ECCKeyPair> {
    try {
        // Generate private key using iso-crypto
        const privateKeyBytes = await generateEccPrivateKey('p256');
        
        // Generate corresponding public key
        const publicKeyBytes = generateEccPublicKey(privateKeyBytes, 'p256');

        // Encode keys as base64 for storage/transmission
        const privateKey = encode(privateKeyBytes, 'base64');
        const publicKey = encode(publicKeyBytes, 'base64');

        return {
            publicKey,
            privateKey
        };
    } catch (error) {
        throw new Error(`Failed to generate ECC key pair: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        // Generate a temporary private key for the sender
        const senderPrivateKey = await generateEccPrivateKey('p256');
        
        // Decode the receiver's public key from base64
        const receiverPublicKey = decode({ text: publicKeyBase64, encoding: 'base64' });

        // Encrypt the message using iso-crypto
        const result = await eccEncrypt({
            data: message,
            privateKey: senderPrivateKey,
            publicKey: receiverPublicKey
        }, {
            curve: 'p256',
            encryption: {
                cipher: 'AES',
                size: 256,
                mode: 'CTR'
            }
        });

        // Encode the result for transmission
        const encryptedData: EncryptedData = {
            encrypted: encode(result.encrypted, 'base64'),
            iv: encode(result.iv, 'base64'),
            senderPublicKey: encode(result.publicKey, 'base64'),
            version: '2.0'
        };

        return btoa(JSON.stringify(encryptedData));
    } catch (error) {
        throw new Error(`ECC encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
        // Parse encrypted data
        const encryptedData = safeJsonParse<EncryptedData>(atob(encryptedBase64));
        if (!encryptedData) {
            throw new Error('Invalid encrypted data format');
        }

        // Decode the components
        const encrypted = decode({ text: encryptedData.encrypted, encoding: 'base64' });
        const iv = decode({ text: encryptedData.iv, encoding: 'base64' });
        const senderPublicKey = decode({ text: encryptedData.senderPublicKey, encoding: 'base64' });
        const receiverPrivateKey = decode({ text: privateKeyBase64, encoding: 'base64' });

        // Decrypt using iso-crypto
        const decryptedBytes = await eccDecrypt({
            encrypted,
            iv,
            publicKey: senderPublicKey,
            privateKey: receiverPrivateKey
        }, {
            curve: 'p256',
            encryption: {
                cipher: 'AES',
                size: 256,
                mode: 'CTR'
            }
        });

        // Convert bytes to string
        return new TextDecoder().decode(decryptedBytes);
    } catch (error) {
        throw new Error(`ECC decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}