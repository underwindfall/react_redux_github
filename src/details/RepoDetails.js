import React, { Component } from 'react';
import { findRepo } from '../_api/githubApi';
import './RepoDetails.css';
import '../App.css';

class RepositoryDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repo: null
        };
    }

    componentDidMount() {
        const { owner, name, type } = this.props.params;
        findRepo(owner, name, type)
            .then(repo => {
                this.setState({ repo });
            });
    }

    render() {
        const { repo } = this.state;
        if (repo) {
            return (
                <div className="App-content">
                    <div className="Repo-header">
                        <h1>{repo.name}</h1>
                        <div className="Repo-header-stars">{`${repo.stars}★`}</div>
                    </div>
                    <div className="Repo-content-language">
                        {`(${repo.language})`}
                    </div>
                    <p className="Repo-content-text Repo-content-description">
                        {repo.description}
                    </p>
                    <div className="Repo-content-text Repo-content-dates">
                        <p>{`Created: ${new Date(repo.dates.created).toLocaleDateString()}`}</p>
                        <p>{`Last updated: ${new Date(repo.dates.updated).toLocaleDateString()}`}</p>
                    </div>
                    <p className="Repo-content-text Repo-content-link">
                        <a href={repo.url} target="_blank">More</a>
                    </p>
                </div>
            );
        }
        return null;
    }

}

export default RepositoryDetails;
