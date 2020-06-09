import React, { useEffect } from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/codeBlock';
import Navigation from '../../components/Navigation';
import { createSinglePostQueryBySlug, ALL_POSTS_QUERY } from '../../lib/queries';
import trackView from '../../utils/trackView';

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
  // Call an external API endpoint to get posts
  const res = await fetch('https://sneakycrow.dev/api/get-data', {
    method: 'POST',
    body: ALL_POSTS_QUERY,
    headers: {
      api_token: process.env.GET_DATA_TOKEN
    }
  }).catch(error => {
    console.error(error);
    return null;
  });

  if (res?.status === 200) {
    const jsonResponse = await res.json().catch((error) => {
      console.error(error);
      return null;
    });
  
    const paths =
      jsonResponse?.data?.sneakycrow_blog?.map((post) => ({
        params: { id: post.slug },
      })) ?? [];
      return { paths, fallback: false };
  }
  return { paths: [], fallback: false };
}

export async function getStaticProps(context) {
  const SINGLE_POST_QUERY = createSinglePostQueryBySlug(context.params.id);
  const res = await fetch('https://sneakycrow.dev/api/get-data', {
    method: 'POST',
    body: SINGLE_POST_QUERY,
  }).catch(error => {
    console.error(error);
    return null;
  })

  if (res?.status === 2000) {
    try {
      const jsonResponse = await res.json().catch(error => {
        console.error(error);
        return null;
      });
      return {
        props: {
          postData: jsonResponse?.data?.sneakycrow_blog[0] ?? null,
        },
      };
    } catch (error) {
      return {
        props: {
          postData: null,
          error,
        },
      };
    }
  } else {
    return {
      props: {
        postData: null
      },
    };
  }
}

export default Post;
