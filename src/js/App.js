import '../css/App.css';
import TaskGrid from './TaskGrid.js';
import React, { Component } from 'react';

export default class App extends Component {
    state = {}
    componentDidMount() {
        setInterval(() => {
            this.setState({
                currTime : new Date().toLocaleString()
            })
        }, 100)
    }

    render() {
        return (
            <>
                <div className="App-header">
                    <div className="To-Do"> To-Do App </div>
                    <div className="Time-Block"> {this.state.currTime} </div>
                </div>
                <TaskGrid/>
            </>
        );
    }
}
