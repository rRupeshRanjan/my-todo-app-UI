import React, { Component } from 'react';
import '../../css/header.css';

export default class Header extends Component {
    state = {}
    componentDidMount() {
        setInterval(() => {
            this.setState({
                currTime : new Date().toLocaleString()
            })
        }, 100)
    }

    render() {
        return(
            <div className="Header">
                <div className="To-Do"> To-Do App </div>
                <div className="Time-Block"> {this.state.currTime} </div>
            </div>
        )
    }
}