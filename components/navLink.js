import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavLink = styled.a`
  padding: 8px 16px;
  display: block;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: -0.5px;
  font-weight: 700;
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
    cursor: pointer;
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    font-size: 1.6em;
    padding: 16px;
  }
`;

const NavLink = ({ href = '', label = '' }) => {
  const httpsRegex = /^(https?:\/\/)|(mailto?:)/i;
  if (href.match(httpsRegex) !== null) {
    return (
      <StyledNavLink href={href}>{label}</StyledNavLink>
    )
  }
  return (
    <Link href={href}>
      <StyledNavLink>{label}</StyledNavLink>
    </Link>
  );
};

export default NavLink;
