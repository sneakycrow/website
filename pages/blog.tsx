import React, { useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import withData from '../lib/withData';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import PostPreview from '../components/PostPreview';
import { ALL_POSTS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';

const BlogPage = props => {
  const { data } = props;
  useEffect(() => {
    trackView(window.location.pathname);
  }, []);
  return (
    <Layout
      title="blog - sneakycrow"
      description="The learnings, rantings, and ravings of Zachary E. Sohovich aka sneakycrow"
    >
      <Navigation />
      <section>
        {data ? (
          <ul>
            {data.sneakycrow_blog.map(post => (
              <li>
                <Link href={`/post/${post.slug}`} key={post.id}>
                  <a>
                    <PostPreview
                      title={post.title}
                      timestamp={moment.utc(post.published_on).format('MMMM DD, YYYY')}
                    />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading posts...</p>
        )}
      </section>
    </Layout>
  );
};

BlogPage.getInitialProps = async () => {
  const data = await withData(ALL_POSTS_QUERY);
  return { data };
};

export default BlogPage;
