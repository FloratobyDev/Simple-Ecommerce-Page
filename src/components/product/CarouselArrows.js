import React from 'react'

const CarouselArrows = (props) => {
    return (
        <div className='arrow-buttons'>
            <span onClick={(e) => {
                props.arrowChangeBigImage(e, 'dec', props.actionType, props.bigImageURL, props.spanList, props.setBigImageURL)
            }} className='left-arrow'>
                <img src="/images/icon-previous.svg" alt="" />
            </span>
            <img onClick={props.handleOverlayToggle} className='big-img' src={props.bigImageURL} alt="big-img" />
            <span onClick={(e) => {
                props.arrowChangeBigImage(e, 'inc', props.actionType, props.bigImageURL, props.spanList, props.setBigImageURL)
            }} className='right-arrow'>
                <img src="/images/icon-next.svg" alt="" />
            </span>
        </div>
    )
}

export default CarouselArrows