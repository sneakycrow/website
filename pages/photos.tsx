import React, { useEffect } from 'react';
import useSWR from 'swr';
import Photo from '../components/Photo';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import withData from '../lib/withData';
import { ALL_PHOTOS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';

const PhotosPage = props => {
  const { photos = [] } = props;

  useEffect(() => {
    trackView(window.location.pathname);
  }, []);

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
              key={photo.date}
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
  const res = await fetch('https://sneakycrow.dev/api/get-data', { 
    method: 'POST',
    body: ALL_PHOTOS_QUERY,
    headers: {
      api_token: process.env.get_data_token
    }
  }).catch(error => {
    console.error(error);
    return null;
  });

  if (res?.status === 200) {
    try {
      const postData = await res.json().catch(() => null);
      return { props: {
        photos: postData?.data?.sneaky_photos || []
      }}
    } catch {
      return { props: {
        photos: []
      }}
    }
  } else {
    return { props: {
      photos: []
    }}
  }
}

export default PhotosPage;
