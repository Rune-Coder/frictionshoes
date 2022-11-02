import React, { useState, useEffect } from 'react';
import classes from './catalogue.module.css';
import ProductCard from '../card/productCard';
import axios from 'axios';
import preloader from '../image/sectionLoader.gif';
import Pagination from '../pagination/pagination';

function Catalogue(props) {

    const [products, setProducts] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const postPerPage = 20;

    const [loader, setLoader] = useState(false);


    useEffect(() => {
        async function getData() {
          setLoader(true);  
          const {data} = await axios.get('/api/products');
          setProducts(data.products);
          setLoader(false);
        }
        getData();
    }, []);

    if(products && products.length > 0){

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
                <div className={classes.features}>
                    {productList}
                    {loader && <img src = {preloader} alt = "Loading..."></img>}
                </div>
                <Pagination totalPost = {products.length} postPerPage = {postPerPage} setCurrPage = {setCurrPage} currPage = {currPage}/>
            </div>
        );
    }
    return(
        <div className={classes.layout}>
            <img src = {preloader} alt = "Loading..."></img>
        </div>
    );
    
}

export default Catalogue;