import React, { createElement,useState,useEffect } from 'react';
import { Button, Descriptions, Radio } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar,Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import { Input, Space } from 'antd';




const Library = () => {
    const [gameIds, setGameIds] = useState([]);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState("");
    const [newcomment, set_newcomment] = useState('');
    const [searchValue, setSearchValue] = useState("");
    const [searchbox, setSearchbox] = useState("none");
    const [lunbotu, setlunbotu] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    const show_lunbotu = () => {
        setlunbotu("");
    };
    const hide_lunbotu = () => {
        setlunbotu("none");
    };

    const show_searchbox = () => {
        setSearchbox("");
    };
    const hide_searchbox = () => {
        setSearchbox("none");
    };

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
    ];

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
        hide_searchbox();
        show_lunbotu();
    };

    const handleSearch = () => {
        fetch('/search_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gamename: searchValue })
        })
            .then(response => response.json())
            .then(data => setSearchResults(data))
            .catch(error => console.log(error));
        hide_lunbotu();
        show_searchbox();
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
        <div id="container" style={{ width: '100%'}}>
            <center><div id="content" style={{height:"100px",width:"400px",position:"cenetr"}}>
                <div>
                    <Input.Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                </div>
                <div id="content" style={{height:"300px",width:"400px",position:"cenetr",border:"1px solid #ddd",display:searchbox}}>
                    {
                        searchResults.map((searchResult) => {
                            return (
                                <ul>
                                    <li> <b><Button type = "link" key={searchResult.g_id} onClick={() => handleJump(searchResult.g_id)}  style={{border:"none",color:"black"}}>
                                        {searchResult.g_name}
                                    </Button></b></li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div></center>
            <div id="menu" style={{height: "480px", width: "20%", float:"left"}}>
                {gameIds.map(id => (
                    <table>
                        <Button type = "link" key={id} onClick={() => handleJump(id.g_id)}  style={{border:"none",color:"black"}}>
                            {id.g_name}{id._gid}
                        </Button>
                    </table>
                ))}
            </div>
            <div id="content" style={{height: "500px", width: "40%", float: "left",display:lunbotu}}>
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
            <div id="content" style={{height: "500px", width: "5%", float: "left"}}>
            </div>
            <div id="content" style={{height: "500px", width: "35%", float: "right"}}>
                        {
                            gamelist.map((games)=>{
                                return (
                                    <div>
                                        <center><h3>{games.g_name}</h3></center>
                    <p>Release Date:{games.g_rlsdate}</p>
                    <p>Publisher:{games.g_compid}</p>
                    <p>Tag:{games.g_tag}</p>
                   <text>Introduction:{games.g_intro}</text>
                                    </div>
                )
                })
                }
            </div>
            <div id="container" style={{ width: '100%'}}>
                <div id="content" style={{ width: "10%", float: "left"}}>
                </div>
                <div id="content" style={{ top: "50px", width: "45%", float: "left"}}>
                    <Descriptions
                        bordered
                        size="small"
                    >
                        <Descriptions.Item label="Operating System">64-bit Windows 10</Descriptions.Item>
                        <Descriptions.Item label="Processor">Ryzen 5 CPU or Equivalent</Descriptions.Item>
                        <Descriptions.Item label="RAM">8 GB</Descriptions.Item>
                        <Descriptions.Item label="Memory">56G</Descriptions.Item>
                        <Descriptions.Item label="Network Requirement">Internet linked</Descriptions.Item>
                        <Descriptions.Item label="Graphic Card"> AMD Radeon™ R9 290, NVIDIA GeForce® GTX 970</Descriptions.Item>
                        <Descriptions.Item label="Extra Requirements">
                            ~3.8GB for 1 localized language
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <div id="content" style={{ width: "10%", float: "left"}}>
                </div>
                <div id="content" style={{ width: "35%", float: "right",border:"3px solid #ddd"}}>
                    {
                        commlist.map((comments)=> {
                            return (
                                <Comment
                                    actions={actions}
                                    author={<a>user{comments.u_id}</a>}
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                                    content={
                                        <p>
                                            {comments._comm}
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip title="2023-2-15 11:33:33">
                                            <span>1 hours ago</span>
                                        </Tooltip>
                                    }
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}


export default Library;
