import React from 'react';
import './Header.css';
import netflixlogo from '../images/netflixlogo.png'


export default ({black}) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo" >
                <a href="/">
                    <img src={netflixlogo} alt="logo Netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://ih1.redbubble.net/image.618393699.1999/flat,1000x1000,075,f.u2.jpg" alt="Logo Usuário"/>
                </a>
            </div>
        </header>
    );
}