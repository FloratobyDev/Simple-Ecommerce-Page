import React, { useContext } from 'react'
import { GroceryContext } from '../../App/App';

const ItemCheckout = () => {

    const { groceryList } = useContext(GroceryContext)

    return (
        <div className="item-and-checkout-container">
            {groceryList.length <= 0 ? <EmptyCart /> : <ItemContainer itemList={groceryList} />}
        </div>
    )
}

function EmptyCart() {
    return (
        <div className="empty-cart">
            <p>Your cart is empty.</p>
        </div>
    )
}

/**
 *        imagePath: imagePath.current.getAttribute('src'),
            productTitle: productTitle.current.textContent,
            productPrice: Number(productPriceRef.current.textContent),
            productQty: qty
 */
function ItemContainer(props) {
    //TODO: Total is constant here.
    return (<div>
        <div className="item-container">
            {props.itemList.map(item => {
                return <Item key={item.id} id={item.id} path={item.imagePath} productName={item.productTitle} productPrice={item.productPrice} qty={item.productQty} />
            })}
        </div>
        <button className="checkout">Checkout</button>
    </div>)
}

function Item(props) {

    const { groceryList, setGroceryList } = useContext(GroceryContext)

    const handleRemoveItem = () => {
        setGroceryList(groceryList.filter(item => item.id !== props.id))
    }

    return (<div className="cart-item">
        <div className="img-and-description">
            <img className='cart-item-image' src={props.path} alt="cart-itm" />
            <span className="cart-item-description">
                <p>{props.productName}</p>
                <p>${props.productPrice} x {props.qty} <span>${props.qty * props.productPrice}</span></p>
            </span>
        </div>
        <img onClick={handleRemoveItem} className='trash' src="/images/icon-delete.svg" alt="" />
    </div>)
}

export default ItemCheckout