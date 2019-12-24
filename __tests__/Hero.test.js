import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Hero from '../components/hero';
import ThemeToggler from '../components/themeToggler';

describe('<Hero /> spec', () => {
  it('displays a hero with an element in it', () => {
    const container = render(
      <ThemeToggler>
        <Hero>
          <h1>Testing</h1>
        </Hero>
      </ThemeToggler>
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(container.getByRole('heading')).toHaveTextContent('Testing');
  });
});
