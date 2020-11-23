import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Logo from '../assets/images/logo.svg';
import '../styles/main.css';

export default () => (
    <Fragment>
        <Helmet>
            <meta charSet="utf-8" />
            <title>sneakycrow - Artist and Engineer</title>
        </Helmet>
        <img src={Logo} alt="Line art of a crow wearing a green hat" />
        <h1>sneakycrow</h1>
        <h2>artist and engineer</h2>
        <a href="mailto:zach@sneakycrow.dev">email me</a>
    </Fragment>
);
