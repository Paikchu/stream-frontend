import React from "react";
import "./Style.css"
import GameBlock from "./GameBlock";
import GameSeek from "./GameSeek";

class HomeBody extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            dataloaded: false
        }
    }
     async componentDidMount() {
        let gamelist = [];
        if(0)
         fetch("/home")
             .then((response)=>response.json())
             .then((val)=>{
                 //console.log(typeof val)
                 val.map((Obj)=>{
                     //console.log(Obj);
                     gamelist.push(Obj)
                     return (
                         <div>{Obj.g_name}</div>
                     )
                 })
             });
         this.setState({dataloaded: true, games: gamelist})
    }

    componentWillUnmount() {
        this.setState({dataloaded: false})
    }

    saveGame = (games) => {
        this.setState({games: games})
    }
    render(){
        //console.log(this.state.games)
        //console.log(this.state.dataloaded)
            //console.log(this.state.games.result)
            return(
                <React.StrictMode>
                    <div className="main-body">
                        <GameSeek saveGame={this.saveGame}/>
                        <GameBlock games={this.state.games}/>
                    </div>
                </React.StrictMode>
            );
    };
}

export default HomeBody;