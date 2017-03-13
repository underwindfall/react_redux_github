import { getUser, getRepos, getOpenedIssuesOrPrs, TYPE_REPOS, TYPE_ISSUES } from '../../_api/githubApi';

// ## Standard actions ##

export const setUserName = userName => ({
    type: 'SET_USER_NAME',
    userName
});

export const setUser = user => ({
    type: 'SET_USER',
    user
});

export const setDashboardIndicators = indicators => ({
    type: 'SET_INDICATORS',
    indicators
});

// ## Async actions ##

export const getDashboardIndicators = userName => {

    return dispatch => {

        Promise.all([
            getUser(userName),
            getRepos(userName),
            getRepos(userName, TYPE_REPOS.Starred),
            getOpenedIssuesOrPrs(userName, TYPE_ISSUES.Issues),
            getOpenedIssuesOrPrs(userName, TYPE_ISSUES.PullRequests)
        ]).then(values => {

            const user = {
                name: userName,
                avatar: values[0].avatar
            };
            const indicators = {
                publicRepositories: values[1],
                starredRepositories: values[2],
                openedIssues: values[3],
                openedPullRequests: values[4]
            };

            dispatch(setUser(user));
            dispatch(setDashboardIndicators(indicators));

        }).then(error => {
            console.log(error);
        });
    }

};
