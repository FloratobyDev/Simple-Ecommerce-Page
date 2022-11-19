import React, { useContext, useEffect, useRef, useState } from 'react'
import './navbarStyle.scss'
import { GroceryContext } from '../../App/App'
import CartComponent from './CartComponent'
import MobileMenuComponent from './MobileMenuComponent'


const Navbar = () => {

    //Stores object data for a product. Data is use to render merchandise that
    // was added into the cart in the cart container. 
    const { groceryList } = useContext(GroceryContext)

    //Total price about to pay, excluding tax.
    const [totalPrice, setPrice] = useState(0)

    //Contains reference of the cart. Use for showing/hiding.
    const cartContainerRef = useRef('')

    //Both reference are use to handle menu's show/hide action.
    const menuRef = useRef(undefined)
    const menuHandleRef = useRef(false)

    useEffect(() => {

        if (groceryList.length > 0) {
            let totalPrice = 0;
            groceryList.forEach(item => {
                totalPrice += (item.productPrice * item.productQty)
            })
            setPrice(totalPrice)
        }

    }, [groceryList])


    const handleCart = e => {
        const displayStatus = cartContainerRef.current.style.display;
        if (displayStatus === 'none' || displayStatus === '') {
            cartContainerRef.current.style.display = 'flex'
        }
        else {
            cartContainerRef.current.style.display = 'none'
        }
    }

    const handleMenu = () => {
        menuHandleRef.current = !menuHandleRef.current;

        if (menuHandleRef.current) {
            menuRef.current.style.left = '0px'
        }
        else {
            menuRef.current.style.left = '-250px'
        }
    }

    return (
        <nav className='navbar'>
            <div className="nav-container">
                <div className="left-container">
                    <img onClick={handleMenu} className='menu' src="/images/icon-menu.svg" alt="" />
                    <h1 className="brand-name">
                        sneakers
                    </h1>
                    <div className="tab-container">
                        <h3 className="item">Collections</h3>
                        <h3 className="item">Men</h3>
                        <h3 className="item">Women</h3>
                        <h3 className="item">About</h3>
                        <h3 className="item">Contact</h3>
                    </div>
                </div>
                <div className="right-container">
                    <div className="cart">
                        <span>
                            <p>{groceryList.length}</p>
                        </span>
                        <img className='cart-img' onClick={handleCart} src="/images/icon-cart.svg" alt="cart" />
                    </div>
                    <img className='avatar-img' src="/images/image-avatar.png" alt="pfp" />
                </div>
                <CartComponent cartContainerRef={cartContainerRef} totalPrice={totalPrice} />
                <MobileMenuComponent menuRef={menuRef} handleMenu={handleMenu} />
            </div>
        </nav>
    )
}

export default Navbar