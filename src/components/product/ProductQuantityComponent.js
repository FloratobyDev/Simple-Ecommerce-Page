import React from 'react'

const ProductQuantityComponent = (props) => {

    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    return (
        <div className="qty">
            <button onClick={() => { props.setQty(clamp(props.qty - 1, 0, 9999)) }} className="decrement"><img src="/images/icon-minus.svg" alt="" /></button>
            <p className='qty-count'>{props.qty}</p>
            <button onClick={() => { props.setQty(clamp(props.qty + 1, 0, 9999)) }} className="increment"><img src="/images/icon-plus.svg" alt="" /></button>
        </div>
    )
}

export default ProductQuantityComponent