
import React from 'react'

const MobileMenuComponent = (props) => {
    return (
        <div ref={props.menuRef} className="mobile-menu">
            <img onClick={props.handleMenu} className='mclose' src="/images/icon-close.svg" alt="" />
            <div className="mobile-tab-container">
                <h3 className="mitem">Collections</h3>
                <h3 className="mitem">Men</h3>
                <h3 className="mitem">Women</h3>
                <h3 className="mitem">About</h3>
                <h3 className="mitem">Contact</h3>
            </div>
        </div>
    )
}

export default MobileMenuComponent