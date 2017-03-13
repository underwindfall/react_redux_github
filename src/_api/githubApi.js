import 'whatwg-fetch';
import { TOKEN } from './token';

const BASE_URL = 'https://api.github.com';
export const TRENDS_URL = 'https://github.com/trending';

export const TYPE_DATA = {
    Init: 'init',
    More: 'more'
};
export const TYPE_REPOS = {
    Public: 'public',
    Starred: 'starred'
};
export const TYPE_ISSUES = {
    Issues: 'issue',
    PullRequests: 'pr'
};

export let cache = {};
export const clearCache = () => {
    cache = {};
};

const parseLinks = linksHeader => {
    if (!linksHeader) return null;
    const result = {};
    linksHeader.split(',').forEach(link => {
        const match = /<(.*)>;\srel="(.*)"/gi.exec(link);
        if (match && match.length > 2) {
            result[match[2]] = match[1]
        }
    });
    return result;
};

const extractRepo = repo => {
    return {
        id: repo.id,
        name: repo.name,
        description: repo.description,
        language: repo.language,
        issues: repo.open_issues_count,
        stars: repo.stargazers_count,
        url: repo.html_url,
        owner: repo.owner.login,
        dates: {
            created: repo.created_at,
            updated: repo.updated_at
        }
    };
};

export const getUser = (name) => {
    return new Promise((resolve, reject) => {
        if (cache.user) {
            resolve(cache.user);
            return;
        }
        fetch(`${BASE_URL}/users/${name}?access_token=${TOKEN}`)
            .then(response => {
                return response.json();
            }).then(json => {
                const lightUser = {
                    name,
                    avatar: json.avatar_url
                };
                cache.user = lightUser;
                resolve(lightUser);
            }).catch(error => {
                reject(error);
            });
    });
};

export const getRepo = (repoOwner, repoName) => {
    return new Promise((resolve, reject) => {
        fetch(`${BASE_URL}/repos/${repoOwner}/${repoName}?access_token=${TOKEN}`)
            .then(response => {
                return response.json();
            })
            .then(json => resolve(extractRepo(json)))
            .catch(error => {
                reject(error);
            });
    });
};

export const findRepo = (owner, name, type) => {
    const repositories = cache[type];
    if (repositories && repositories.results) {
        const found = repositories.results.find(repo => {
            return repo.name === name;
        });
        if (found) {
            return new Promise(resolve => {
                resolve(found)
            });
        }
        else return getRepo(owner, name);
    }
    return getRepo(owner, name);
};

export const getRepos = (userName, type = TYPE_REPOS.Public, dataType = TYPE_DATA.Init) => {
    let links;
    return new Promise((resolve, reject) => {
        if (dataType === TYPE_DATA.Init && typeof cache[type] !== 'undefined') {
            resolve(cache[type]);
            return;
        }
        let url;
        if (dataType === TYPE_DATA.More && cache[type].links && cache[type].links.next) {
            url = cache[type].links.next;
        }
        else {
            if (type === TYPE_REPOS.Public) {
                url = `${BASE_URL}/users/${userName}/repos?access_token=${TOKEN}`;
            }
            else {
                url = `${BASE_URL}/users/${userName}/starred?access_token=${TOKEN}`
            }
        }
        fetch(url)
            .then(response => {
                links = parseLinks(response.headers.get('Link'));
                return response.json();
            }).then(json => {
                const results = json.map(repo => {
                    return extractRepo(repo);
                });
                cache[type] = {
                    results: cache[type] && cache[type].results ? cache[type].results.concat(results) : results,
                    links
                };
                resolve({results, links});
            }).catch(error => {
                reject(error);
            });
    });
};

export const getOpenedIssuesOrPrs = (userName, type = TYPE_ISSUES.Issues) => {
    return new Promise((resolve, reject) => {
        if (typeof cache[type] !== 'undefined') {
            resolve(cache[type]);
            return;
        }
        const url = `${BASE_URL}/search/issues?q=+type:${type}+user:${userName}+state:open&sort=updated&order=desc&access_token=${TOKEN}`
        fetch(url)
            .then(response => {
                return response.json();
            }).then(json => {
                const count = json.total_count;
                cache[type] = count;
                resolve(count);
            }).catch(error => {
                reject(error);
            });
        });
};
