import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as toastrReducer } from 'react-redux-toastr';

import rootSaga from './../redux/sagas/auth';
import auth from './reducers/auth';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    auth,
    toastr: toastrReducer
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;