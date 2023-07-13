import { createContext, useContext, useState,useEffect} from "react";


const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [ cart, setCart ] = useState([]);

    useEffect(()=>{
        let existCartItems=localStorage.getItem('cart')
        if(existCartItems)setCart(JSON.parse(existCartItems))
    },[])

    return (
        <CartContext.Provider value={[
           cart,
           setCart
        ]}>
            {children}
        </CartContext.Provider>
    )
}
const useCart=()=>useContext(CartContext)

export {useCart,CartProvider};

// import { createContext, useState} from "react";


// export const CartContext = createContext(null);

// const CartProvider = ({ children }) => {
//     const [ cart, setCart ] = useState([]);

//     return (
//         <CartContext.Provider value={{ 
//            cart,
//            setCart
//         }}>
//             {children}
//         </CartContext.Provider>
//     )
// }

// export default CartProvider;