import React, { Fragment } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from '../node_modules/react-syntax-highlighter/dist/esm/styles/hljs'

const CodeBlock = props => {
  return (
    <SyntaxHighlighter language={props.language} style={dracula}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
