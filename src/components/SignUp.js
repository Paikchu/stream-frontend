import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/user/userSlice";

export default function SignUp(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function getJSONPayload() {
        if (props.name === "man")
            return JSON.stringify({m_name: name, m_email: email, m_pd: password})
        else if (props.name === "com")
            return JSON.stringify({com_name: name, com_email: email, com_pd: password})
        else
            return JSON.stringify({u_name: name, u_email: email, u_pd: password})
    }

    function handleClick() {
        if (name != null && email != null && password != null) {
            fetch("/" + props.name + "-sign-up", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: getJSONPayload()
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result.message);
                    if(result.code !== 400){
                        dispatch(login(email, result.code));
                        navigate('/home');
                    }
                    else{
                        alert(result.message);
                    }
                })
                .catch((error) => console.log("error"));
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (e.target.value.length <= 50) {
                                setNameError('');
                            } else {
                                setNameError('Name too long');
                            }
                        }}
                    />
                    {nameError && <p style={{color: 'red'}}>{nameError}</p>}
                </div>
                <div>
                    <label>SIGN IN WITH EMAIL</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailRegEx.test(e.target.value)) {
                                setEmailError('');
                            } else if (!emailRegEx.test(e.target.value)) {
                                setEmailError('Email is not valid');
                            } else if (e.target.value.length > 40) {
                                setEmailError('Email too long');
                            }
                        }}
                    />
                    {emailError && <p style={{color: 'red'}}>{emailError}</p>}
                </div>
                <div>
                    <label>PASSWORD</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            if (e.target.value.length < 6) {
                                setPasswordError("Password too short");
                            } else if (e.target.value.length > 40) {
                                setPasswordError("Password too long");
                            } else {
                                setPasswordError("");
                            }
                        }}
                    />
                    {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            if (e.target.value === password) {
                                setConfirmPasswordError('');
                            } else {
                                setConfirmPasswordError('Different password')
                            }
                        }}
                    />
                    {confirmPasswordError && <p style={{color: 'red'}}>{confirmPasswordError}</p>}
                </div>
                <div>
                    <button onClick={() => handleClick()}>
                        Login
                    </button>
                </div>

            </div>
        </div>
    );
}