/**
 * Custom hook for AES encryption/decryption operations
 */

import { useState } from 'react';
import { toast } from 'sonner';
import { encrypt as aesEncrypt, decrypt as aesDecrypt, encode } from 'iso-crypto';

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
      // Use iso-crypto for AES encryption
      const result = await aesEncrypt({
        data: message,
        secret: key
      }, {
        encryption: {
          cipher: 'AES',
          size: 256,
          mode: 'CTR'
        }
      });

      // Encode the result as base64 for transmission
      const encryptedData = {
        encrypted: encode(result.encrypted, 'base64'),
        iv: encode(result.iv, 'base64'),
        version: '1.0'
      };

      const encryptedBase64 = btoa(JSON.stringify(encryptedData));
      toast.success('Message encrypted successfully!');
      return encryptedBase64;
    } catch (error) {
      console.error('Encryption error:', error);
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
      // Parse the encrypted data
      const encryptedData = JSON.parse(atob(encryptedMessage));

      // Use iso-crypto for AES decryption
      const decryptedBytes = await aesDecrypt({
        encrypted: { text: encryptedData.encrypted, encoding: 'base64' },
        iv: { text: encryptedData.iv, encoding: 'base64' },
        secret: key
      }, {
        encryption: {
          cipher: 'AES',
          size: 256,
          mode: 'CTR'
        }
      });

      const decryptedText = new TextDecoder().decode(decryptedBytes);
      toast.success('Message decrypted successfully!');
      return decryptedText;
    } catch (error) {
      console.error('Decryption error:', error);
      toast.error('Decryption failed. Please check your inputs.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { encrypt, decrypt, isLoading };
}