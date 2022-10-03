import Head from "next/head";
import {MantineProvider} from "@mantine/core";
import {SessionProvider} from "next-auth/react";
import {AppProps} from "next/app";

export default function App(props: AppProps) {
    const {
        Component,
        pageProps: {
            // @ts-ignore-line
            session, ...pageProps
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
            </Head>
            {/* @ts-ignore-line */}
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "dark",
                        colors: {
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