'use client';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { CustomThemeProvider } from '@/theme/ThemeProvider';
import { SessionProvider } from 'next-auth/react';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <SessionProvider>
        <CustomThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </CustomThemeProvider>
      </SessionProvider>
    </NextAppDirEmotionCacheProvider>
  );
}