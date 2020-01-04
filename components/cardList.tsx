import React from 'react';
import styled from 'styled-components';
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
    <StyledCardList>
      {list.slice(0, limit).map((listItem, index) => (
        <Link href={listItem.url} key={index}>
          <StyledCard key={index}>
            <img src={listItem.imageURL} alt={listItem.imageALT} />
            <StyledCardBody>
              <div>
                <h3>{listItem.text}</h3>
                <p>{listItem.label}</p>
              </div>
            </StyledCardBody>
          </StyledCard>
        </Link>
      ))}
    </StyledCardList>
  );
};

const StyledCardList = styled.section`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => props.theme.layout.gridTemplateColumns};
  column-gap: ${props => props.theme.layout.gridColumnGap};
  row-gap: ${props => props.theme.layout.gridColumnGap};
  max-width: ${props => props.theme.layout.contentMaxWidth};
`;

const StyledCard = styled.div`
  grid-column: span 4;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, .5);
  transition: box-shadow 0.25s ease-in-out;
  img {
    width: 100%;
    min-width: 400px;
    min-height: 400px;
    border-radius: 31px;
    filter: saturate(1.2);
    transform: scale(1.1);
    transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, .5);
    img {
      filter: saturate(1);
      transform: scale(1);
    }
  }
`;

const StyledCardBody = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: radial-gradient(circle at 50% 0%, transparent 20px, ${props => props.theme.palette.white} 20px);
  padding: 30px 20px;
  height: 150px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, .5);
  div {
    position: relative;
    height: 150px;
    width: 100%;
    z-index: 2;
    height: 100%;
    h3 {
      font-size: 30px;
      margin-bottom: 0;
      text-transform: none;
      line-height: 1.2;
      font-weight: bold;
      height: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &::after {
        content: '';
        background-color: ${props => props.theme.palette.green};
        display: block;
        height: 4px;
        width: 50px;
        margin-top: 5px;
        margin-bottom: 5px;
      }
    }
    p {
      font-size: 16px;
      font-weight: bold;
      height: 50%;
      color: ${props => props.theme.palette.gray};
    }
  }
`;

export default CardList;
