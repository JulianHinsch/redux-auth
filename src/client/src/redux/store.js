import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer.js';
import { createLogger } from 'redux-logger';

import authMiddleware from './middleware/feature/auth.middleware';

import actionSplitterMiddleware from './middleware/core/actionSplitter.middleware';
import apiMiddleware from './middleware/core/api.middleware';
import redirectMiddleware from './middleware/core/redirect.middleware';

const featureMiddleware = [
    authMiddleware,
]

const coreMiddleware = [
    apiMiddleware,
    redirectMiddleware,
    actionSplitterMiddleware, //this should really be first core but it throws errors  
    createLogger({ collapsed: true }),
]

export default () => {
    return createStore(rootReducer, applyMiddleware(...featureMiddleware, ...coreMiddleware));
}
