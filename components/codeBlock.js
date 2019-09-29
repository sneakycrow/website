import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import Prism from './prism';

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`

const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

const CodeBlock = props => {
  console.log(props.language);
  return (
    <Highlight {...defaultProps} Prism={Prism} theme={theme} code={props.value} language={props.language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            <LineNo>{i + 1}</LineNo>
            {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
          </div>
        ))}
      </Pre>
    )}
  </Highlight>
  );
};

export default CodeBlock;
