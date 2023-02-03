import React from "react";
import "./Style.css"

class HomeBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            finishedLoading: true
        }
    }

    async componentDidMount() {
        fetch("http://localhost:3000/home").then(
            response => {
                //console.log(response.json());
                this.setState({games: response.json()})
            },
            error => {
                console.log(error.response.data)
            }
        )
    }

    render(){
        return(
            <div className="main-body">
                <h1>Welecome to streamy</h1>
            </div>
        );
    };
}

export default HomeBody;