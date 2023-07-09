import {createContext, useEffect, useState} from "react";


const addCartItem = (cartItems,productToAdd)=>{
    console.log("cartItems",cartItems);
    console.log("productToAdd",productToAdd);
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);
    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id===productToAdd.id ? {...cartItem,quantity:cartItem.quantity+1}:cartItem
        );
    }
    return [...cartItems,{...productToAdd,quantity:1}]
}
export  const CartContex = createContext({
    isOpen : false,
    setIsOpen : ()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    cartCount:0
});

export const CartProvider  = ({children})=>{
    const [isOpen,setIsOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,cartItem)=> total+cartItem.quantity,0)
        setCartCount((newCartCount));
    },[cartItems]);
    const addItemToCart = (productToAdd)=>{
        console.log("Cart-Component productToAdd",productToAdd);
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const value = {isOpen,setIsOpen,cartItems,addItemToCart,cartCount};
    return(
        <CartContex.Provider value={value}>{children}</CartContex.Provider>
    );
}