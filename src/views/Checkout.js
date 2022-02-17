import React from 'react';
import '../css/Checkout.css';
import CheckoutProduct from '../components/CheckoutProduct';
import { useStateValue } from '../StateProvider';
import Subtotal from '../components/Subtotal';

function Checkout() {
    const [{ basket, user }] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img
                    className='checkout__ad'
                    src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
                    alt='AD'
                />
                <div>
                    <h3>{user ? `Hello, ${user.email}` : ''}</h3>
                    <h2 className='checkout__title'>Your Shopping Basket</h2>
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

            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
    );
}

export default Checkout;
