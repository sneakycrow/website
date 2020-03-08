import React from 'react';

const PostPreview = ({ title, timestamp }) => {
  return (
    <div className="flex items-center items-center h-16 mb-1 shadow-sm post-preview">
      <span className="text-sm mr-4 italic">{timestamp}</span>
      <p className="text-lg w-2/3">{title}</p>
    </div>
  )
}

export default PostPreview;
