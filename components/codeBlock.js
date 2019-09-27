import React, { Fragment } from 'react';
import Prism from 'prismjs';

const CodeBlock = props => {
  const html = Prism.highlight(props.literal, Prism.languages[props.language]);
  const cls = 'language-' + props.language;

  return (
    <pre className={cls}>
      <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
    </pre>
  );
};

export default CodeBlock;
