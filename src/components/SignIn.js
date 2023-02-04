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

    toJson(data){
        return data.json;
    }


    handleClick() {
        if(this.state.email != null && this.state.password != null){
            console.log("success");
            const httpUrl = ""
            fetch(httpUrl + "/user-sign-in", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({u_email: this.state.email, u_pwd: this.state.password})
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