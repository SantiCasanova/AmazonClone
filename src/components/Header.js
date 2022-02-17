import React from 'react';
import '../css/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';


function Header() {
	const [{ basket, user }] = useStateValue();
	const handleAuth = () => {
		if (user) {
			auth.signOut();
		}
	}

	return (
		<div className='header'>
			<Link to='/' className='header__link'>
				<img 
					className='header__logo' 
					src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
					alt='LOGO'
				/>
			</Link>
			<div className='header__search'>
				<input className='header__searchInput' type='text' />
				<SearchIcon className='header__searchIcon' />
			</div>

			<div className='header__nav'>
				<Link to={!user && '/login'} className='header__link'>
					<div onClick={handleAuth} className='header__option'>
						<span className='header__optionLineOne'>{user ? `Welcome` : 'Hello Guest'}</span>
						<span className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
					</div>
				</Link>
				<Link to='/orders'>
					<div className='header__option'>
						<span className='header__optionLineOne'>Returns</span>
						<span className='header__optionLineTwo'>Orders</span>
					</div>
				</Link>
				<div className='header__option'>
					<span className='header__optionLineOne'>Your</span>
					<span className='header__optionLineTwo'>Prime</span>
				</div>
        		<Link to='/checkout' className='header__link'>
          			<div className='header__optionBasket'>
            			<ShoppingBasketIcon />
            			<span className='header__optionLineTwo header__basketCount'>{ basket.length }</span>
          			</div>
        		</Link>
			</div>
    	</div>
  	)
}

export default Header;
