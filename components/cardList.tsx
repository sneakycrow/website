import React from 'react';
import Link from 'next/link';

interface ICardListProps {
  list: Array<ICard>;
  limit: number;
}

interface ICard {
  label: string;
  imageURL: string;
  imageALT: string;
  url: string;
  text: string;
}

const CardList = (props: ICardListProps) => {
  const { list = [], limit = 5 } = props;
  return (
    <div>
      {list.slice(0, limit).map((listItem, index) => (
        <div key={index}>
          <h3>{listItem.label}</h3>
          <img src={listItem.imageURL} alt={listItem.imageALT} />
          <Link href={listItem.url}>
            <a>{listItem.text}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardList;
