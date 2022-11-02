import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ProductCard from '../../card/productCard';
import preloader from '../../image/sectionLoader.gif';
import Pagination from '../../pagination/pagination';
import classes from './shoeTypes.module.css';

function ShoeTypes(props){

    const {tname} = useParams();

    const [products, setProducts] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const postPerPage = 10;

    const [gen, stype] = tname.split("-");

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        document.title = 'Buy '+ gen.charAt(0).toUpperCase() + gen.slice(1) +' '+ stype.charAt(0).toUpperCase() + stype.slice(1) + ' Online in India | Friction';
        window.scrollTo(0, 0);
    });

    function getData(){
        setLoader(true);
        fetch(`/api/products/type/${tname}`, {mode: 'cors'})
        .then((response) => {
            return response.json();
        }).then((data) => {
            setProducts(data);
            setLoader(false);
        });
    }

    useEffect(() =>{
        getData();
    }, []);


    if(products){

        const lastPostIndex = currPage * postPerPage;
        const firstPostIndex = lastPostIndex - postPerPage;

        const currProducts = products.slice(firstPostIndex, lastPostIndex);


        const productList = currProducts.map((shoe) => (
            <ProductCard 
                key = {shoe._id} 
                id = {shoe._id}
                image = {shoe.image}
                company = {shoe.company} 
                product = {shoe.product} 
                rating = {shoe.rating} 
                sp = {shoe.sp} 
                mrp = {shoe.mrp} 
                discount = {shoe.discount}
            />
        ));
        return(
            <div className={classes.layout}>
                <div className={classes.catalogue}>
                    {productList}
                    {loader && <img src = {preloader} alt = "Loading..."></img>}
                </div>
                <Pagination totalPost = {products.length} postPerPage = {postPerPage} setCurrPage = {setCurrPage} currPage = {currPage}/>
            </div>
        );
    }
    return(
        <div>
            <img src = {preloader} alt = "Loading..."></img>
        </div>
    );
}

export default ShoeTypes;