import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Task from './components/Task';
import DigitalGoldPrices from './components/DigitalGoldPrices'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/todo" component={Home} exact/>
                        <Route path="/task/:id" component={Task}/>
                        <Route path="/gold-prices" component={DigitalGoldPrices} exact/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
