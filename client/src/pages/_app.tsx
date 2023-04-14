import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { SnackbarProvider } from 'notistack';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Fast Delivery App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/brand.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Provider store={store}>
        <SnackbarProvider
          maxSnack={2}
          autoHideDuration={2000}
          iconVariant={{
            success: <SentimentSatisfiedAltOutlinedIcon />,
            error: <SentimentVeryDissatisfiedIcon />,
            warning: '⚠️',
            info: 'ℹ️',
          }}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </Provider>
    </>
  );
}
