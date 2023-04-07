import React from "react";
import "./Style.css";
import GameBlock from "./GameBlock";
import { useSelector } from "react-redux";

const HomeBody = () => {
    const userEmail = useSelector((state) => state.user.email);

    return (
        <React.StrictMode>
            <div>
                <main>
                    <h1>This is the homepage</h1>
                    {userEmail && <p>You are signed in as: {userEmail}</p>}
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
