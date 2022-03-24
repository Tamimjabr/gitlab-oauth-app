import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/material-ui-them';


function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header userInfo={pageProps?.userInfo} />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp