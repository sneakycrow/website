import React from 'react';
import { menuList } from '../lib/constants';

const Navigation = () => {
  return (
    <nav className="container mx-auto h-12 flex flex-initial justify-between mt-2 mb-8">
      <a href="/" className="block h-full">
        <img className="block h-full" src="/images/logo.svg" alt="Crow logo for Sneaky Crow" />
      </a>
      <ul className="flex flex-initial justify-between items-center h-full">
        {menuList.map(menuItem => (
          <li className="flex items-center mr-4" key={menuItem.title}>
            <a className="flex items-center" href={menuItem.link} target={menuItem.blank ? "_blank" : "_self"}>
              {menuItem.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
