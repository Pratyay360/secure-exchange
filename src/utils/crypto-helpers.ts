/**
 * Crypto helper utilities for key validation, formatting, and URL handling
 */

type KeyType = 'rsa' | 'ecc';

interface JWKKey {
  kty: string;
  crv?: string;
}

/**
 * Safely parse JSON string with type safety
 * @param jsonString - JSON string to parse
 * @returns Parsed object or null if parsing fails
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

/**
 * Validate if a string is valid base64 encoded
 * @param str - String to validate
 * @returns true if valid base64, false otherwise
 */
export function isValidBase64(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

/**
 * Generate a shareable link with encoded key parameter
 * @param baseUrl - Base URL of the application
 * @param endpoint - Endpoint path (e.g., '/encrypt')
 * @param publicKey - Public key to encode in URL
 * @returns Complete shareable URL
 */
export function generateShareableLink(baseUrl: string, endpoint: string, publicKey: string): string {
  return `${baseUrl}${endpoint}?key=${encodeURIComponent(publicKey)}`;
}

/**
 * Extract key parameter from current URL
 * @returns Key string or null if not found or not in browser
 */
export function extractKeyFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('key');
}

/**
 * Validate cryptographic key format based on type
 * @param key - Base64 encoded key to validate
 * @param type - Type of key ('rsa' or 'ecc')
 * @returns true if key format is valid for the specified type
 */
export function validateKeyFormat(key: string, type: KeyType): boolean {
  if (!key || !isValidBase64(key)) return false;
  
  try {
    const parsed = safeJsonParse<JWKKey>(atob(key));
    if (!parsed || typeof parsed !== 'object') return false;
    
    if (type === 'ecc') {
      return parsed.kty === 'EC' && parsed.crv === 'P-256';
    }
    return parsed.kty === 'RSA';
  } catch {
    return false;
  }
}

/**
 * Format long keys for display by truncating
 * @param key - Key string to format
 * @param maxLength - Maximum length before truncation (default: 50)
 * @returns Formatted key string
 */
export function formatKeyForDisplay(key: string, maxLength = 50): string {
  if (key.length <= maxLength) return key;
  return `${key.substring(0, maxLength)}...`;
}