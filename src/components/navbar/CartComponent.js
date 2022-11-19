import React from 'react'
import ItemCheckout from './ItemCheckout'


const CartComponent = (props) => {
    return (
        <div ref={props.cartContainerRef} className="cart-container">
            <div className="cart-and-price">
                <h4>Cart</h4>
                <h4>${props.totalPrice}</h4>
            </div>

            <div className="cart-item-container">
                <ItemCheckout />
            </div>
        </div>
    )
}

export default CartComponent