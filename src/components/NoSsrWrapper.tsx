'use client';

import { useEffect, useState } from 'react';

interface NoSsrWrapperProps {
  children: React.ReactNode;
}

export function NoSsrWrapper({ children }: NoSsrWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return children;
}