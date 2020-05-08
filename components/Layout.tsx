import React, { Fragment, ReactElement } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactElement<any> | ReactElement<any>[] | null
  title: string;
}

const Layout = (props: LayoutProps) => (
  <Fragment>
    <Head>
      <title>{props.title}</title>
    </Head>
    <main className="container mx-auto p-4">
      {props.children}
    </main>
  </Fragment>
);

export default Layout;
