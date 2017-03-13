import React, { Component } from 'react';
import { getRepos, cache, TYPE_REPOS, TYPE_DATA } from '../../_api/githubApi';
import { browserHistory } from 'react-router';
import './ReposAccordion.css';

class RepositoriesAccordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repositories: props.repositories,
            opened: false
        };
        this.toggleRepositories = this.toggleRepositories.bind(this);
        this.moreRepositories = this.moreRepositories.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.repositories) {
            this.setState({ repositories: nextProps.repositories });
        }
    }

    render() {
        const { type, color } = this.props;
        const { opened, repositories } = this.state;
        const arrow = this.renderArrow(opened);
        const hasMore = repositories.links ? !!repositories.links.next : false;
        const Header = (
            <header className={`Accordion-repos-header Accordion-repos-header-${color}`}
                    onClick={this.toggleRepositories}>
                <h2>
                    {arrow}
                    {`
                        ${repositories.results ? repositories.results.length : '...'}${hasMore ? '+' : ''}
                        ${type === TYPE_REPOS.Public ? ' public' : ' starred'} repositories`
                    }
                </h2>
            </header>
        );
        let HasMoreBlock;
        if (hasMore) {
            HasMoreBlock = (
                <li className={`Accordion-item Accordion-item-more Accordion-item-more-${color}`}
                    onClick={this.moreRepositories}>
                    <pan>More</pan>
                </li>
            );
        }
        if (repositories.results && opened) {
            return (
                <div className="Accordion-repos">
                    {Header}
                    <ul>
                        {
                            repositories.results.map((repository, index) => {
                                return (
                                    <li key={index}
                                        className={`Accordion-item Accordion-item-${color}`}
                                        onClick={() => this.selectRepo(repository)}
                                    >
                                        <div>{repository.name}</div>
                                        <div>{`${repository.stars}★`}</div>
                                    </li>
                                );
                            })
                        }
                        {HasMoreBlock}
                    </ul>
                </div>
            );
        }
        else return (
            <div className="Accordion-repos">
                {Header}
            </div>
        );

    }

    renderArrow = (opened) => {
        return <img className={`Accordion-arrow ${opened ? 'Accordion-arrow-close' : 'Accordion-arrow-open'}`}
                    src="/back-button.png"
                    alt="arrow"/>
    };

    toggleRepositories() {
        this.setState(state => {
            return {
                opened: !state.opened
            };
        });
    }

    selectRepo = (repo) => {
        const { type } = this.props;
        browserHistory.push(`/repository/${type}/${repo.owner}/${repo.name}`);
    };

    moreRepositories() {
        const { type } = this.props;
        getRepos(cache.user.name, type, TYPE_DATA.More)
            .then(repos => {
                this.setState(state => {
                    return {
                        repositories: {
                            links: repos.links,
                            results: state.repositories.results.concat(repos.results)
                        }
                    }
                });
            });
    }

}

export default RepositoriesAccordion;
