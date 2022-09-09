import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { Provider as JotaiProvider } from 'jotai';
import superjson from 'superjson';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/routers';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={(pageProps as any)?.session}>
      <JotaiProvider>
        <Head>
          <title>Readdit - Reddit Client</title>
        </Head>
        <Navbar />
        <main className='w-full px-4 sm:mx-auto md:max-w-screen-xl md:px-8 xl:max-w-screen-2xl'>
          <Component {...pageProps} />
        </main>
      </JotaiProvider>
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
