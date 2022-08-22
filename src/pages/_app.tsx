import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/routers';
import '@/styles/globals.css';
import Head from 'next/head';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Readdit - Reddit Client</title>
      </Head>
      <Navbar />
      <main className='max-w-screen-xl px-4 mx-auto'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config: () => ({ url: '/api/trpc' }),
  ssr: false
})(App);
