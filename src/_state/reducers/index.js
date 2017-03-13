const initialState = {
    user: {
        name: ''
    },
    indicators: {
        publicRepositories: [],
        starredRepositories: [],
        openedIssues: 0,
        openedPullRequests: 0
    }
};

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_NAME':
            const user = { ...state.user };
            user.name = action.userName;
            return { ...state, user };
        case 'SET_USER':
            return { ...state, user: action.user };
        case 'SET_INDICATORS':
            return { ...state, indicators: action.indicators };
        default:
            return state;
    }
};
