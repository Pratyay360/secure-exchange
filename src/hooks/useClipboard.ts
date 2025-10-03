/**
 * Custom hook for clipboard operations
 */

import { useState } from 'react';
import { toast } from 'sonner';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string, successMessage?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage || 'Copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
      
      return true;
    } catch (error) {
      toast.error('Failed to copy to clipboard');
      return false;
    }
  };

  return { copyToClipboard, copied };
}