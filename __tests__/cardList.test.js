import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import CardList from '../components/cardList';
import ThemeToggler from '../components/themeToggler';

const fauxData = {
  url: '/fake-url',
  label: 'January 1st, 2020',
  text: 'Lorem Upsum',
  imageURL:
    'https://images.unsplash.com/photo-1577899563859-ef4e85d17713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80',
  imageALT: 'Random image from unsplash'
};

describe('<CardList /> spec', () => {
  it('displays a card list with three cards', () => {
    const container = render(
      <ThemeToggler>
        <CardList list={[fauxData, fauxData, fauxData, fauxData]} limit={3} />
      </ThemeToggler>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
