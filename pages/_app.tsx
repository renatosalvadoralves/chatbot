import React from "react";
import "../styles/globals.css";
import "../styles/app.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ChatBot</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
