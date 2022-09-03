import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import superjson from 'superjson';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/routers';
import '@/styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Readdit - Reddit Client</title>
      </Head>
      <Navbar />
      <main className='mx-auto px-4 md:max-w-screen-xl md:px-8 xl:max-w-screen-2xl'>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config: () => ({
    transformer: superjson,
    url: '/api/trpc',
    queryClientConfig: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false
        }
      }
    }
  }),
  ssr: false
})(App);
