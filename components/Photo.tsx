import React from 'react';

const Photo = ({ source, caption, timestamp }) => (
    <figure className="mt-4 mb-16">
      <img className="shadow-md max-h-screen" src={source} alt={caption} />
      <figcaption className="mt-2">
        <span className="float-left">{caption}</span>
        <span className="float-right">{timestamp}</span>
      </figcaption>
      <style jsx>{`
        figcaption {
          color: grey;
          font-style: italic;
        }
      `}</style>
    </figure>
)

export default Photo;
