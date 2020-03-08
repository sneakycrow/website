import React, { Fragment } from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';

const Index = () => {
  const menuList = [{
    link: "/photos",
    title: "my photos",
    blank: false
  },
  {
    link: "https://github.com/sneakycrow",
    title: "my github",
    blank: true
  },
  {
    link: "/illustrations",
    title: "my illustrations",
    blank: false
  },
  {
    link: "mailto:zach@sneakycrow.dev",
    title: "my email",
    blank: false
  }]
  return (
    <Fragment>
      <Head>
        <title>sneakycrow - artist and engineer</title>
      </Head>
      <Layout>
        <div className="container m-auto h-full flex flex-col content-center items-center mt-32">
          <img className="w-1/3" src="/images/logo.svg" />
          <h1 className="mt-10 font-bold">sneakycrow</h1>
          <h2>artist and engineer</h2>
          <ul className="mb-4 mt-2 list-disc">
            {menuList.map(menuItem => (
              <li key={menuItem.title}>
                <a target={menuItem.blank ? "_blank" : "_self"} className="underline" href={menuItem.link}>{menuItem.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </Fragment>
  );
}

export default Index;
