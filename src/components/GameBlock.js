import React, {useEffect, useState} from "react";
import "./Style.css"

const GameBlock = () => {
    const [data, setData] = useState(null);

    const fetchData = () => {
        fetch('home')
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    };

    useEffect(()=>{
        fetchData();
    },[]);

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
                                <img src={require("..//PlaceHolder.png")} style={{width: 200}}/>
                                <p key={item.g_id}>{item.g_name}</p>
                                <a>{item.g_price}</a>
                            </a>
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