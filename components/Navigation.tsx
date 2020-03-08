import React from 'react';

const Navigation = () => {
  const menuList = [
    {
      link: '/photos',
      title: 'photos',
      blank: false
    },
    {
      link: "https://github.com/sneakycrow",
      title: "github",
      blank: true
    },
    {
      link: '/illustrations',
      title: 'illustrations',
      blank: false
    },
  ];
  return (
    <nav className="container mx-auto h-12 flex flex-initial justify-between mt-2 mb-2">
      <a href="/" className="block h-full">
        <img className="block min-h-full" src="/images/logo.svg" alt="Crow logo for Sneaky Crow" />
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
