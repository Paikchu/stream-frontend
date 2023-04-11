import React from "react";
import "./Style.css";
import GameBlock from "./GameBlock";
import { useSelector } from "react-redux";
import store from "../store";

const HomeBody = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userEmail = useSelector(state => state.user.email);
    const userID = useSelector(state => state.user.id);
    
    return (
        <React.StrictMode>
            <div>
                <main>
                    <h1>Welcome to the Home Page</h1>
                    {isLoggedIn ? (
                        <p>You are signed in as: {userEmail}</p>
                    ) : (
                        <p>Please sign in to view your email</p>
                    )}
                    <div className="main-body">
                        {1 ? (
                            <GameBlock />
                        ) : (
                            <p>Loading games...</p>
                        )}
                    </div>
                </main>
            </div>
        </React.StrictMode>
    );
};

export default HomeBody;
