import React, { useEffect } from 'react';
import '../css/App.css';
import Header from '../components/Header';
import Home from '../views/Home';
import Checkout from '../views/Checkout';
import Payment from '../views/Payment';
import Orders from '../views/Orders';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../views/Login';
import { auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51KP5OLHMLwnthcDChkeZJEoH9F62FZ8WsENwG9eNgZu3cjVH3HmqPVMuS1aMmTurER3mNP6dsB1Csm2UHgMPqF5R00eHkTWVbG');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      if (authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/payment' element={<Elements stripe={promise}> <Payment /> </Elements>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
