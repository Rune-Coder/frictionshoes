import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import importData from "./dataImport.js";
import productRoute from "./routers/productRouter.js";
import { errorHandler, notFound } from "./middleware/error.js";
import userRoute from "./routers/userRouter.js";
import paymentRoute from "./routers/paymentRouter.js";
import path from 'path';


dotenv.config();
connectDatabase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//api
app.use("/api/import", importData);
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/payment", paymentRoute);

//error handler
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res)=> {
    res.send("API is running...");
});

const PORT = process.env.PORT || 1000;

if(process.env.NODE_ENV === 'production'){
    app.get('/',(req, res) => {
        app.use(express.static(path.resolve(__dirname, 'client', 'build')));
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, console.log("server running in port "+ PORT));
