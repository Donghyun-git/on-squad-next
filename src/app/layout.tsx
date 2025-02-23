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

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/services/get-query-client';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <Script
        strategy="lazyOnload"
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
      />
      <body className={cn('bg-background antialiased')}>
        <SessionProvider>
          <Providers>
            <Wrapper>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <ShowBottomTab>{children}</ShowBottomTab>
              </HydrationBoundary>
            </Wrapper>
          </Providers>
          <Toaster />
          <Modal />
        </SessionProvider>
      </body>
    </html>
  );
}
