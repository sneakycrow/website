import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  max-width: ${props => props.theme.layout.contentMaxWidth};
  margin: auto;
  padding: 16px;
`;

const Hero = ({ children }) => (
  <StyledHero>
    {children}
  </StyledHero>
);

export default Hero;
