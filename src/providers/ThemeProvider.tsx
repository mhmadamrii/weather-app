'use client';

import React from 'react';

import { ThemeProvider as NextThemesProvider } from 'next-theme';
import { ThemeProviderProps } from 'next-theme/dist/provider/index.props';
import { GlobalContextProvider } from '~/context';

export function ThemeProvider({
  children,
  ...props
}: Readonly<
  ThemeProviderProps & {
    enableSystem: boolean;
    disableTransitionOnChange: boolean;
  } & {
    children: React.ReactNode;
  }
>) {
  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>
        {children}
      </GlobalContextProvider>
    </NextThemesProvider>
  );
}
