import React from 'react'

const CarouselItems = (props) => {
    return (
        <div className="small-img-container">
            <span onClick={e => {
                props.onClicked(e, 'THUMBNAIL', props.changeBigImageFunction)
            }}>
                <img ref={props.imagePath} src="/images/image-product-1-thumbnail.jpg" alt="small-img" className="small-image" />
            </span>
            <span onClick={e => {
                props.onClicked(e, 'THUMBNAIL', props.changeBigImageFunction)
            }}>
                <img src="/images/image-product-2-thumbnail.jpg" alt="small-img" className="small-image" />
            </span>
            <span onClick={e => {
                props.onClicked(e, 'THUMBNAIL', props.changeBigImageFunction)
            }}>
                <img src="/images/image-product-3-thumbnail.jpg" alt="small-img" className="small-image" />
            </span>
            <span onClick={e => {
                props.onClicked(e, 'THUMBNAIL', props.changeBigImageFunction)
            }}>
                <img src="/images/image-product-4-thumbnail.jpg" alt="small-img" className="small-image" />
            </span>
        </div>
    )
}

export default CarouselItems