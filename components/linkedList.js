import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0;
  min-height: 400px;
  li {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 8px 4px;
    border-radius: 2px;
    position: relative;
    height: 100%;
    width: 100%;
    margin-bottom: 16px;
    &:hover {
      &:before {
        background-color: ${props => props.theme.palette.green};
      }
    }
    &::before {
      content: '';
      display: block;
      height: 50%;
      width: 4px;
      margin-top: 10%;
      margin-bottom: 10%;
      background-color: ${props => props.theme.palette.lightGray};
      position: absolute;
      left: -10px;
      bottom: 0;
      top: 0;
      right: 0;
      margin-right: 20px;
      margin-top: auto;
      margin-bottom: auto;
      transition: background-color 0.25s ease-in-out;
    }
    span {
      font-size: 1em;
      @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
        font-size: 0.8em;
      }
    }
    a {
      display: block;
      width: 100%;
      height: 100%;
      color: ${props => props.theme.palette.black};
      text-decoration: none;
      font-size: 2em;
      @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
        font-size: 2em;
      }
    }
  }
`;

const LinkedList = ({ list = [] }) => {
  return (
    <StyledList>
      {list.map((listItem, index) => (
        <li key={index}>
          <span>{listItem.label}</span>
          <Link href={listItem.url}>
            <a>{listItem.text}</a>
          </Link>
        </li>
      ))}
    </StyledList>
  )
}

export default LinkedList;
