import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

export default function App(props: AppProps) {
  const {
    Component,
    pageProps: {
      // @ts-ignore-line
      session,
      ...pageProps
    },
  } = props;

  return (
    <>
      <Head>
        <title>fulcrum</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="stylesheet" href="https://use.typekit.net/uno8edm.css" />
      </Head>
      {/* @ts-ignore-line */}
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Nunito, sans-serif",
            fontSizes: { xs: 12, sm: 16, md: 24, lg: 32, xl: 64 },
            headings: {
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              sizes: {
                h1: {
                  fontSize: 96,
                  lineHeight: 1.2,
                },
                h2: {
                  fontSize: 80,
                },
                h3: {
                  fontSize: 64,
                },
                h4: {
                  fontSize: 48,
                },
                h5: {
                  fontSize: 32,
                },
                h6: {
                  fontSize: 24,
                },
              },
            },
            colorScheme: "dark",
            primaryColor: "sneakycrow",
            colors: {
              sneakycrow: [
                "#ddffee",
                "#b1fed4",
                "#81fbba",
                "#52faa0",
                "#26f886",
                "#12df6c",
                "#05ad54",
                "#007c3b",
                "#004a22",
                "#001b07",
              ],
              twitch: [
                "#f2e3ff",
                "#d3b2ff",
                "#b380ff",
                "#954dff",
                "#771bfe",
                "#771bfe",
                "#771bfe",
                "#5d02e5",
                "#5d02e5",
                "#4800b3",
              ],
            },
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </>
  );
}
