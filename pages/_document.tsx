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
