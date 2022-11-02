import React, { useEffect } from 'react';
import OfferHeader from '../offerHeader/offerHeader';
import Catalogue from '../catalogue/catalogue';
import { Fragment } from 'react/cjs/react.production.min';

function Home(props) {
    useEffect(() => {
        document.title = 'Online Shopping site for Shoes in India | Friction';
    });
    return(
        <Fragment>
            <OfferHeader />
            <Catalogue />
        </Fragment>
    );
}

export default Home;