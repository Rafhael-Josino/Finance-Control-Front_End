import React from "react";

const Navigator = ({ setPage }) => {
    return (
            <header>
            <nav>
                <div id="logo">Finances Control Project</div>
                <div className="subHeader">
                    <div className="director" id="home" onClick={() => setPage('home')}>HOME</div>
                    <div id="about">ABOUT</div>
                    <div id="services">SERVICES</div>
                    <div id="testimonials">TESTIMONIALS</div>
                    <div id="contact">CONTACT</div>
                </div>
            </nav>
        </header>
    )
}

export default Navigator;