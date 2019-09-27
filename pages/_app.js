import App from 'next/app';
import React, { Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';

import ThemeToggler from '../components/themeToggler';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
  * {
    font-family: 'Montserrat', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Open Sans', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }
  h1 {
    font-size: 6em;
    font-weight: 400;
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      font-size: 3em;
    }
  }
  h2 {
    font-size: 4em;
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      font-size: 2.5em;
    }
  }
  h3 {
    font-size: 2em;
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      font-size: 2em;
    }
  }
  a {
    color: ${props => props.theme.palette.black};
    text-decoration: none;
    transition: color 0.25s ease-in-out;
    &:hover {
      color: ${props => props.theme.palette.green};
    }
  }
  /**
 * Dracula Theme originally by Zeno Rocha [@zenorocha]
 * https://draculatheme.com/
 *
 * Ported for PrismJS by Albert Vallverdu [@byverdu]
 */

code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    background: none;
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #282a36;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #6272a4;
  }

  .token.punctuation {
    color: #f8f8f2;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #ff79c6;
  }

  .token.boolean,
  .token.number {
    color: #bd93f9;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #50fa7b;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #f8f8f2;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: #f1fa8c;
  }

  .token.keyword {
    color: #8be9fd;
  }

  .token.regex,
  .token.important {
    color: #ffb86c;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
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
        <ThemeToggler>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeToggler>
      </Fragment>
    );
  }
}

export default MyApp;
