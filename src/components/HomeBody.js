import React from "react";
import "./Style.css"

class HomeBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            games: [],
        }
    }

    componentDidMount() {
        this.loadGames();
    }

   loadGames() {
    }

    render(){
        return(
            <div className="main-body">
                <h1>Welcome to streamy</h1>
            </div>
        );
    };
}

export default HomeBody;