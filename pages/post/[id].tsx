import React, { useEffect } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/codeBlock';
import Navigation from '../../components/Navigation';
import { createSinglePostQueryBySlug, ALL_POSTS_QUERY } from '../../lib/queries';
import trackView from '../../utils/trackView';
import withData from '../../lib/withData';

const Post = ({ postData = null }) => {

  useEffect(() => {
    trackView(window.location.pathname);
  }, []);

  return (
    <Layout title={postData?.title ?? 'Error Loading Post'}>
      <Navigation />
      {postData !== null ? (
        <section className="markdown-body">
          <h1 className="text-4xl">{postData.title}</h1>
          <h5 className="mt-2 mb-4">
            Posted on <strong>{moment.utc(postData.published_on).format('MMMM DD, YYYY')}</strong>
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
  const res = await withData(ALL_POSTS_QUERY);

  const paths = res?.sneakycrow_blog?.map((post) => ({
    params: {
      id: post.slug
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const SINGLE_POST_QUERY = createSinglePostQueryBySlug(context.params.id);
  const res = await withData(SINGLE_POST_QUERY);

  console.log(res);
  return {
    props: {
      postData: res?.sneakycrow_blog[0] || null
    }
  }
}

export default Post;
