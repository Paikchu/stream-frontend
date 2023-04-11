import React from "react"
import { useNavigate } from "react-router-dom"
import "./Style.css"

export default function NavBarG(){
    const navigate = useNavigate();

    return (
        <div>
            <div className="global_header">
                <div className="global_header_container">
                    <ul className="menu">
                        <li><a href='#' onClick={(e)=> {e.preventDefault();navigate('/');}}>Store </a></li>
                        <li><a href='#' onClick={(e)=> {e.preventDefault();navigate('/library');}}>Library </a></li>
                        <li className="right-item"><a className="active" onClick={() => {navigate('/user-sign-in');}}>Login</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
