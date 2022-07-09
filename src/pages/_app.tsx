import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default App;
