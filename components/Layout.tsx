import React, { Fragment, ReactElement } from 'react';

type LayoutProps = {
  children: ReactElement<any> | ReactElement<any>[] | null
}

const Layout = (props: LayoutProps) => (
  <Fragment>
    <main className="container mx-auto p-4">
      {props.children}
    </main>
  </Fragment>
);

export default Layout;
