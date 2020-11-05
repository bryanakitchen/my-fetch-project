import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import './App.css';
import Main from './Main.js';
import Create from './Create.js';
import Detail from './Detail.js';

export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Main {...routerProps} />} 
                        />
                        <Route 
                            path="/create" 
                            exact
                            render={(routerProps) => <Create {...routerProps} />} 
                        />
                        <Route 
                            path="/artists/:id" 
                            exact
                            render={(routerProps) => <Detail {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}