// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";
import { createContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion'
import { Router, useRouter } from 'next/router';



const myDarkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      // brand colors
      background: '#1d1d1d',
      text: '#fff',
      // you can also create your own color
      myDarkColor: '#ff4ecd'
      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

export const GlobalContext = createContext();


function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {

  return (
    // 2. Use at the root of your app
    <SessionProvider session={session}>
      <NextUIProvider theme={myDarkTheme}>
        <AnimatePresence initial={true} mode="popLayout">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Analytics />
      </NextUIProvider>
    </SessionProvider>
  );
}

export default MyApp;
