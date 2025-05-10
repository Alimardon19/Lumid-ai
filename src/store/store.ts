import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga.ts';
import rootReducer from './root-reducer.ts';

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;