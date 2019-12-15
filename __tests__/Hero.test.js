import React from 'react';
import { render } from '@testing-library/react';
import Hero from '../components/hero';
import ThemeToggler from '../components/themeToggler';

describe('<Hero /> spec', () => {
  it('renders the component', () => {
    const container = render(
      <ThemeToggler>
        <Hero>
          <h1>Testing</h1>
        </Hero>
      </ThemeToggler>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
