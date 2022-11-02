import React from 'react';
import Navbar from '../navbar/navbar';
import Advertise from '../advertise/advertise';
import Footer from '../footer/footer';
import { Fragment } from 'react/cjs/react.production.min';

function Layout(props) {
    return(
        <Fragment>
            <Navbar />
            <main>{props.children}</main>
            <Advertise />
            <Footer />
        </Fragment>
    );
}

export default Layout;