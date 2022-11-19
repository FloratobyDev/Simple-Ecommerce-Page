import React from 'react'

const ProductInformation = (props) => {
    return (
        <div className="prod-info-container">
            <p className="brand-name">SNEAKER COMPANY</p>
            <p ref={props.productTitle} className="prod-name">{props.productName}</p>
            <p className="prod-desc">{props.productDescription}</p>
            <div className="price-discount">
                <div className='discount-container'>
                    <p ref={props.productPriceRef} className="prod-price">{props.productPrice}</p>
                    <span className='discount'>{props.productDiscount}</span>
                </div>
                <p className="prod-orig-price">{props.productOrigPrice}</p>
            </div>
        </div>
    )
}

export default ProductInformation