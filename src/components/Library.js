import React, { createElement,useState,useEffect,useMemo } from 'react';
import { Button, Descriptions, Radio } from 'antd';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar,Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import ReactPaginate from 'react-paginate';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles
import { Carousel } from 'react-bootstrap';
import { Input, Modal } from 'antd';
const ITEMS_PER_PAGE = 5;

const Library = () => {
    const [user_id, setUserId] = useState(2);
    const [gameIds, setGameIds] = useState([]);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchbox, setSearchbox] = useState("none");
    const [lunbotu, setlunbotu] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const { Search } = Input;

    const [modalVisible, setModalVisible] = useState(false);
    const [previewGame, setPreviewGame] = useState(null);

    const handlePreview = (game) => {
        setPreviewGame(game);
        setModalVisible(true);
    }

        const [comment, setComment] = useState({
            g_id: '',
            u_id: '',
            comm_rate: '',
            comm_content: ''
        });

        const [submitted, setSubmitted] = useState(false);

        const handleChange = event => {
            setComment({ ...comment, [event.target.name]: event.target.value });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            SubmitComm(comment);
            setSubmitted(true);
            setComment({
            g_id: "",
            u_id: "",
            comm_rate: "",
            comm_content: "",
        });
        };


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
        fetch('/getGameByUser/2')
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
        fetch('/game_show/' + gid.toString())
            .then((response) => response.json())
            .then(data => setgamelist(data))
            .catch((error) => console.log("error"));
        fetch('/getAllComm')
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
        <div className="container">
            <div className="sidebar">
                {displayedIds.map(id => (
                    <table key={id.g_id}>
                        <Button type="link" onClick={() => handleJump(id.g_id)} className="link-button">
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
                </div>
                <div id="content" style={{position: "absolute", top: "100%", height: "300px", width: "400px", border: "1px solid #ddd", display: searchbox}}>
                    {
                        searchResults.map((searchResult) => {
                            return (
                                <ul>
                                    <li>
                                        <b>
                                            <Button type = "link" key={searchResult.g_id} onClick={() => handleJump(searchResult.g_id)}  style={{border:"none",color:"black"}}>
                                                {searchResult.g_name}
                                            </Button>
                                        </b>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
                <Modal
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    {previewGame && (
                        <div>
                            <h2>{previewGame.g_name}</h2>
                            <img src={previewGame.g_image} alt={previewGame.g_name} />
                            <p>{previewGame.g_description}</p>
                        </div>
                    )}
                </Modal>
            </div>
            <div className="carousel">
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    <Carousel style={{width: "400px", height: "400px"}}>
                        <Carousel style={{ width: "200px", height: "auto" }}>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/game_1.jpg")} alt="First slide" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/game_2.jpg")} alt="Second slide" />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100" src={require("../game_images/game_2.jpg")} alt="Third slide" />
                            </Carousel.Item>
                        </Carousel>

                    </Carousel>
                </div>
            </div>
            <div className="game-list">
                {
                    gamelist.map((games) => {
                        return (
                            <div className="game-card">
                                <center><h3>{games.g_name}</h3></center>
                                <p><strong>Release Date:</strong> {games.g_release_date}</p>
                                <p><strong>Publisher:</strong> {games.g_cid}</p>
                                <p><strong>Tag:</strong> {games.g_tag}</p>
                                <p className="intro"><strong>Introduction:</strong> {games.g_intro}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="table">
                <table style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", color: "#333", fontFamily: "Arial, sans-serif" }}>
                    <tbody>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Operating System</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>64-bit Windows 10</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Processor</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>Ryzen 5 CPU or Equivalent</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>RAM</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>8 GB</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Memory</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>56G</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Network Requirement</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>Internet linked</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Graphic Card</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>AMD Radeon™ R9 290, NVIDIA GeForce® GTX 970</td>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #ccc", padding: "10px" }}>Extra Requirements</th>
                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>~3.8GB for 1 localized language</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="comments">
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
                {!submitted ? (
                    <form onSubmit={handleSubmit} className="comment-form">
                        <center>
                            <label>
                                Rating:
                                <select
                                    name="comm_rate"
                                    value={comment.comm_rate}
                                    onChange={handleChange}
                                >
                                    <option value="">Select rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                            <br />
                            <label>
                                Comment:
                                <textarea
                                    name="comm_content"
                                    value={comment.comm_content}
                                    onChange={handleChange}
                                    style={{ width: '400px', height: '200px' }}
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
