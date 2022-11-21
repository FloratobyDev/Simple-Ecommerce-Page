import React, { useContext, useEffect, useRef, useState } from 'react'
import { GroceryContext } from '../../App/App'
import CarouselItems from './CarouselItems';
import CarouselArrows from './CarouselArrows';
import ProductInformation from './ProductInformation';
import ProductQuantityComponent from './ProductQuantityComponent';
import './productStyle.scss'

const Product = () => {

    const MIN = 1, MAX = 4;

    //Reference hook for storing a thumbnail pointer to be use for scrolling through the thumbnail images and presenting it on to
    //the big image. 
    const clickedSmallImageRef = useRef(undefined)

    //Stores object data for a product. Data is use to render merchandise that was added into the cart in the cart container. 
    const { setGroceryList: setgList, groceryList: glist } = useContext(GroceryContext)

    //These couple of hooks are use for storing the url path for the product image. First one is for the main page and the second one  is for the toolkit.
    const [bigImageURL, setBigImageURL] = useState('/images/image-product-1.jpg')
    const [bigImageURLToolkit, setBigImageURLToolkit] = useState('/images/image-product-1.jpg')

    //Re-renders the component whenever the user increments/decrements the qty of items to buy. 
    const [qty, setQty] = useState(1)

    //Stores the information about the product, if added to the cart.  
    const productPriceRef = useRef(undefined)
    const productTitle = useRef(undefined)
    const imagePath = useRef(undefined)


    //Reference for overlay and a switch to show/hide.
    const toolkitOverlayRef = useRef(undefined)
    const toolkitOverlay = useRef(false)

    //A list that contains the data required for scrolling the images. It's kind of hacky and there's probably a better way to do it.
    const mainThumbnailList = useRef(undefined)
    const toolkitThumbnailList = useRef(undefined)

    //Sets the value of a number within a range.

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
            onClicked(loopList.current[parseNum - 1], 'ARROW', (e) => { })
        }
        else if (type === 'inc') {

            let parseNum = parseInt(matchedNumber[0]) + 1;

            if (parseNum > MAX) {
                parseNum = MIN;
            }

            url = url.replace(/\d/, parseNum)
            changeImage(url)
            onClicked(loopList.current[parseNum - 1], 'ARROW', (e) => { })
        }
    }

    const handleOverlayToggle = e => {
        if (toolkitOverlay.current !== undefined) {
            toolkitOverlay.current = !toolkitOverlay.current;
            toolkitOverlayRef.current.style.display = toolkitOverlay.current ? 'flex' : 'none';
        }
    }

    const onClicked = (event, actionType, changeImageCallback) => {

        clickedSmallImageRef.current.style.boxShadow = 'none';
        clickedSmallImageRef.current.style.backgroundColor = 'none';
        clickedSmallImageRef.current.children[0].style.opacity = '100%';

        if (actionType === 'ARROW') {
            clickedSmallImageRef.current = event;
        }
        else if (actionType === 'THUMBNAIL') {
            clickedSmallImageRef.current = event.currentTarget;

        }

        clickedSmallImageRef.current.style.boxShadow = '0 0 0px 2px hsl(26, 100%, 55%)';
        clickedSmallImageRef.current.style.backgroundColor = 'rgba(255, 255, 255, 0.38)';
        clickedSmallImageRef.current.children[0].style.opacity = '70%';
        changeImageCallback(event)
    }

    const handleSubmit = () => {
        setgList([...glist, {
            id: glist.length + 1,
            imagePath: imagePath.current.getAttribute('src'),
            productTitle: productTitle.current.textContent,
            productPrice: Number(productPriceRef.current.textContent),
            productQty: qty
        }])
    }

    return (
        <>
            <main className='product'>
                <div className="left">
                    <CarouselArrows handleOverlayToggle={handleOverlayToggle} actionType='MAIN' arrowChangeBigImage={arrowChangeBigImage} bigImageURL={bigImageURL} spanList={mainThumbnailList} setBigImageURL={setBigImageURL} />
                    <CarouselItems onClicked={onClicked} changeBigImageFunction={changeBigImage} imagePath={imagePath} />
                </div>

                <div className="right">

                    <ProductInformation
                        productTitle={productTitle}
                        productPriceRef={productPriceRef}
                        productName="Fall Limited Edition Sneakers"
                        productDescription="These low-profile sneakers are you perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer."
                        productPrice="125.00"
                        productOrigPrice="125.00"
                        productDiscount="-50%"
                    />
                    <div className="qty-and-cart-button">
                        <ProductQuantityComponent qty={qty} setQty={setQty} />
                        <button type="button" onClick={handleSubmit} className="cart-button" value="Add to cart">
                            <img src="/images/icon-cart.svg" alt="icon-cart" />
                            Add to cart
                        </button>
                    </div>
                </div>
            </main>

            <div ref={toolkitOverlayRef} className="image-toolkit">
                <div className="left">
                    <img onClick={handleOverlayToggle} className='close' src="/images/icon-close.svg" alt="" />
                    <CarouselArrows actionType='OVERLAY' arrowChangeBigImage={arrowChangeBigImage} bigImageURL={bigImageURLToolkit} spanList={toolkitThumbnailList} setBigImageURL={setBigImageURLToolkit} />
                    <CarouselItems onClicked={onClicked} changeBigImageFunction={changeBigImageToolkit} imagePath={imagePath} />
                </div>
            </div>
        </>
    )
}

export default Product