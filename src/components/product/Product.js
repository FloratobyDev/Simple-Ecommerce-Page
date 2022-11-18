import React, { useContext, useEffect, useRef, useState } from 'react'
import { GroceryContext } from '../../App/App'
import './productStyle.scss'

const Product = () => {

    const MIN = 1;
    const MAX = 4;
    const [bigImageURL, setBigImageURL] = useState('/images/image-product-1.jpg')
    const [bigImageURLToolkit, setBigImageURLToolkit] = useState('/images/image-product-1.jpg')

    const clickedSmallImageRef = useRef(undefined)
    const [qty, setQty] = useState(1)
    const productPriceRef = useRef(undefined)
    const productTitle = useRef(undefined)
    const imagePath = useRef(undefined)
    const toolkitOverlay = useRef(false)
    const toolkitOverlayRef = useRef(undefined)
    const { groceryList, setGroceryList } = useContext(GroceryContext)
    const toolkitThumbnailList = useRef(undefined)
    const mainThumbnailList = useRef(undefined)

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    useEffect(() => {
        clickedSmallImageRef.current = document.querySelector('.small-img-container span')

        if (clickedSmallImageRef.current) {
            clickedSmallImageRef.current.style.boxShadow = '0 0 0px 2px hsl(26, 100%, 55%)'
            clickedSmallImageRef.current.children[0].style.opacity = '40%'
        }

        toolkitThumbnailList.current = Array.from(document.querySelectorAll('.image-toolkit .small-img-container span'))
        mainThumbnailList.current = Array.from(document.querySelectorAll('.product .small-img-container span'))
    }, [])

    const changeBigImage = e => {

        let index = e.currentTarget.children[0].getAttribute('src').indexOf('-thumbnail');
        setBigImageURL(e.currentTarget.children[0].getAttribute('src').substring(0, index) + '.jpg')
    }
    const changeBigImageToolkit = e => {
        let index = e.currentTarget.children[0].getAttribute('src').indexOf('-thumbnail');
        setBigImageURLToolkit(e.currentTarget.children[0].getAttribute('src').substring(0, index) + '.jpg')
    }

    const arrowChangeBigImage = (e, type, actionType, currentURL, loopList, changeImage) => {
        if (actionType === 'MAIN') {
            getNextImage(type, currentURL, loopList, changeImage)
        }
        else {
            getNextImage(type, currentURL, loopList, changeImage)
        }
    }

    function getNextImage(type, currentURL, loopList, changeImage) {
        let url = currentURL;
        const matchedNumber = url.match(/\d/)

        if (type === 'dec') {

            let parseNum = parseInt(matchedNumber[0]) - 1;

            if (parseNum < MIN) {
                parseNum = MAX;
            }

            url = url.replace(/\d/, parseNum)
            changeImage(url)
            onClickedArrow(loopList.current[parseNum - 1])
        }
        else if (type === 'inc') {

            let parseNum = parseInt(matchedNumber[0]) + 1;

            if (parseNum > MAX) {
                parseNum = MIN;
            }

            url = url.replace(/\d/, parseNum)
            changeImage(url)
            onClickedArrow(loopList.current[parseNum - 1])
        }
    }



    const handleOverlayToggle = e => {
        if (toolkitOverlay.current !== undefined) {
            toolkitOverlay.current = !toolkitOverlay.current;
            toolkitOverlayRef.current.style.display = toolkitOverlay.current ? 'flex' : 'none';
        }
    }

    const onClicked = event => {
        clickedSmallImageRef.current.style.boxShadow = 'none';
        clickedSmallImageRef.current.style.backgroundColor = 'none';
        clickedSmallImageRef.current.children[0].style.opacity = '100%';
        clickedSmallImageRef.current = event.currentTarget;
        clickedSmallImageRef.current.style.boxShadow = '0 0 0px 2px hsl(26, 100%, 55%)';
        clickedSmallImageRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.38)';
        clickedSmallImageRef.current.children[0].style.opacity = '70%';
    }

    const onClickedArrow = event => {
        clickedSmallImageRef.current.style.boxShadow = 'none';
        clickedSmallImageRef.current.style.backgroundColor = 'none';
        clickedSmallImageRef.current.children[0].style.opacity = '100%';
        clickedSmallImageRef.current = event;
        clickedSmallImageRef.current.style.boxShadow = '0 0 0px 2px hsl(26, 100%, 55%)';
        clickedSmallImageRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.38)';
        clickedSmallImageRef.current.children[0].style.opacity = '70%';
    }

    const handleSubmit = () => {
        setGroceryList([...groceryList, {
            id: groceryList.length + 1,
            imagePath: imagePath.current.getAttribute('src'),
            productTitle: productTitle.current.textContent,
            productPrice: Number(productPriceRef.current.textContent),
            productQty: qty
        }])
    }

    return (
        <>
            <div className='product'>
                <div className="left">
                    <div className='arrow-buttons'>
                        <span onClick={(e) => {
                            arrowChangeBigImage(e, 'dec', 'MAIN', bigImageURL, mainThumbnailList, setBigImageURL)
                        }} className='left-arrow'>
                            <img src="/images/icon-previous.svg" alt="" />
                        </span>
                        <img onClick={handleOverlayToggle} className='big-img' src={bigImageURL} alt="big-img" />
                        <span onClick={(e) => {
                            arrowChangeBigImage(e, 'inc', 'MAIN', bigImageURL, mainThumbnailList, setBigImageURL)
                        }} className='right-arrow'>
                            <img src="/images/icon-next.svg" alt="" />
                        </span>
                    </div>
                    <div className="small-img-container">
                        <span onClick={(e) => {
                            onClicked(e)
                            changeBigImage(e)
                        }}>
                            <img ref={imagePath} src="/images/image-product-1-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={(e) => {
                            onClicked(e)
                            changeBigImage(e)
                        }}>
                            <img src="/images/image-product-2-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={(e) => {
                            onClicked(e)
                            changeBigImage(e)
                        }}>
                            <img src="/images/image-product-3-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={(e) => {
                            onClicked(e)
                            changeBigImage(e)
                        }}>
                            <img src="/images/image-product-4-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                    </div>
                </div>

                <div className="right">
                    <div className="prod-info-container">
                        <p className="brand-name">SNEAKER COMPANY</p>
                        <p ref={productTitle} className="prod-name">Fall Limited Edition Sneakers</p>
                        <p className="prod-desc">These low-profile sneakers are you perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.</p>
                        <div className="price-discount">
                            <div className='discount-container'>
                                <p ref={productPriceRef} className="prod-price">125.00</p>
                                <span className='discount'>-50%</span>
                            </div>
                            <p className="prod-orig-price">125.00</p>
                        </div>
                    </div>
                    <div className="qty-and-cart-button">

                        <div className="qty">
                            <button onClick={() => { setQty(clamp(qty - 1, 0, 9999)) }} className="decrement"><img src="/images/icon-minus.svg" alt="" /></button>
                            <p className='qty-count'>{qty}</p>
                            <button onClick={() => { setQty(clamp(qty + 1, 0, 9999)) }} className="increment"><img src="/images/icon-plus.svg" alt="" /></button>
                        </div>

                        <button onClick={handleSubmit} className="cart-button">
                            <img src="/images/icon-cart.svg" alt="icon-cart" />
                            <p>Add to cart</p>
                        </button>
                    </div>
                </div>
            </div>

            <div ref={toolkitOverlayRef} className="image-toolkit">
                <div className="left">
                    <img onClick={handleOverlayToggle} className='close' src="/images/icon-close.svg" alt="" />
                    <div className='arrow-buttons'>
                        <span onClick={(e) => {
                            arrowChangeBigImage(e, 'dec', 'OVERLAY', bigImageURLToolkit, toolkitThumbnailList, setBigImageURLToolkit)
                        }} className='left-arrow'>
                            <img src="/images/icon-previous.svg" alt="" />
                        </span>
                        <img className='big-img' src={bigImageURLToolkit} alt="big-img" />
                        <span onClick={(e) => {
                            arrowChangeBigImage(e, 'inc', 'OVERLAY', bigImageURLToolkit, toolkitThumbnailList, setBigImageURLToolkit)
                        }} className='right-arrow'>
                            <img src="/images/icon-next.svg" alt="" />
                        </span>
                    </div>
                    <div className="small-img-container">
                        <span onClick={e => {
                            onClicked(e)
                            changeBigImageToolkit(e)
                        }}>
                            <img ref={imagePath} src="/images/image-product-1-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={e => {
                            onClicked(e)
                            changeBigImageToolkit(e)
                        }}>
                            <img src="/images/image-product-2-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={e => {
                            onClicked(e)
                            changeBigImageToolkit(e)
                        }}>
                            <img src="/images/image-product-3-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                        <span onClick={e => {
                            onClicked(e)
                            changeBigImageToolkit(e)
                        }}>
                            <img src="/images/image-product-4-thumbnail.jpg" alt="small-img" className="small-image" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product