import React, { useState, useEffect } from 'react';

const Library = () => {
    const [gameIds, setGameIds] = useState([]);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
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
    return (
        <div id="container" style={{ width: '100%' }}>
            <div id="header" style={{ backgroundColor: "#EEEEEE" }}>
                <h1 style={{ marginBottom: 0 }}><center>search box</center></h1>
            </div>
            <div id="menu" style={{ backgroundColor: "#EEEEEE", height: "350px", width: "50%", float: "left" }}>
                {gameIds.map(id => (
                    <ul>
                        <button key={id} onClick={() => handleJump(id.g_id)}>
                            game{id._gid}
                        </button>
                    </ul>
                ))}
            </div>
            <div id="content" style={{ backgroundColor: "#EEEEEE", height: "350px", width: "50%", float: "left" }}>
                <center>
                    <ul>
                        {
                            gamelist.map((games)=>{
                                return (
                                    <div key={games.g_id}>
                                        <p>id:{games.g_id}</p>
                                        <p>intro:{games.g_intro}</p>
                                        <p>name:{games.g_name}</p>
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <ul>
                        {
                            commlist.map((comments)=>{
                                return (
                                    <div key={comments.g_id}>
                                        <p>user id:{comments.u_id}</p>
                                        <p>game id:{comments.g_id}</p>
                                        <p>comment:{comments.comm_content}</p><p>rate:{comments._rate}</p>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </center>
            </div>

        </div>

    );
}


export default Library;
