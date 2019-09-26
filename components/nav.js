import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Hamburger from './hamburger';

const StyledNavContainer = styled.nav`
  position: fixed;
  z-index: 9;
  top: 0;
  background-color: ${props => props.theme.palette.white};
  width: 100%;
  max-height: 100px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    display: block;
    background-color: rgba(0, 0, 0, 0.01);
    pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  }
`;

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  max-width: ${props => props.theme.layout.contentMaxWidth};
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style-type: none;
    justify-content: flex-end;
    transition: transform 0.25s ease-in-out;
  }
  span {
    display: none;
    position: relative;
    z-index: 10;
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      display: block;
    }
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    overflow: hidden;
    ul {
      position: absolute;
      z-index: 8;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: ${props => props.theme.palette.white};
      ${props => (props.isOpen ? 'transform: translateX(0)' : 'transform: translateX(-100vw)')};
    }
  }
`;

const StyledNavLink = styled.li`
  padding: 8px 16px;
  display: block;
  a {
    text-transform: uppercase;
    font-size: 0.8em;
    letter-spacing: -0.5px;
    font-weight: 600;
    text-decoration: none;
    color: ${props => props.theme.palette.black};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: color 0.25s ease-in-out;
    &:visited {
      color: ${props => props.theme.palette.black};
    }
    &:hover {
      color: ${props => props.theme.palette.green};
    }
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      font-size: 1.6em;
      padding: 16px;
    }
  }
`;

const StyledBrand = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.25s ease-in-out;
  img {
    max-height: 45px;
    width: auto;
    border-radius: 50%;
  }
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    opacity: 0;
  }
`;

const links = [
  { href: 'https://write.as/sneakycrow', label: 'Blog' },
  { href: 'https://github.com/sneakycrow', label: 'GitHub' },
  { href: 'https://dribbble.com/sneakycrow', label: 'Dribbble' },
  { href: 'https://mastodon.technology/@sneakycrow', label: 'Mastodon' },
  { href: 'https://twitter.com/sneakycr0w', label: 'Twitter' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  return (
    <StyledNavContainer isOpen={isNavOpen}>
      <StyledNav isOpen={isNavOpen}>
        <StyledBrand>
          <Link href="/">
            <a>
              <img src="/static/logo.png" />
            </a>
          </Link>
        </StyledBrand>
        <ul>
          {links.map(({ key, href, label }) => (
            <StyledNavLink key={key}>
              <a href={href}>{label}</a>
            </StyledNavLink>
          ))}
        </ul>
        <span onClick={() => setNavOpen(!isNavOpen)}>
          <Hamburger />
        </span>
      </StyledNav>
    </StyledNavContainer>
  );
};

export default Nav;
