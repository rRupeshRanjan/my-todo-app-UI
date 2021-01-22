import '../css/App.css';
import TaskTable from './TaskTable.js';
import React, { Component } from 'react';

export default class App extends Component {
    state = {}
    componentDidMount() {
        setInterval(() => {
            this.setState({
                currTime : new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                <div className="App-header">
                    <div className="To-Do"> To-Do App </div>
                    <div className="Time-Block"> {this.state.currTime} </div>
                    <input className="Search" type="text" placeholder="Search.." />
                </div>
                <br/>
                <TaskTable/>
            </div>
        );
    }
}
