import React from 'react';
import '../css/Home.css';
import Product from '../components/Product';

function Home() {
    return (
        <div className='home'>
            <div className='home__container'>
                <img 
                    className='home__image'
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                    alt="bannerOne" 
                />

                <div className='home__row'>
                    <Product
                        id={0}
                        title='The lean startup'
                        price={ 19.99 }
                        image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                        rating={ 4 }
                    />

                    <Product
                        id={1}
                        title='iPhone 13 Pro Max'
                        price={ 1099.99 }
                        image='https://m.media-amazon.com/images/I/61l3+VGfj2L._AC_SL1500_.jpg'
                        rating={ 5 }
                    />
                    <Product
                        id={1}
                        title='iPhone 13 Pro Max'
                        price={ 1099.99 }
                        image='https://m.media-amazon.com/images/I/61l3+VGfj2L._AC_SL1500_.jpg'
                        rating={ 5 }
                    />
                </div>
                <div className='home__row'>
                    <Product
                        id={2}
                        title='SAMSUNG'
                        price={ 199.99 }
                        image='https://m.media-amazon.com/images/I/61O45C5qASL._AC_SL1000_.jpg'
                        rating={ 1 }
                    />
                    <Product
                        id={3}
                        title='HyperX QuadCast S'
                        price={ 349.99 }
                        image='https://m.media-amazon.com/images/I/61jLNwAULdL._AC_SX679_.jpg'
                        rating={ 5 }
                    />
                </div>
                <div className='home__row'>
                    <Product
                        id={4}
                        title='SAMSUNG Odyssey G9'
                        price={ 1499.99 }
                        image='https://m.media-amazon.com/images/I/61SQz8S+fEL._AC_SX679_.jpg'
                        rating={ 5 }
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;
