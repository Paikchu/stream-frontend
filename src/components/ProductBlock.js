import React from "react";
import "./ProductBlock.css"
export const ProductBlock = (props) => {
    const {id, gameName, gPrice, gImage} = props.data;
    return (
        <div className="gameblock">
            <img src={gImage} alt={gameName}/>
            <div className="description">
                <p>
                    <b>{gameName}</b>
                </p>
                <p>${gPrice}</p>
            </div>
        </div>
    )
}