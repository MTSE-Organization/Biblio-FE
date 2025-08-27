'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  useEffect(() => setTheme('light'), [setTheme]);
  return <>{children}</>;
}
