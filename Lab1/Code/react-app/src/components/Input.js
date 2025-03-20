import React from "react";

class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            helpText: "helpText",
            userData: ""
        }

        this.mouseOver = this.mouseOver.bind(this);
    }
    
    render(){
        return(
        <>
        <h1> {this.state.helpText}</h1>
        <h2>{this.state.userData}</h2>
        <input placeholder={this.state.userData} onChange={event => this.setState({userData: event.target.value})} />
        <button id="loadKey" onMouseEnter = {this.mouseOver}>Загрузить ключ</button>
        </>
        )
    }

    mouseOver(){
        this.setState({helpText : "over"});
        console.log("Over");
    }
}

export default Input 