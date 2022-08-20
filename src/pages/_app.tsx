import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import type { AppProps } from 'next/app';
import type { AppRouter } from '@/server/routers';
import '@/styles/globals.css';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className='w-full px-4 mx-auto lg:px-0 max-w-screen-2xl'>
        <Navbar />

        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config: () => ({ url: '/api/trpc' }),
  ssr: false
})(App);
