import "@/styles/globals.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { Kanit } from "next/font/google";
import Layout from "../components/Layout";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["400", "700"], // You can specify the weights you need
});

const theme = createTheme({
  typography: {
    fontFamily: kanit.style.fontFamily,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
