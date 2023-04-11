import React, { createElement,useState,useEffect,useMemo } from 'react';
import { Button, Descriptions, Radio } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar,Tooltip,Card } from 'antd';
import { Comment } from '@ant-design/compatible';
import ReactPaginate from 'react-paginate';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles
import { Carousel } from 'react-bootstrap';
import { Input, Modal } from 'antd';
import { useSelector } from "react-redux";
const ITEMS_PER_PAGE = 5;

const Library = () => {
    const user_id = useSelector(state => state.user.id);
    const [gameIds, setGameIds] = useState([]);
    const [gamelist, setgamelist] = useState([{
        "g_id": 2,
        "g_name": "FINAL FANTASY VII",
        "g_intro": "Cloud Strife, an ex-SOLDIER operative, descends on the mako-powered city of Midgar. The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.",
        "g_release_date": "2022-06-17T04:00:00.000+00:00",
        "g_price": 59.99,
        "g_tag": "ARPG",
        "g_cid": 1,
        "c_name":"Rockstar Games",
        "game_id":1,
        "g_OS":"Windows 10 64 Bit",
        "g_Processor":" Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs)",
        "g_RAM":"8GB",
        "g_Memory":"72GB",
        "g_Network":"100% DirectX 10 compatible",
        "g_GraphicCard":"NVIDIA GTX 660 2GB / AMD HD7870 2GB",
        "g_ExtraRequire":""
    }]);
    const [commlist, setcommlist] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchbox, setSearchbox] = useState("none");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentGameId, setGameId] = useState(1);
    const [comment, setComment] = useState({
        com_gid: currentGameId,
        com_content:"",
    });

    const [submitted, setSubmitted] = useState(false);

    const { Search } = Input;

    const show_searchbox = () =>{
        setSearchbox(true);
    }

    const hide_searchbox = () =>{
        setSearchbox("none");
    }



    const handleChange = event => {
        // setComment({ ...comment, [event.target.name]: event.target.value });
        setComment({com_content: event.target.value})
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
        show_searchbox();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const newComment = {
        //     com_gid: currentGameId.toString(),
        //     com_content: comment.com_content
        // };
        setComment({com_gid: currentGameId, com_content: comment.com_content})
        fetch('/add_comm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"com_gid":currentGameId,"com_content":comment.com_content})
        })
            .then(response => response.json())
            .then(data => {
                if(data.code === 200){
                    // Add new comment to front end before making async request
                    setcommlist([comment, ...commlist]);
                    setComment({com_gid:currentGameId, com_content: ""});

                }
                else{
                    alert(data.message)
                }
            })
            .catch(error => {
                console.error('Error posting comment:', error);
            });
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
        fetch('/getGameByUser/' + user_id.toString())
            .then(response => response.json())
            .then(data => setGameIds(data))
    }, []);

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedIds = gameIds.slice(startIndex, endIndex);


    const handleJump = game_id => {
        const gid = game_id;
        setGameId(gid);
        fetch('/game_show/' + gid.toString())
            .then((response) => response.json())
            .then(data => setgamelist(data))
            .catch((error) => console.log("error"));
        fetch('/comm_show/'+currentGameId.toString())
            .then((response) => response.json())
            .then(data => setcommlist(data))
            .catch((error) => console.log("error"));
        hide_searchbox();
    };
    return (
        <div className="container">
            <div className="sidebar">
                {displayedIds.map(id => (
                    <table key={id.g_id}>
                        <Button type="link" style = {{textDecoration: "underline"}} onClick={() => handleJump(id.g_id)} className="link-button">
                            {id.g_name}{id._gid}
                        </Button>
                    </table>
                ))}
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={Math.ceil(gameIds.length / ITEMS_PER_PAGE)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
            <div className="header" style={{position: "relative", marginLeft: "500px"}}>
                <div>
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <div className="sidebar_2"></div>
                </div>
            </div>
            <div id="content" style={{display: searchbox, flexDirection: 'column' }}>
                {searchResults.map(searchResult => {
                    return (
                        <ul>
                            <li>
                                <b>
                                    <Button type = "link" key={searchResult.g_id} onClick={() => handleJump(searchResult.g_id)}  style={{ border: "none", color: "white", textDecoration: "underline" }} className="link-button">
                                        {searchResult.g_name}
                                    </Button>
                                </b>
                            </li>
                        </ul>
                    )
                })
                }
            </div>
            <div className="game-list">
                {
                    gamelist.map((games) => {
                        return (
                            <div className="game-card">
                                <center><h3>{games.g_name}</h3></center>
                                <p><strong>Release Date:</strong> {games.g_release_date}</p>
                                <p><strong>Publisher:</strong> {games.c_name}</p>
                                <p><strong>Tag:</strong> {games.g_tag}</p>
                                <p className="intro"><strong>Introduction:</strong> {games.g_intro}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="carousel">
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <Carousel style={{width: "200px", height: "400px"}}>
                        <Carousel style={{ width: "200px", height: "auto" }}>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/"+currentGameId.toString()+"/game_1.jpg")} alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/"+currentGameId.toString()+"/game_2.jpg")} alt="Second slide" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/"+currentGameId.toString()+"/game_3.jpg")} alt="Third slide" />
                            </Carousel.Item>
                        </Carousel>

                    </Carousel>
                </div>
            </div>
            <div className="table">
                {
                    gamelist.map((games) => {
                        return (
                            <table key={games.g_id} style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", color: "#333", fontFamily: "Arial, sans-serif" }}>
                                <tbody>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Operating System</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_OS}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Processor</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_Processor}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>RAM</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_RAM}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Memory</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_Memory}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Video Requirement</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_Network}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Graphic Card</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_GraphicCard}</td>
                                </tr>
                                <tr>
                                    <th style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>Extra Requirements</th>
                                    <td style={{ border: "1px solid #ccc", padding: "10px", color: "white" }}>{games.g_ExtraRequire}</td>
                                </tr>
                                </tbody>
                            </table>
                        )
                    })
                }
            </div>
            <div className="comments">
                {
                    commlist.map((comments)=> {
                        return (
                            <Comment
                                author={<a>user{user_id}</a>}
                                avatar={<Avatar src={require("../game_images/"+currentGameId.toString()+"/game_1.jpg")} alt="Han Solo"/>}
                                content={
                                    <p>
                                        {comments.com_content}
                                    </p>
                                }
                                datetime={
                                    <Tooltip title="2023-2-15 11:33:33">
                                        <span>{comments.com_data}</span>
                                    </Tooltip>
                                }
                                style={{ width: '115%' }}
                            />
                        )
                    })
                }
            </div>
            <div className="submit">
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="comment-form">
                        <center>
                            <label>
                                <p style = {{color:"white"}}>Post your comment here</p>
                                <textarea
                                    name="com_content"
                                    value={comment.com_content}
                                    onChange={handleChange}
                                    style={{ width: '600px', height: '100px' }}
                                />

                            </label>
                            <br />
                            <button type="submit" className="comment-submit">
                                Submit Comment
                            </button>
                        </center>
                    </form>
                ) : (
                    <h3>Comment successfully submitted!</h3>
                )}
            </div>
        </div>

    );
}
export default Library;