import React from "react";

export default class GameSeek extends React.Component {

    componentDidMount() {
        let gamelist = [];
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
        this.setState({games: gamelist})
    }
    render() {
        console.log("Gema seeking...")
        return (
            <h1>Welecome to streamy</h1>
        )
    }
}