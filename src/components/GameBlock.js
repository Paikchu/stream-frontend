import React from "react";
import "./Style.css"

export default class GameBlock extends React.Component {
    games= [];
    render() {
        console.log("Game blocking...")
        return (
            <div>
                <div className="row">
                    {
                        this.props.games.map((gameObj)=>{
                            //console.log(gameObj.g_name)
                            return (
                                <div key={gameObj.g_id} className="card">
                                    <a rel="noreferrer" href="https://github.com" target="_blank">
                                        <img className="homepage-display" style={{width: 200}} src={require("..//PlaceHolder.png")} alt={gameObj.g_tag}/>
                                    </a>
                                    <div className="card-text">{gameObj.g_name}</div>
                                    <div className="card-text">{gameObj.g_price}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <p>??????????????????</p>
            </div>
        )
    }
}
//<img className="homepage-display" style={{width: 200}} src={require("..//PlaceHolder.png")} alt={gameObj.g_tag}/>