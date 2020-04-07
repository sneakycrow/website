import React, { useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import withData from '../../lib/withData';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/codeBlock';
import Navigation from '../../components/Navigation';
import { createSinglePostQueryBySlug } from '../../lib/queries';
import trackView from '../../utils/trackView';

const Post = props => {
  const { data } = props;
  useEffect(() => {
    trackView(window.location.pathname);
  }, []);
  return (
    <Layout>
      <Head>
        <title>{data.sneakycrow_blog[0].title} - Sneaky Crow blog</title>
      </Head>
      <Navigation />
      <section className="markdown-body">
        <h1 className="text-4xl">{data.sneakycrow_blog[0].title}</h1>
        <h5 className="mt-2 mb-4">
          Posted on{' '}
          <strong>
            {moment.utc(data.sneakycrow_blog[0].published_on).format('MMMM DD, YYYY')}
          </strong>
        </h5>
        <ReactMarkdown source={data.sneakycrow_blog[0].body} renderers={{ code: CodeBlock }} />
      </section>
    </Layout>
  );
};

Post.getInitialProps = async ({ query }) => {
  const SINGLE_POST_QUERY = createSinglePostQueryBySlug(query.id);
  const data = await withData(SINGLE_POST_QUERY);
  return { data };
};

export default Post;
