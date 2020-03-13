import React from 'react';

type PhotoProps = {
  source: string;
  caption: string;
  timestamp: string;
  width?: number;
  height?: number;
}

const Photo = ({ source, caption, timestamp, width = 2048, height = 1536 }: PhotoProps) => (
    <figure className="mt-4 mb-16 flex flex-col justify-center">
      <img className="shadow-md min-w-full" src={source} alt={caption} width={width} height={height} />
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
