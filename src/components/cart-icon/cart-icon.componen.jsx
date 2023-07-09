import React, {useContext} from "react";
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import {CartContex} from "../../contexts/cart.contex";

const CartIcon = () => {
    const {isOpen,setIsOpen,cartCount} = useContext(CartContex);
    const toggleIsCartOpen = ()=> setIsOpen(!isOpen);
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
}

export default CartIcon;