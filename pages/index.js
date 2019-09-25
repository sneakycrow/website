import React, { Fragment, useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import Nav from '../components/nav';
import PostList from '../components/postList';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: ${props => props.theme.layout.desktop.gridTemplateColumns};
  column-gap: ${props => props.theme.layout.desktop.gridColumnGap};
`;

const StyledHero = styled.div`
  grid-column: 2 / span 10;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  h1 {
    font-size: 6em;
    text-align: center;
    font-weight: 400;
  }
`

const Home = () => {
  const [activeAKAIndex, setActiveAKAIndex] = useState(0);
  const akaList = ['Sneaky Crow', 'Boophis']
  const handleSetAKA = () => {
    if (akaList[activeAKAIndex + 1] === undefined) {
      return setActiveAKAIndex(0);
    }
    return setActiveAKAIndex(activeAKAIndex + 1);
  }
  return (
    <Fragment>
      <Head>
        <title>Sneaky Crow</title>
      </Head>
  
      <Nav />
  
      <StyledWrapper>
        <StyledHero>
          <h1>Hi, I'm <s>Zachary Sohovich</s>, a.k.a <b onClick={handleSetAKA}>{akaList[activeAKAIndex]}</b></h1>
        </StyledHero>
        <PostList />
      </StyledWrapper>
    </Fragment>
  );
}

export default Home;
