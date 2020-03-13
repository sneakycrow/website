import React from 'react';

const PostPreview = ({ title, timestamp }) => {
  return (
    <div className="flex content-center items-start h-16 mb-4 shadow-sm post-preview">
      <span className="text-sm mr-4 italic w-1/4">{timestamp}</span>
      <p className="text-lg w-2/3 leading-tight">{title}</p>
    </div>
  )
}

export default PostPreview;
