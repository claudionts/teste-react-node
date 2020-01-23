import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createSagaMiddleware from 'redux-saga';
// import history from '../routes/history';
import rootSaga from './../redux/sagas/auth';
import auth from './reducers/auth';
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    auth,
    toastr: toastrReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export default store;