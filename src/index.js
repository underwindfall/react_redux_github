import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Search from './search/Search';
import Dashboard from './dashboard/Dashboard';
import RepositoryDetails from './details/RepoDetails';
import Error from './error/Error';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Search}/>
            <Route path="dashboard/:user" component={Dashboard}/>
            <Route path="repository/:type/:owner/:name" component={RepositoryDetails}/>
            <Route path="*" component={Error}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
