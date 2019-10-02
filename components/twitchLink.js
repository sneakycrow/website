import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import styled from 'styled-components';

const StyledTwitchLink = styled.a`
  color: ${props => (props.isLive ? props.theme.palette.twitch : props.theme.palette.black)};
  padding: 8px 16px;
  display: block;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: -0.5px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.25s ease-in-out;
  &:visited {
    color: ${props => (props.isLive ? props.theme.palette.twitch : props.theme.palette.black)};
  }
  &:hover {
    color: ${props => props.theme.palette.twitch};
    cursor: pointer;
  }
  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: ${props => (props.isLive ? 'block' : 'none')};
    background-color: ${props => props.theme.palette.red};
    margin-left: 4px;
  }
  @media screen and (max-width: ${props => props.theme.layout.mobileMaxWidth}) {
    font-size: 1.6em;
    padding: 16px;
  }
`;

const TwitchLink = () => {
  const [isLive, setLive] = useState(false);
  useEffect(() => {
    fetch('https://api.twitch.tv/helix/streams?user_login=sneakycr0w', {
      headers: {
        'Client-ID': '0bhs4en3k15l4wjq278c28h0r3d3u2'
      }
    })
      .then(res => res.json())
      .then(twitchData => {
        console.log(twitchData);
        if (twitchData.data.length > 0 && twitchData.data[0].viewer_count !== null) {
          setLive(true);
        }
      });
  }, []);

  return (
    <StyledTwitchLink href="https://twitch.tv/sneakycr0w" isLive={isLive}>
      Twitch
    </StyledTwitchLink>
  );
};

export default TwitchLink;
