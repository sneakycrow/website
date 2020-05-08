import React, { Fragment, useEffect } from 'react';
import trackView from '../utils/trackView';

import Layout from '../components/Layout';

const Index = () => {
  useEffect(() => {
    trackView(window.location.pathname);
  }, []);
  const menuList = [
    {
      link: '/blog',
      title: 'blog',
      blank: false
    },
    {
      link: '/photos',
      title: 'photos',
      blank: false
    },
    {
      link: '/sounds',
      title: 'sounds',
      blank: false
    },
    {
      link: 'https://github.com/sneakycrow',
      title: 'github',
      blank: true
    },
    {
      link: '/illustrations',
      title: 'illustrations',
      blank: false
    },
    {
      link: 'mailto:zach@sneakycrow.dev',
      title: 'email',
      blank: false
    },
  ];
  return (
    <Fragment>
      <Layout title="sneakycrow - artist and engineer">
        <div className="container m-auto h-full flex flex-col content-center items-center mt-32">
          <img className="w-1/3" src="/images/logo.svg" />
          <h1 className="mt-10 font-bold">sneakycrow</h1>
          <h2>artist and engineer</h2>
          <ul className="mb-4 mt-2">
            {menuList.map(menuItem => (
              <li key={menuItem.title}>
                <a
                  target={menuItem.blank ? '_blank' : '_self'}
                  href={menuItem.link}
                  className="underline leading-loose"
                >
                  {menuItem.title}
                </a>
                <style jsx>{`
                  a {
                    text-underline-offset: 0.3em;
                  }
                `}</style>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Index;
