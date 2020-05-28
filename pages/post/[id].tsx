import React, { useEffect } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/codeBlock';
import Navigation from '../../components/Navigation';
import { createSinglePostQueryBySlug, ALL_POSTS_QUERY } from '../../lib/queries';
import trackView from '../../utils/trackView';

const Post = ({ postData }) => {

  useEffect(() => {
    trackView(window.location.pathname);
  }, []);

  return (
    <Layout title={postData.title}>
      <Navigation />
      {postData ? (
        <section className="markdown-body">
        <h1 className="text-4xl">{postData.title}</h1>
        <h5 className="mt-2 mb-4">
          Posted on{' '}
          <strong>
            {moment.utc(postData.published_on).format('MMMM DD, YYYY')}
          </strong>
        </h5>
        <ReactMarkdown source={postData.body} renderers={{ code: CodeBlock }} />
      </section>
      ) : (
        <p>Error Loading Post</p>
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://sneakycrow.dev/api/get-data', { 
    method: 'POST',
    body: ALL_POSTS_QUERY
  });

  const { data: { sneakycrow_blog: posts } } = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const SINGLE_POST_QUERY = createSinglePostQueryBySlug(context.params.id);
  const res = await fetch('https://sneakycrow.dev/api/get-data', { 
    method: 'POST',
    body: SINGLE_POST_QUERY
  });

  try {
    const { data: { sneakycrow_blog } } = await res.json();
    return { props: {
      postData: sneakycrow_blog[0]
    }}
  } catch {
    return { props: {
      postData: null
    }}
  }
}

export default Post;
