import { productActions } from '../store/productStore';

export function fetchProductData(){
    return async (dispatch) => {
        const fetchData = async() => {
            const response = await fetch('http://localhost:5000/api/products', {mode: 'no-cors'});

            if(!response.ok)
                throw new Error('could not fetch data');
            const data = await response.json();
            return data;
        };

        try{
            const productData = await fetchData();
            alert(productData.products);
            dispatch(productActions.fetchProducts(productData.products));
        }
        catch (error){
            console.log('error in fetching');
        }
    };
}