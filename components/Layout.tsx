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
        height: 100vh;
        padding: 16px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </Fragment>
);

export default Layout;
