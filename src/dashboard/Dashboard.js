import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDashboardIndicators } from '../_state/actions';
import RepositoriesAccordion from './repositories/ReposAccordion';
import Issue from './issues/Issue';
import { TYPE_REPOS } from '../_api/githubApi';
import '../App.css';
import './Dashboard.css';

class Dashboard extends Component {

    componentDidMount() {
        const { getIndicators, user, params } = this.props;
        getIndicators(user && user.name ? user.name : params.user);
    }

    render() {
        const { user, indicators } = this.props;
        const { publicRepositories, starredRepositories, openedIssues, openedPullRequests } = indicators;
        return (
            <div className="App-content Dashboard">
                <div className="Dashboard-content">
                    <header className="Dashboard-content-header">
                        <h1>{user && user.name ? `${user.name.substr(0, 1).toUpperCase()}${user.name.substr(1)}` : ''}</h1>
                        <img className="Dashboard-content-header-avatar" src={user.avatar} alt="avatar"/>
                    </header>
                    <RepositoriesAccordion
                        type={TYPE_REPOS.Public}
                        color="blue"
                        repositories={publicRepositories}
                    />
                    <RepositoriesAccordion
                        type={TYPE_REPOS.Starred}
                        color="purple"
                        repositories={starredRepositories}
                    />
                    <div className="Dashboard-content-issues-container">
                        <Issue
                            title="Issues"
                            count={openedIssues}
                            isLeft
                        />
                        <Issue
                            title="Pull requests"
                            count={openedPullRequests}
                            isRight
                        />
                    </div>
                </div>
            </div>
        );
    }
}


// - Redux -

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    indicators: state.indicators
});

const mapDispatchToProps = dispatch => ({
    getIndicators: userName => dispatch(getDashboardIndicators(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
