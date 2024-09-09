import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <>
        <div className="main-container">
            <div className="container">

                <div className="left">
                    <img src='logo.svg' />
                </div>

                <div className="right">
                    <img src='aadhar.svg' />
                </div>
            </div>
        </div>
        <div className="border"></div>
        </>
    )
}

export default Header