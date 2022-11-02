import express from 'express';
import crypto from "crypto";
import {instance} from '../util/paymentInstance.js';

const paymentRoute = express.Router();

paymentRoute.post("/checkout",
    async (req, res)=>{
        const {amount} = req.body;
        const options = {
            amount: amount*100,
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const order = await instance.orders.create(options);
        res.status(201).json(order);
    }
);

//verification
paymentRoute.post("/verification",
    async (req, res)=>{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        let body= razorpay_order_id + "|" + razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', 'rDcoHQp49ng3eLVtziVEgOT7')
                                        .update(body.toString())
                                        .digest('hex');
        
        if(razorpay_signature === expectedSignature){
            res.redirect(`http://localhost:3000/payment-status`);
        }
        else
            res.redirect(`http://localhost:3000/home`);
    }
);

//key
paymentRoute.get("/key",
    async (req, res)=>{
        res.status(201).json({ key: "rzp_test_5unrIoTw0WhrB6" });
    }
);

export default paymentRoute;