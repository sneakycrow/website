import React, { useEffect } from 'react';
import Link from 'next/link';
import moment from 'moment';
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import PostPreview from '../components/PostPreview';
import { ALL_POSTS_QUERY } from '../lib/queries';
import trackView from '../utils/trackView';
import withData from '../lib/withData';

const BlogPage = props => {
  const { posts = [] } = props;

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
        {posts.length > 0 ? (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <Link href={`/post/${post.slug}`}>
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
          <p>Error loading posts</p>
        )}
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const res = await withData(ALL_POSTS_QUERY);

  return {
    props: {
      posts: res?.sneakycrow_blog || []
    }
  }
}

export default BlogPage;
