import React, { useState, useEffect } from 'react';

const Library = () => {
    const [userIds, setUserIds] = useState([]);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
    useEffect(() => {
        fetch('/numofgames')
            .then(response => response.json())
            .then(data => setUserIds(data));
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
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '20%', height: '100%', overflow: 'auto' }}>
                <div>
                    <div>
                        {userIds.map(id => (
                            <button key={id} onClick={() => handleJump(id._gid)}>
                                game{id._gid}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div style={{ width: '80%', height: '100%', position: 'relative' }}>
                <div
                    style={{
                        position: 'absolution',
                        left: '20%',
                        top: 0,
                        bottom: 0,
                        width: '1px',
                    }}
                />
                <center>
                    <div>
                        <ul>
                            {
                                gamelist.map((games)=>{
                                    return (
                                        <div key={games._gid}>
                                            <p>id:{games._gid}</p>
                                            <p>intro:{games._gintro}</p>
                                            <p>name:{games._gname}</p>
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
                                            <p>comment:{comments._comm}</p><p>rate:{comments._rate}</p>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </center>
            </div>
        </div>
    );
};

export default Library;
