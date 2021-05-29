import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
        <link rel="shortcut icon" href="/assets/images/logo.svg" />

        <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Personal website of Zachary Sohovich, artist and software engineer`}
      />
    </Head>
  )
}
