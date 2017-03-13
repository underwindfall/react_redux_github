import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './Header.css';

class Header extends Component {

    render() {
        const { title } = this.props;
        return (
            <div className="Header-container">
                {this.renderBack()}
                <h2>{title}</h2>
            </div>
        );
    }

    renderBack = () => {
        const hasBack = browserHistory.getCurrentLocation().pathname !== '/';
        if (hasBack) {
            return (
                <div className="Header-back" onClick={() => browserHistory.goBack()}>
                    <img className="Header-back-image" src="/back-button.png" alt="back"/>
                    <span>Back</span>
                </div>
            );
        }
        return null;
    };

}

export default Header;
