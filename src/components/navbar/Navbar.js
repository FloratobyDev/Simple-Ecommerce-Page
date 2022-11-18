import React, { useContext, useEffect, useRef, useState } from 'react'
import './navbarStyle.scss'
import ItemCheckout from './ItemCheckout'
import { GroceryContext } from '../../App/App'


const Navbar = () => {

    const cartContainerRef = useRef('')
    const { groceryList } = useContext(GroceryContext)
    const [totalPrice, setPrice] = useState(0)
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
        const displayStatus = menuRef.current.style.display;
        menuHandleRef.current = !menuHandleRef.current;

        if (menuHandleRef.current) {
            // menuRef.current.style.padding = '30px 120px 0 30px';
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
                <div ref={cartContainerRef} className="cart-container">
                    <div className="cart-and-price">
                        <h4>Cart</h4>
                        <h4>${totalPrice}</h4>
                    </div>

                    <div className="cart-item-container">
                        <ItemCheckout />
                    </div>
                </div>
                <div ref={menuRef} className="mobile-menu">
                    <img onClick={handleMenu} className='mclose' src="/images/icon-close.svg" alt="" />
                    <div className="mobile-tab-container">
                        <h3 className="mitem">Collections</h3>
                        <h3 className="mitem">Men</h3>
                        <h3 className="mitem">Women</h3>
                        <h3 className="mitem">About</h3>
                        <h3 className="mitem">Contact</h3>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar