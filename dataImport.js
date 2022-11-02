import express from 'express';
import User from './models/userModel.js';
import users from './frictionData/users.js';
import Product from './models/productModel.js';
import products from './frictionData/products.js';
import asyncHandler from 'express-async-handler';

const importData = express.Router();

importData.post("/user", 
    asyncHandler(async (req, res)=>{
        await User.deleteMany({});
        const importUser = await User.insertMany(users);
        res.send({importUser});
    })
);

importData.post("/products", 
    asyncHandler(async (req, res)=>{
        await Product.deleteMany({});
        const importProduct = await Product.insertMany(products);
        res.send({importProduct});
    })
);

export default importData;