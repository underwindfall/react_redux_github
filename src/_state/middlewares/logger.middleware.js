/**
 * Logger middleware.
 * @returns {function({dispatch: *, getState?: *}): function(*): function(*=)}
 */
export const createLoggerMiddleware = () => {
    return ({ dispatch, getState }) => next => action => {
        console.log('Logger middleware action', action);
        const result = next(action);
        console.log('Logger middleware result state', getState());
        return result;
    };
};