import React, { useState, useEffect } from 'react';



const Library = () => {
    const [gameIds, setGameIds] = useState([]);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
    const[comment, setComment] = useState("");
    //const [searchValue, setSearchValue] = useState([]);
    useEffect(() => {
        fetch('/numofgames')
            .then(response => response.json())
            .then(data => setGameIds(data));
    }, []);
    const handleJump = game_id => {
        const gid = game_id;
        fetch('/game_show/' + gid.toString())
            .then((response) => response.json())
            .then(data => setgamelist(data))
            .catch((error) => console.log("error"));
        fetch('/comm_show/' + gid.toString())
            .then((response) => response.json())
            .then(data => setcommlist(data))
            .catch((error) => console.log("error"));
    };
    const SubmitComm = comment => {
        fetch('/add_comm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Comment successfully posted:', data);
            })
            .catch(error => {
                console.error('Error posting comment:', error);
            });
    }
    return (
        <div id="container" style={{ width: '100%' }}>
            <div id="header" style={{ backgroundColor: "gray",height:"100px"}}>
                <h1 style={{ marginBottom: 0 }}><center>search box</center></h1>
            </div>
            <div id="menu" style={{ backgroundColor: "gray", height: "500px", width: "30%", float:"left" }}>
                {gameIds.map(id => (
                    <table>
                        <button key={id} onClick={() => handleJump(id.g_id)}>
                            {id.g_name}{id._gid}
                        </button>
                    </table>
                ))}
            </div>
            <div id="content" style={{ backgroundColor: "gray", height: "500px", width: "35%", float: "left" }}>
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={require("../game_images/game_1.jpg")} width = "400px" height = "400px" alt="Los Angeles" className="d-block w-100"></img>
                        </div>
                        <div className="carousel-item">
                            <img src={require("../game_images/game_2.jpg")} width = "400px" height = "400px" alt="Chicago" className="d-block w-100"></img>
                        </div>
                        <div className="carousel-item">
                            <img src={require("../game_images/game_2.jpg")} width = "400px" height = "400px" alt="Chicago" className="d-block w-100"></img>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
            <div id="content" style={{ backgroundColor: "gray", height: "500px", width: "35%", float: "left" }}>
                        {
                            gamelist.map((games)=>{
                                return (
                                    <div id = "gameinfo" key={games.g_id}>
                                        <center><h3>{games.g_name}</h3></center>
                                        <p>{games.g_intro}</p>
                                    </div>
                                )
                            })
                        }

            </div>
            <div id="container" style={{ width: '30%' }}>
            </div>
            <div id="container" style={{ width: '40%' }}>
                {
                    commlist.map((comments)=> {
                        return (
                            <div key={comments.comm_id}>
                                <center>
                                    <table className="table">
                                        <tbody>
                                        <tr>
                                            <td rowSpan="2">user image</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td rowSpan="1">{comments._comm}</td>
                                        </tr>
                                        <tr>
                                            <td>time</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </center>
                            </div>
                        )
                    })
                }
                <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => SubmitComm()}>
                    Submit
                </button>

            </div>
            <div id="container" style={{ width: '30%' }}>
            </div>
        </div>
    );
}


export default Library;
