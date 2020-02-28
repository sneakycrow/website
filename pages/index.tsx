import React, { Fragment } from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

const Index = () => (
  <Fragment>
    <Head>
      <title>sneakycrow - artist and engineer</title>
    </Head>
    <Layout>
      <div>
        <img src="/images/logo.jpg" />
        <h1>sneakycrow</h1>
        <h2>artist and engineer</h2>
        <a href="mailto:zach@sneakycrow.dev">email me</a>
      </div>
    </Layout>
    <style jsx>{`
    div {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    h1, h2 {
      font-family: 'Inter', sans-serif;
      margin-bottom: 0.5rem;
    }
    a {
      color: black;
      text-decoration: underline;
      font-family: 'Inter', sans-serif;
      margin-top: 1rem;
    }
    a:hover {
      color: #0BA750;
    }
    `}
    </style>
  </Fragment>
);

export default Index;