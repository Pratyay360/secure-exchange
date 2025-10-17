/**
 * Custom hook for AES encryption/decryption operations
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { encrypt as aesEncrypt, decrypt as aesDecrypt, encode } from 'iso-crypto';

interface EncryptedData {
  encrypted: string;
  iv: string;
  version: string;
}

const ENCRYPTION_CONFIG = {
  cipher: 'AES' as const,
  size: 256,
  mode: 'CTR' as const,
  version: '1.0'
};

export function useAESEncryption() {
  const [isLoading, setIsLoading] = useState(false);

  const encrypt = async (message: string, key: string): Promise<string | null> => {
    if (!message.trim()) {
      toast.error('Please enter a message to encrypt');
      return null;
    }

    if (!key.trim()) {
      toast.error('Please provide an encryption key');
      return null;
    }

    setIsLoading(true);
    try {
      const result = await aesEncrypt({
        data: message,
        secret: key
      }, {
        encryption: {
          cipher: ENCRYPTION_CONFIG.cipher,
          size: ENCRYPTION_CONFIG.size,
          mode: ENCRYPTION_CONFIG.mode
        }
      });

      const encryptedData: EncryptedData = {
        encrypted: encode(result.encrypted, 'base64'),
        iv: encode(result.iv, 'base64'),
        version: ENCRYPTION_CONFIG.version
      };

      const encryptedBase64 = btoa(JSON.stringify(encryptedData));
      toast.success('Message encrypted successfully!');
      return encryptedBase64;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Encryption error:', errorMessage);
      toast.error('Encryption failed. Please check your inputs.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const decrypt = async (encryptedMessage: string, key: string): Promise<string | null> => {
    if (!encryptedMessage.trim()) {
      toast.error('Please enter encrypted text to decrypt');
      return null;
    }

    if (!key.trim()) {
      toast.error('Please provide a decryption key');
      return null;
    }

    setIsLoading(true);
    try {
      const encryptedData: EncryptedData = JSON.parse(atob(encryptedMessage));

      const decryptedBytes = await aesDecrypt({
        encrypted: { text: encryptedData.encrypted, encoding: 'base64' },
        iv: { text: encryptedData.iv, encoding: 'base64' },
        secret: key
      }, {
        encryption: {
          cipher: ENCRYPTION_CONFIG.cipher,
          size: ENCRYPTION_CONFIG.size,
          mode: ENCRYPTION_CONFIG.mode
        }
      });

      const decryptedText = new TextDecoder().decode(decryptedBytes);
      toast.success('Message decrypted successfully!');
      return decryptedText;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Decryption error:', errorMessage);
      toast.error('Decryption failed. Please check your inputs.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { encrypt, decrypt, isLoading };
}