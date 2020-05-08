import React, { useEffect } from 'react';
import useSWR from 'swr';
import Photo from '../components/Photo';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import withData from '../lib/withData';
import { ALL_PHOTOS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';

const PhotosPage = props => {
  const initialData = props.data;
  const { data } = useSWR(ALL_PHOTOS_QUERY, query => withData(query), { initialData });
  useEffect(() => {
    trackView(window.location.pathname);
  }, []);
  return (
    <Layout
      title="photos - sneakycrow"
      description="The complete collection of photographs taken and edited by Zachary E. Sohovich aka sneakycrow"
    >
      <Navigation />
      {data ? (
          <section className="mb-4">
          {data.sneaky_photos.map(photo => (
            <Photo
              key={photo.date}
              source={photo.url}
              caption={photo.caption}
              timestamp={photo.date}
            />
          ))}
        </section>
      ) : (
        <p>Loading photos...</p>
      )}
    </Layout>
  );
};

PhotosPage.getInitialProps = async () => {
  const data = await withData(ALL_PHOTOS_QUERY);
  return { data };
};

export default PhotosPage;
