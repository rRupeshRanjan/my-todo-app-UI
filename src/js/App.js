import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Task from './components/Task';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/task/:id" component={Task}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
