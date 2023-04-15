// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";
import { createContext, useEffect, useState } from 'react';


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

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const [communityNight, setCommunityNight] = useState();

  useEffect(() => {
    localStorage.setItem('communityNight', communityNight);
  }, [communityNight]);

  useEffect(() => {
    const storedCommunityNight = localStorage.getItem('communityNight');
    if (storedCommunityNight) {
      setCommunityNight(storedCommunityNight);
    }
  }, []);



  // useEffect(() => { console.log(communityNight) }, [communityNight]);

  return (
    // 2. Use at the root of your app
    <GlobalContext.Provider value={{ communityNight, setCommunityNight }}>
      <SessionProvider session={session}>
        <NextUIProvider theme={myDarkTheme}>
          <Component {...pageProps} />
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Analytics />
        </NextUIProvider>
      </SessionProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
