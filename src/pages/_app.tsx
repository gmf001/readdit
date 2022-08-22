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
      <main className='w-full px-4 mx-auto lg:px-0 max-w-screen-2xl'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config: () => ({ url: '/api/trpc' }),
  ssr: false
})(App);
