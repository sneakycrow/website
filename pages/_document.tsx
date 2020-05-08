import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

const globalStyles = `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'Inter';
  src: url('Inter-Regular.woff');
}
`;

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

          <style type="text/css">{globalStyles}</style>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
