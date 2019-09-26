import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 0;
  background: ${props => props.theme.palette.white};
  cursor: pointer;
  display: inline-block;
  padding: 1em 1.5em;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  font-size: 0.875em;
  padding: 1em;
  outline-offset: -2px;
  pointer-events: all;
  border-radius: 2px;
`;

const StyledHamburgerIcon = styled.svg`
  display: inline-block;
  fill: ${props => props.theme.palette.black};
  height: 1em;
  width: 1em;
  vertical-align: middle;
  position: relative; /* Align more nicely with capital letters */
  top: -0.0625em;
  width: 2em;
  height: 2em;
  top: 0;
  g {
    > * {
      opacity: 1;
      transform: rotate(0) translateY(0) translateX(0);
      transform-origin: 1em 1em;
      transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
      &:nth-child(1) {
        transform-origin: 1em 2.5em;
        ${props => props.isOpen && 'transform: rotate(45deg) translateY(0) translateX(0)'};
      }
      &:nth-child(2) {
        transform-origin: 1em 2.5em;
        ${props => props.isOpen ? 'opacity: 0' : ''};
      }
      &:nth-child(3) {
        transform-origin: 1em 4.5em;
        ${props => props.isOpen ? 'transform: rotate(-45deg) translateY(0em) translateX(0em)' : ''};
      }
    }
  }
`;

const StyledScreenReaderText = styled.span`
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

const Hamburger = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <StyledButton
      isOpen={isOpen}
      onClick={() => setOpen(!isOpen)}
      aria-expanded={isOpen ? 'true' : 'false'}
    >
      <StyledScreenReaderText>Menu</StyledScreenReaderText>
      <StyledHamburgerIcon
        isOpen={isOpen}
        aria-hidden="true"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
      >
        <g>
          <path d="M5 13h90v14H5z" />
          <path d="M5 43h90v14H5z" />
          <path d="M5 73h90v14H5z" />
        </g>
      </StyledHamburgerIcon>
    </StyledButton>
  );
};

export default Hamburger;
