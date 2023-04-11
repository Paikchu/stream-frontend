import React, {useEffect, useState} from "react";
import "./Style.css"
import { useDispatch } from "react-redux";

const GameBlock = () => {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const [hiddenButtons, setHiddenButtons] = useState([]);
    const fetchData = () => {
        fetch('home')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
    };

    useEffect(()=>{
        fetchData();
    },[]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleAddCart = cart_gid => {
        fetch('/add_cart/2/'+cart_gid.toString())
            .then((response) => response.json())
            .catch((error) => console.log("error"));
        setHiddenButtons((prevHiddenButtons) => [...prevHiddenButtons, cart_gid]);
    }

    return (
        <div>
            {data ? (
                <div>
                    {data.map(item => (
                        <div className="display-block">
                            <a rel="noreferrer" href="https://store.steampowered.com/" target="_blank">
                                <img src={require("..//game_images/"+item.g_id+"/game_1.jpg")} style={{height: 150, width: 150}}/>
                                <p key={item.g_id}>{item.g_name}</p>
                                <a>{item.g_price > 0 ? item.g_price : "Free"}</a>
                            </a>
                            <button type="link" onClick={() => handleAddCart(item.g_id)} className="link-button"> {hiddenButtons.includes(item.g_id) ? null : "Add to Cart"}</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default GameBlock;
//<img className="homepage-display" style={{width: 200}} src={require("..//PlaceHolder.png")} alt={gameObj.g_tag}/>