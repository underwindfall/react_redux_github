import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { mainReducer } from './_state/reducers';
import thunk from 'redux-thunk';
import { createLoggerMiddleware } from './_state/middlewares/logger.middleware';
import Header from './header/Header';
import './App.css';

const store = createStore(mainReducer, applyMiddleware(thunk, createLoggerMiddleware()));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Header title="Github Dashboard"/>
                    { this.props.children }
                </div>
            </Provider>
        );
    }
}

export default App;
