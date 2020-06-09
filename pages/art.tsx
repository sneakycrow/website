import React, { useEffect } from 'react';
import useSWR from 'swr';
import Photo from '../components/Photo';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import withData from '../lib/withData';
import { ALL_PHOTOS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';

const ArtPage = props => {
  const { photos = [] } = props;

  return (
    <Layout
      title="photos - sneakycrow"
      description="The complete collection of photographs taken and edited by Zachary E. Sohovich aka sneakycrow"
    >
      <Navigation />
      {photos.length > 0 ? (
          <section className="mb-4">
          {photos.map(photo => (
            <Photo
              key={photo.uuid}
              source={photo.url}
              caption={photo.caption}
              timestamp={photo.date}
            />
          ))}
        </section>
      ) : (
        <p>No photos to see here</p>
      )}
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await withData(ALL_PHOTOS_QUERY);

  return {
    props: {
      photos: res?.sneaky_photos || []
    }
  }
}

export default ArtPage;
