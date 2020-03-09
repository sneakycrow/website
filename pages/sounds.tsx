import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import withData from '../lib/withData';
import { ALL_SOUNDS_QUERY } from '../lib/queries';

const SoundsPage = props => {
  const { data } = props;
  return (
    <Layout>
      <Navigation />
      {data ? (
        <section className="flex flex-col">
          {data.sneaky_audio.map(audio => (
            <a key={audio.caption} href={audio.url} className="underline">
              {audio.date} - {audio.caption}
            </a>
          ))}
        </section>
      ) : (
        <p>Loading sounds...</p>
      )}
    </Layout>
  );
};

SoundsPage.getInitialProps = async () => {
  const data = await withData(ALL_SOUNDS_QUERY);
  return { data };
};

export default SoundsPage;
