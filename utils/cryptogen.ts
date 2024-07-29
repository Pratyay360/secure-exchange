// Create a new file, e.g., utils/cryptoHelper.ts

class CryptoHelper {
    static async generateKeyPair(): Promise<CryptoKeyPair> {
      const crypto = await import('crypto').then(mod => mod.webcrypto);
      return await crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
    }
  
    static async encrypt(publicKey: CryptoKey, data: string): Promise<string> {
      const crypto = await import('crypto').then(mod => mod.webcrypto);
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      
      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP"
        },
        publicKey,
        encodedData
      );
      
      return Buffer.from(encryptedBuffer).toString('base64');
    }
  
    static async decrypt(privateKey: CryptoKey, encryptedData: string): Promise<string> {
      const crypto = await import('crypto').then(mod => mod.webcrypto);
      const decoder = new TextDecoder();
      const encryptedBuffer = Buffer.from(encryptedData, 'base64');
      
      const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "RSA-OAEP"
        },
        privateKey,
        encryptedBuffer
      );
      
      return decoder.decode(decryptedBuffer);
    }
  
    static async exportPublicKey(publicKey: CryptoKey): Promise<string> {
      const crypto = await import('crypto').then(mod => mod.webcrypto);
      const exported = await crypto.subtle.exportKey("spki", publicKey);
      return Buffer.from(exported).toString('base64');
    }
  
    static async importPublicKey(publicKeyString: string): Promise<CryptoKey> {
      const crypto = await import('crypto').then(mod => mod.webcrypto);
      const keyData = Buffer.from(publicKeyString, 'base64');
      return await crypto.subtle.importKey(
        "spki",
        keyData,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"]
      );
    }
  }
  
  export default CryptoHelper;