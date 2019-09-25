import App from "next/app"
import React, { Fragment } from "react"
import Head from "next/head"
import { createGlobalStyle } from 'styled-components';

import ThemeToggler from '../components/themeToggler';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <GlobalStyle />
        <ThemeToggler>
          <Component {...pageProps} />
        </ThemeToggler>
      </Fragment>
    );
  }
}

export default MyApp;
