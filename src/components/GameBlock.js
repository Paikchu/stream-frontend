import React, {useEffect, useState} from "react";
import "./Style.css"
import { useDispatch } from "react-redux";
import {login} from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


const GameBlock = () => {
    const navigate = useNavigate();
    const user_id = useSelector(state => state.user.id);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const [hiddenPurchaseButtons, setHiddenPurchaseButtons] = useState([]);
    const [hiddenCartButtons, setHiddenCartButtons] = useState([]);
    const email = useSelector(state => state.user.email);
    const fetchData = () => {
        if (user_id > 0 ) {
            fetch('/home/'+user_id.toString())
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                });
        }
        else {
            fetch('/home1')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setData(data);
                });
        }
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

            fetch("/quick_order/"+email+"/"+g_id, {
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
                    console.log("Quick_order:")
                    console.log(result);
                })
                .catch((error) => console.log(error));
            setHiddenPurchaseButtons((prevHiddenButtons) => [...prevHiddenButtons, g_id]);
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
            setHiddenCartButtons((prevHiddenButtons) => [...prevHiddenButtons, g_id]);
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
                            <a href='#' onClick={(e)=> {e.preventDefault();navigate('/singlegame/'+item.g_id.toString());}}>
                                <img src={require("..//game_images/"+item.g_id+"/game_1.jpg")} style={{height: 150, width: 150}}/>
                                <p key={item.g_id}>{item.g_name}</p>
                                <p>{item.g_price > 0 ? item.g_price : "Free"}</p>
                            </a>
                            <div className="button-container">
                                {hiddenPurchaseButtons.includes(item.g_id) ?<p color = "white">You have bought</p>:
                                <button onClick={() => handlePurchase(email,item.g_id)}>
                                    Purchase
                                </button>}
                            </div>

                            <div className="button-container">
                                {hiddenPurchaseButtons.includes(item.g_id)||hiddenCartButtons.includes(item.g_id) ? null:
                                <button onClick={() => handleAdd(email,item.g_id)}>
                                    Add to Cart
                                </button>}
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