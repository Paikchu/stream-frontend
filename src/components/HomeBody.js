import React from "react";

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
            <div>
                <h1>Welcome to streamy</h1>
            </div>
        );
    };
}

export default HomeBody;