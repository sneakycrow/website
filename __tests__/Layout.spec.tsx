import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../components/Layout';

describe('<Component /> spec', () => {
  it('renders the component', () => {
    const renderResult = render(
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    );

    expect(renderResult.container.firstChild).toMatchSnapshot();
  });
});
