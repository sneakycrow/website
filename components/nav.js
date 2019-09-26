import React from 'react';
import styled, { keyframes } from 'styled-components';

const StyledNavContainer = styled.nav`
  position: fixed;
  z-index: 999;
  top: 0;
  background-color: ${props => props.theme.palette.white};
  width: 100%;
  max-height: 100px;
  display: flex;
  justify-content: center;
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
    @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
      grid-column: 1 / span 12;
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
  return (
    <StyledNavContainer>
      <StyledNav>
        <StyledBrand>
          <img src="/static/logo.png" />
        </StyledBrand>
        <ul>
          {links.map(({ key, href, label }) => (
            <StyledNavLink key={key}>
              <a href={href}>{label}</a>
            </StyledNavLink>
          ))}
        </ul>
      </StyledNav>
    </StyledNavContainer>
  );
};

export default Nav;
