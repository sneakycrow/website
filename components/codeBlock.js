import React, { Fragment } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = props => {
  console.log(props);
  return (
    <SyntaxHighlighter language={props.language}>
      {props.value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
