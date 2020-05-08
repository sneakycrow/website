import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState<string>('');
  const [postSlug, setPostSlug] = useState<string>('');
  const [postBody, setPostBody] = useState<string>('');

  useEffect(() => {
    const transformTitleIntoSlug = (title: string): string => title
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-');
    
    setPostSlug(transformTitleIntoSlug(postTitle));
    
    return () => {
      transformTitleIntoSlug('testing this');
    }
  }, [postTitle])

  return (
    <Layout>
      <form>
        <label htmlFor="post-title">Post Title</label>
        <input type="text" value={postTitle} onChange={({ currentTarget }) => setPostTitle(currentTarget.value)} />
        <label htmlFor="post-body">Post Body</label>
        <textarea rows={4} value={postBody} onChange={({ currentTarget }) => setPostBody(currentTarget.value)} />
        <h4>Slug: {postSlug}</h4>
      </form>
      <style jsx>{`
        input, textarea {
          border: 1px solid red;
        }
        form {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </Layout>
  )
};

export default NewPost;
