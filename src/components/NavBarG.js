import React from "react"
import "./Style.css"
function NavBarG (){
    return (
        <div>
            <div className="global_header">
                <div className="global_header_container">
                    <ul className="menu">
                        <li><a href="/home">store </a></li>
                        <li><a href="/Library">library </a></li>
                        <li><a href="/Cart">cart </a></li>
                        <li><a href="/Order">order </a></li>
                        <li><a href="/account">account</a></li>
                        <li className="right-item"><a className="active" href="/about">About</a></li>
                        <li className="right-item"><a className="active" href="/user-sign-in">Login</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default NavBarG;