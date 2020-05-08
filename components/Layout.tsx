import React, { Fragment, ReactElement } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactElement<any> | ReactElement<any>[] | null
  title: string;
  description?: string;
}

const Layout = (props: LayoutProps) => (
  <Fragment>
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      {props.description && (
        <meta name="description" content={props.description} />
      )}
    </Head>
    <main className="container mx-auto p-4">
      {props.children}
    </main>
  </Fragment>
);

export default Layout;
