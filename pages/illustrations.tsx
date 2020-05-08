import React, { useEffect } from 'react';
import useSWR from 'swr';
import Photo from '../components/Photo';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import withData from '../lib/withData';
import { ALL_ILLUSTRATIONS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';

const IllustrationsPage = props => {
  const initialData = props.data;
  const { data } = useSWR(ALL_ILLUSTRATIONS_QUERY, query => withData(query), { initialData });
  useEffect(() => {
    trackView(window.location.pathname);
  }, []);
  return (
    <Layout title="illustrations - sneakycrow">
      <Navigation />
      {data ? (
        <section className="mb-4">
          {data.sneaky_illustrations.map(illustration => (
            <Photo
              key={illustration.date}
              source={illustration.url}
              caption={illustration.caption}
              timestamp={illustration.date}
            />
          ))}
        </section>
      ) : (
        <p>Loading photos...</p>
      )}
    </Layout>
  );
};

IllustrationsPage.getInitialProps = async () => {
  const data = await withData(ALL_ILLUSTRATIONS_QUERY);
  return { data };
};

export default IllustrationsPage;
