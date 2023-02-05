import React from "react";
class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            account_s: 'login',
            code: ''
        }

    }

    getJSONPayload() {
        if(this.props.name === "man")
            return JSON.stringify({m_email: this.state.email, m_pwd: this.state.password})
        else if(this.props.name === "com")
            return JSON.stringify({com_email: this.state.email, com_pwd: this.state.password})
        else
            return JSON.stringify({u_email: this.state.email, u_pwd: this.state.password})
    }


    handleClick() {
        if(this.state.email != null && this.state.password != null){
            fetch("/" + this.props.name + "-sign-in", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: this.getJSONPayload()
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result.message);
                })
                .catch((error) => console.log("error"));
        }
    }

    render(){
        return(
            <div>
                <h1>Sign In</h1>
                <div>
                    <div>
                        <label>SIGN IN WITH EMAIL</label>
                        <input
                            type="text"
                            value = {this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>PASSWORD</label>
                        <input
                            type="password"
                            value = {this.state.password}
                            onChange={(e)=> this.setState({password: e.target.value})}
                        />
                    </div>
                    <div>
                        <button onClick={() => this.handleClick()}>
                            {this.state.account_s}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
}

export default SignIn;