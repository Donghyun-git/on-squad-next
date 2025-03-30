import React from 'react';

import type { Metadata, Viewport } from 'next';

import Script from 'next/script';

import Providers from '@/services/providers';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import 'quill/dist/quill.core.css';

import { Wrapper } from '@/components/Wrapper';
import { ShowBottomTab } from '@/components/ShowBottomTab';
import { Modal } from '@/components/Modal';

import { SessionProvider } from '@/providers/SessionProvider';

import { ErrorHandlingWrapper } from './_component/ErrorBoundary';
import { ErrorFallback } from './_component/ErrorFallback';
import { Spinner } from '@/components/Spinner';

export const metadata: Metadata = {
  title: '온스쿼드 - 취미생활의 아지트',
  description: 'onsquad, 온스쿼드, 취미, 생활, 아지트, 등산, 게임',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>

      <Script
        strategy="lazyOnload"
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
      />
      <body className={cn('bg-background antialiased')}>
        <SessionProvider>
          <ErrorHandlingWrapper
            fallbackComponent={ErrorFallback}
            suspenseFallback={<Spinner />}
          >
            <Providers>
              <Wrapper>
                <ShowBottomTab>{children}</ShowBottomTab>
              </Wrapper>
            </Providers>
          </ErrorHandlingWrapper>
          <Toaster />
          <Modal />
        </SessionProvider>
      </body>
    </html>
  );
}
