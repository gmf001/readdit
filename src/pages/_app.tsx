import { withTRPC } from "@trpc/next";
import type { AppProps } from "next/app";
import type { AppRouter } from "@/server/routers";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withTRPC<AppRouter>({
  config: () => ({ url: "/api/trpc" }),
  ssr: false
})(App);
