import React from 'react';
import styled, { keyframes } from 'styled-components';


const StyledThrobberWrapper = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
`

const AnimationSpinning = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const StyledThrobber = styled.div`
  display: block;
  width: 24px;
  height: 24px;
  margin: -10px;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  border: 3px solid;
  border-top-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  color: black;
  background-color: transparent;
  animation: ${AnimationSpinning} 0.9s linear infinite;
`;

const Throbber = () => (
  <StyledThrobberWrapper>
    <StyledThrobber />
  </StyledThrobberWrapper>
)

export default Throbber;
