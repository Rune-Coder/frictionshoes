import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateToken from '../util/generateToken.js';
import protect from '../middleware/auth.js';
import UserHistory from '../models/userHistoryModel.js';
import fetch from "node-fetch";
import  uuid  from 'uuid4';
import nodemailer from 'nodemailer';
import {username, pass} from '../frictionData/cred.js';
import otpGenerator from 'otp-generator';

const userRoute = express.Router();

// signup
userRoute.post("/register", 
    asyncHandler(async (req, res)=>{
        const {name, mobile, email, password, gender} = req.body;
        if(!name || !email || !mobile || !password || !gender)
            return res.status(422).json({ error: 'Pls fill field' });
        try{
            const userExist = await User.findOne({ email: email });

            if(userExist)
                return res.status(422).json({ error: "Email already registered"});
            else{
                const user = new User({ name, mobile, email, password: bcrypt.hashSync(password, 10), gender });
                await user.save();
                res.status(201).json({ message: "User registration succcessful " });
            }
        }
        catch(error){
            console.log(error);
        }
    })
);

// login
userRoute.post("/login", 
    asyncHandler(async (req, res)=>{
        const { email, password } = req.body;
        if(!email || !password)
            return res.status(422).json({ error: 'Pls fill field' });
        try{
            const userExist = await User.findOne({ email: email });
            if(userExist && (await userExist.matchPassword(password))){
                return res.status(201).json({ 
                    _id: userExist._id,
                    name: userExist.name,
                    mobile: userExist.mobile,
                    email: userExist.email,
                    gender: userExist.gender,
                    isAdmin: userExist.isAdmin,
                    token: generateToken(userExist._id),
                });
            }
            else{
                res.status(422).json({ message: "Invalid email or password" });
            }
        }
        catch(error){
            console.log(error);
        }
    })
);

// update profile
userRoute.post("/update-profile",
    asyncHandler(async (req, res)=>{

        const { email, name, gender } = req.body;
        const user = await User.findOne({ email: email });

        if(user){
            await User.updateOne(
                { email },
                {
                    $set: { name, gender }
                }
            );

            res.status(202).json({ message: "User profile updated" });
        }
        else{
            res.status(402).json({ error: "User Invalid" });
        }
    })
);

// update password
userRoute.post("/update-password",
    asyncHandler(async (req, res)=>{

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if(user){
            await User.updateOne(
                { email },
                {
                    $set: { password: bcrypt.hashSync(password, 10) }
                }
            );

            res.status(202).json({ message: "User profile updated" });
        }
        else{
            res.status(402).json({ error: "User Invalid" });
        }
    })
);

// profile
userRoute.get("/profile", protect,
    asyncHandler(async (req, res)=>{
        const user = await User.findById(req.user._id);

        if(user){
            return res.status(201).json({ 
                _id: user._id,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                gender: user.gender,
                isAdmin: user.isAdmin,
            });
        }
        else
            res.status(404).json({ message: "User not found" });
    })
);

// post user history
userRoute.post("/history-create",
    asyncHandler(async (req, res)=>{

        const { email, cart, bill, wish, address, orders } = req.body;
        const user = await UserHistory.findOne({ email: email });

        if(orders && orders.length > 0){
            const currOrder = orders.pop();
            currOrder.order_id = uuid();

            var date = new Date();
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0');
            var yyyy = date.getFullYear();

            date = dd + '/' + mm + '/' + yyyy;
            currOrder.date = date;

            orders.push(currOrder);
        }

        if(user){
            await UserHistory.updateOne(
                { email },
                {
                    $set: { cart, bill, wish, address, orders }
                }
            );

            res.status(202).json({ message: "User history updated" });
        }
        else{
            const newUserHistory = new UserHistory({ email, cart, bill, wish, address, orders });
            await newUserHistory.save();
            res.status(201).json({ message: "User history created" });
        }
    })
);

// get user history
userRoute.post("/history-get",
    asyncHandler(async (req, res)=>{

        const { email } = req.body;
        const user = await UserHistory.findOne({ email: email });

        if(user){
            return res.status(202).json({ 
                email: user.email,
                cart: user.cart,
                bill: user.bill,
                wish: user.wish,
                address: user.address,
                orders: user.orders
            });
        }
        else{
            res.status(422).json({ message: "No such user exist" });
        }
    })
);

//pin code
userRoute.get("/getPinData/:pin", async (req, res) => {
    const fetchOptions = {
        method: 'GET'
    }
    const pin = req.params.pin;
    const response = await fetch('http://www.postalpincode.in/api/pincode/'+pin, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

//send otp to email and api
userRoute.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const subject = "OTP";
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    const msg = "Your OTP for your Friction account is "+ otp + " and is valid for 30 mins. Please DO NOT share this OTP with anyone to keep your account safe. Thanks, with regards, Friction.";

    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: username,
            pass: pass
        }
    });

    mail.sendMail({
        from: 'creationamyah@gmail.com',
        to: [email],
        subject: subject,
        html: msg
    }, (err) => {
        if(err) throw err;
        res.send(otp);
    });
});


export default userRoute;

