import React, { Fragment, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from "../../components/cart-icon/cart-icon.componen";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import {CartContex} from "../../contexts/cart.contex";
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const {isOpen,setIsOpen} = useContext(CartContex);
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
                        ) :(
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )}
                    <CartIcon/>
                </div>
                { isOpen && <CartDropdown/>}
            </div>
            <Outlet />
        </Fragment >
    )
}
export default Navigation