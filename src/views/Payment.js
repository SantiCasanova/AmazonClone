import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import CheckoutProduct from '../components/CheckoutProduct';
import '../css/Payment.css';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom'
import axios from '../axios';
import { db } from '../firebase';

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      });
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
  }, [basket])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method : {
        card: elements.getElement(CardElement)
      }
    })
      .then(({ paymentIntent }) => {
        db
          .collection('users')
          .doc(user?.uid)
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          })
          
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate('/orders')

        dispatch({
          type: 'EMPTY_BASKET'
        })
      })
  };

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };

  return ( 
  <div className='payment'>
    <div className='payment__container'>
			<h1>
				Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
			</h1>
      <div className='payment__section'>
        <div className='payment__title'>
          <h3>Delivery Adress</h3>
        </div>
        <div className='payment__address'>
          <p>{user?.email}</p>
          <p>Neuquen 233</p>
          <p>San Antonio de Padua, Buenos Aires</p>
        </div>
      </div>
      <div className='payment__section'>
        <div className='payment__title'>
          <h3>Review items and delivery</h3>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
      {user ?
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment__priceContainer'>
                <CurrencyFormat 
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items): <strong>{value}</strong>
                      </p>
                      <small className='subtotal__gift'>
                        <input type='checkbox' /> This order contains a gift
                      </small>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
        : <Link to='/login'><button className='loginButton'>Sign In</button></Link> }
    </div>
  </div>
  );
}

export default Payment;
