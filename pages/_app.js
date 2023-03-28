// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from '@nextui-org/react';

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
function MyApp({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={myDarkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
