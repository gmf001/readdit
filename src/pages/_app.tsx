import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import superjson from 'superjson';
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
      <main className='mx-auto px-4 md:max-w-screen-xl xl:max-w-screen-2xl'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config: () => ({
    transformer: superjson,
    url: '/api/trpc'
  }),
  ssr: false
})(App);
