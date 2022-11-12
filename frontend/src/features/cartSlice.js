import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id) //check that item already exist
            if (itemIndex >= 0)// increase quantity of same product
            {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`Increased ${state.cartItems[itemIndex].name} product quantity`, {
                    position: 'top-left'
                })
            }
            else //add new product in cart
            {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} Product added in cart`, {
                    position: 'top-left'
                })
            }

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },

        removeFromCart(state,action){
            // return those item that are not include in our action.payload.id(returns only item which are in our cart)
            const nextCartItems= state.cartItems.filter(
                cartItem=>cartItem.id !== action.payload.id
            )
            state.cartItems= nextCartItems
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            toast.error(`${action.payload.name} Product Removed from cart`, {
                position: 'top-left'
            })
        },

        decreaseCart(state,action){
            const itemIndex= state.cartItems.findIndex(
                cartItem=>cartItem.id=== action.payload.id
            )

            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1

                toast.info(`Decreased ${action.payload.name} cart quantity`, {
                    position: 'top-left'
                })
            }
            else if(state.cartItems[itemIndex].cartQuantity === 1){
                const nextCartItems= state.cartItems.filter(
                    cartItem=>cartItem.id !== action.payload.id
                )
                state.cartItems= nextCartItems
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
                toast.error(`${action.payload.name} Product Removed from cart`, {
                    position: 'top-left'
                })
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        clearCart(state,action){
            state.cartItems = []
            toast.error("Cart Cleared", {
                position: 'top-left'
            })
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },
        getTotals(state,action){
           let {total,quatity}= state.cartItems.reduce((cartTotal,cartItem)=>{
                const{price,cartQuantity}=cartItem;
                const itemTotal=price * cartQuantity

                cartTotal.total += itemTotal    
                cartTotal.quatity +=cartQuantity

                return cartTotal;
            },{
                total:0,
                quatity:0
            })

            state.cartTotalQuantity = quatity;
            state.cartTotalAmount = total
        }
    }
})

export const { addToCart,removeFromCart,decreaseCart,clearCart,getTotals } = cartSlice.actions

export default cartSlice.reducer