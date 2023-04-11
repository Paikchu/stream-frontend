import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { login } from "../features/user/userSlice";

export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getJSONPayload() {
        if (props.name === "man")
            return JSON.stringify({m_email: email, m_pd: password})
        else if (props.name === "com")
            return JSON.stringify({com_email: email, com_pd: password})
        else
            return JSON.stringify({u_email: email, u_pd: password})
    }

    function handleClick() {
        if (email != null && password != null) {
            fetch("/" + props.name + "-sign-in", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: getJSONPayload()
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result.message);
                    navigate('/home');
                    let id = result.code;
                    id.toString();
                    dispatch(login({type: 'ID', payload: result.code.toString()}));
                    dispatch(login({type: 'EMAIL', payload: email}));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <div>
                    <label>SIGN IN WITH EMAIL</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailRegEx.test(e.target.value)) {
                                setError('');
                            } else {
                                setError('Email is not valid');
                            }
                        }}
                    />
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={() => handleClick()}>
                        Login
                    </button>
                </div>
                <div>
                    <a href="/sign-up">New User?</a>
                </div>
            </div>
        </div>
    );
}