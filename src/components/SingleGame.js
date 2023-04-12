import React, { useState,useEffect } from 'react';
import { Avatar,Tooltip,Card } from 'antd';
import { Comment } from '@ant-design/compatible';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import the styles
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Library = () => {
    const { gameId } = useParams();
    const [user_id, setUserId] = useState(2);
    const [gamelist, setgamelist] = useState([]);
    const [commlist, setcommlist] = useState([]);
    const [currentGameId, setGameId] = useState(gameId);

    useEffect(() => {
        fetch('/game_show/' + currentGameId.toString())
            .then((response) => response.json())
            .then(data => setgamelist(data))
            .catch((error) => console.log("error"));
        fetch('/comm_show/'+currentGameId.toString())
            .then(response => response.json())
            .then(data => setcommlist(data))
        },
    );

    return (
        <div className="container">
            <div className="header" style={{position: "relative", marginLeft: "500px"}}>
                <div>
                    <div className="sidebar_2"></div>
                </div>
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
        </div>

    );
}
export default Library;