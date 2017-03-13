import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { setUserName } from '../_state/actions';
import { cache, clearCache, TRENDS_URL } from '../_api/githubApi';
import '../App.css';
import './Search.css';

class Search extends Component {

    constructor(props) {
        super(props);
        const { user } = props;
        this.state = {
            value: user && user.name ? user.name : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event = null) {
        const { dispatchUserName } = this.props;
        const { value: userName } = this.state;
        if (cache.user && userName !== cache.user.name) {
            clearCache();
        }
        if (userName) {
            browserHistory.push(`/dashboard/${userName}`);
        }
        if (event) {
            event.preventDefault();
        }
        dispatchUserName(userName);
    }

    render() {
        const { value } = this.state;
        return (
            <div className="App-Content Search">
                <div className="Trends-content">
                    <a href={TRENDS_URL}>Trendings&nbsp;🔥</a>
                </div>
                <div className="Search-content">
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="user" className="Search-content-label">User name</label>
                        <input id="user"
                               type="text"
                               className="Search-content-input"
                               value={ value }
                               onChange={ this.handleChange }
                        />
                        <div className="Search-content-button-container" onClick={ this.handleSubmit }>
                            <div className="Search-content-button">
                                <span>Search</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


// - Redux -

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    dispatchUserName: user => dispatch(setUserName(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
