import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import {Helmet} from "react-helmet";

import { UserData } from './connect/userData';
import { UserHistory } from './connect/userHistory';

import { GetCookie } from './hooks/cookies';
import Layout from './layout/layout';
import PreLoader from './preLoader/preLoader';

const Home = React.lazy(() => import('./pages/home'));
const Profile = React.lazy(() => import('./pages/profile/myProfile'));
const SignIn = React.lazy(() => import('./pages/signIn/signIn'));
const Otp = React.lazy(() => import('./pages/signIn/otp'));
const PasswordNew = React.lazy(() => import('./pages/passwordNew/passwordNew'));
const SignUp = React.lazy(() => import('./pages/createAcc/signUp'));
const ShoeTypes = React.lazy(() => import('./pages/shoeTypes/shoeTypes'));
const Search = React.lazy(() => import('./pages/search/search'));
const Orders = React.lazy(() => import('./pages/orders/orders'));
const OrderView = React.lazy(() => import('./pages/orderView/orderView'));
const WishList = React.lazy(() => import('./pages/wishList/wishList'));
const Cart = React.lazy(() => import('./pages/cart/cart'));
const Address = React.lazy(() => import('./pages/address/address'));
const Payment = React.lazy(() => import('./pages/payment/payment'));
const PaymentSuccess = React.lazy(() => import('./pages/paymentSuccess/paymentSuccess'));
const ProductView = React.lazy(() => import('./pages/productView/productView'));
const NotFound = React.lazy(() => import('./pages/notFound/notFound'));

function App() {
  

  //get user data
  const loginSub = UserData(GetCookie("token")); 

  //get user history
  UserHistory(GetCookie("token"));

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="E-commerce Application" />
      </Helmet>
    
    <Layout>
       

      <Suspense fallback= {<PreLoader />}>
        <Routes>
          <Route path = "/" exact element={<Navigate replace to="/home" />}/>
          <Route path = "/home" element = {<Home />} />
          {loginSub && <Route path = "/profile" element = {<Profile />} />}
          {!loginSub && <Route path = "/profile" element={<Navigate replace to="/login" />} />}

          {!loginSub && <Route path = "/login" element = {<SignIn />} />}
          {loginSub && <Route path = "/login" element={<Navigate replace to="/home" />} />}

          {!loginSub && <Route path = "/otp" element = {<Otp />} />}
          {loginSub && <Route path = "/otp" element={<Navigate replace to="/" />} />}
          <Route path = "/set-password" element = {<PasswordNew />} />

          {!loginSub && <Route path = "/register" element = {<SignUp />} />}
          {loginSub && <Route path = "/register" element={<Navigate replace to="/home" />} />}

          <Route path = "/search/:prdct" element = {<Search />} />

          <Route path = "/types/:tname" element = {<ShoeTypes />} />

          {loginSub && <Route path = "/orders" element = {<Orders />} />}
          {!loginSub && <Route path = "/orders" element={<Navigate replace to="/login" />} />}

          {loginSub && <Route path = "/orders/:oid" element = {<OrderView />} />}
          {!loginSub && <Route path = "/orders/:oid" element={<Navigate replace to="/login" />} />}


          <Route path = "/shoes/:prdct/:pid/*" element = {<ProductView />} />

          {loginSub && <Route path = "/wishlist" element = {<WishList />} />}
          {!loginSub && <Route path = "/wishlist" element={<Navigate replace to="/login" />} />}

          <Route path = "/cart" element = {<Cart />} />

          {loginSub && <Route path = "/address" element = {<Address />} />}
          {!loginSub && <Route path = "/address" element={<Navigate replace to="/login" />} />}

          {loginSub && <Route path = "/payment" element = {<Payment />} />}
          {!loginSub && <Route path = "/payment" element={<Navigate replace to="/login" />} />}

          {loginSub && <Route path = "/payment-status" element = {<PaymentSuccess />} />}

          <Route path = "*" element = {<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
    </>
  );
}

export default App;
