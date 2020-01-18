import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import ReactGA from 'react-ga';

// thank you @koodiklin
// https://github.com/koodiklinikka/koodiklinikka.fi/commit/e27c50601d728b3b20320ffcc021a81657d8d4d6#diff-664264179f734c3055eba103c71ad479
const trackPageView = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return;
  }
  if (!window.GA_INITIALIZED) {
    ReactGA.initialize(process.env.googl_tracking_code);
    window.GA_INITIALIZED = true;
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

export default class MyDocument extends Document {
  static getInitialProps = ({ renderPage }) => {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  };

  componentDidMount() {
    trackPageView();
  }

  render() {
    return (
      <html>
        <Head>
          <link href="/fonts/inter.css" rel="stylesheet" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
