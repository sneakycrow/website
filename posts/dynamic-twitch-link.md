# New dynamic Twitch link added to site

I added a new dynamic twitch link to the website. When I'm not live on Twitch, it's just a normal link. When I go live it turns purple and gets a red "recording dot" next to it. 

It's a pretty simple component, I'm super happy about it. Here's the [source](https://github.com/sneakycrow/website/blob/master/components/twitchLink.js): 

```javascript
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
    fetch('https://api.twitch.tv/helix/streams?user_login=TWITCH_USERNAME', {
      headers: {
        'Client-ID': 'YOUR CLIENT ID
      }
    })
      .then(res => res.json())
      .then(twitchData => {
        if (twitchData.data.length > 0 && twitchData.data[0].viewer_count !== null) {
          setLive(true);
        }
      });
  }, []);

  return (
    <StyledTwitchLink href="https://twitch.tv/TWITCH_USERNAME" isLive={isLive}>
      Twitch
    </StyledTwitchLink>
  );
};

export default TwitchLink;
```
