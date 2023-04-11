import React, {useEffect, useState} from "react";
import "./Style.css"
import { useDispatch } from "react-redux";
import {login} from "../features/user/userSlice";
import { useSelector } from "react-redux";

const GameBlock = () => {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const email = useSelector(state => state.user.email);
    const fetchData = () => {
        fetch('home')
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setData(data);
            });
    };

    useEffect(()=>{
        fetchData();
    },[]);

    function handlePurchase(email,g_id){
        console.log(g_id);
        if (email != null && g_id != null) {
            fetch("/add_lib_by_email/"+email+"/"+g_id, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: 'Add'
                })
            }).then((response) => response.json())
                .then((result) => {
                    console.log("handlePurchase:")
                    console.log(result);
                })
                .catch((error) => console.log(error));
        }
    }

    function handleAdd(email,g_id){
        console.log(g_id);
        if (email != null && g_id != null) {
            fetch("/add_cart_by_email/"+email+"/"+g_id, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: 'Add'
                })
            }).then((response) => response.json())
                .then((result) => {
                    console.log("handleCart:")
                    console.log(result);
                })
                .catch((error) => console.log(error));
        }
    }

    if (!data) {
        return <div>Loading...</div>;
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
                                <p>{item.g_price > 0 ? item.g_price : "Free"}</p>
                            </a>
                            <div className="button-container">
                                <button onClick={() => handlePurchase(email,item.g_id)}>
                                    Purchase
                                </button>
                            </div>
                            <div className="button-container">
                                <button onClick={() => handleAdd(email,item.g_id)}>
                                    Add to Cart
                                </button>
                            </div>
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