/**
 * Crypto helper utilities
 */

/**
 * Safely parse JSON string
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

/**
 * Check if string is valid base64
 */
export function isValidBase64(str: string): boolean {
  try {
    return btoa(atob(str)) === str;
  } catch {
    return false;
  }
}

/**
 * Generate shareable link for keys
 */
export function generateShareableLink(baseUrl: string, endpoint: string, publicKey: string): string {
  return `${baseUrl}${endpoint}?key=${encodeURIComponent(publicKey)}`;
}

/**
 * Extract key from URL parameters
 */
export function extractKeyFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('key');
}

/**
 * Validate key format based on type
 */
export function validateKeyFormat(key: string, type: 'rsa' | 'ecc'): boolean {
  if (!key || !isValidBase64(key)) return false;
  
  try {
    const parsed = safeJsonParse<any>(atob(key));
    if (!parsed || typeof parsed !== 'object') return false;
    
    if (type === 'ecc') {
      return parsed.kty === 'EC' && parsed.crv === 'P-256';
    } else {
      return parsed.kty === 'RSA';
    }
  } catch {
    return false;
  }
}

/**
 * Format key for display (truncate long keys)
 */
export function formatKeyForDisplay(key: string, maxLength: number = 50): string {
  if (key.length <= maxLength) return key;
  return `${key.substring(0, maxLength)}...`;
}