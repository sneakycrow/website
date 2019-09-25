import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.nav`
  width: 100%;
  display: grid;
  grid-template-columns: ${props => props.theme.layout.desktop.gridTemplateColumns};
  column-gap: ${props => props.theme.layout.desktop.gridColumnGap};
  ul {
    grid-column: 2 / span 10;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style-type: none;
    justify-content: flex-end;
  }
`;

const StyledNavLink = styled.li`
  padding: 8px 16px;
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
    &:visited {
      color: ${props => props.theme.palette.black};
    }
  }
`;

const StyledCTA = styled(StyledNavLink)`
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  background-color: ${props => props.theme.palette.black};
  border-radius: 2px;
  color: ${props => props.theme.palette.white};
  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.palette.white};
    &:visited {
      color: ${props => props.theme.palette.white};
    }
  }
`;

const links = [
  { href: 'https://github.com/sneakycrow', label: 'GitHub' },
  { href: 'https://dribbble.com/sneakycrow', label: 'Dribbble' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = () => {
  return (
    <StyledNav>
      <ul>
        <StyledNavLink>
          <Link href="/">
            <a>Home</a>
          </Link>
        </StyledNavLink>
        <StyledNavLink>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </StyledNavLink>
        {links.map(({ key, href, label }) => (
          <StyledNavLink key={key}>
            <a href={href}>{label}</a>
          </StyledNavLink>
        ))}
        <StyledCTA>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </StyledCTA>
      </ul>
    </StyledNav>
  );
};

export default Nav;
