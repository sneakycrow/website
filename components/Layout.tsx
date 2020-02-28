import React, { Fragment, ReactElement } from 'react';

type LayoutProps = {
  children: ReactElement<any> | null
}

const Layout = (props: LayoutProps) => (
  <Fragment>
    <div>
      {props.children}
    </div>
    <style jsx>{`
      div {
        width: 100vw;
        padding: 16px;
        background-color: white;
      }
    `}</style>
  </Fragment>
);

export default Layout;
