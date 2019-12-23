import React from 'react';
import styled from 'styled-components';

import NavLink from './navLink';

const StyledFooter = styled.footer`
  margin-top: 25vh;
  border-top: 1px solid ${props => props.theme.palette.lightGray};
  padding: 24px;
  padding: 16px;
  > * {
    max-width: ${props => props.theme.layout.contentMaxWidth};
    margin: auto;
    width: 100%;
    display: block;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    li {
      padding: 8px 16px;
      display: block;
      &:not(:last-child) {
        &::after {
          content: '|';
          margin-left: 8px;
          margin-right: 8px;
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    a {
      font-size: 1.2em !important;
    }
  }
`;

const Footer = () => {
  let emailLink = 'mailto:zach@sneakycrow.dev';
  if (window.location.search.length > 0) {
    emailLink = `${emailLink}&body=${window.location.href}`;
  }

  const links = [
    { href: emailLink, label: 'Email' },
    { href: '/static/Resume.pdf', label: 'Resume' }
  ].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
  });
  return (
    <StyledFooter>
      <ul>
        {links.map(({ key, href, label }) => (
          <NavLink href={href} label={label} key={key} />
        ))}
      </ul>
    </StyledFooter>
  );
};

export default Footer;
