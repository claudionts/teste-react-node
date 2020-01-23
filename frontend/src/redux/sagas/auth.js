import { put, call, takeLatest, all, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import api from '../../services/api';
import { push } from 'connected-react-router';

function loginAuth(email, password) {
  return new Promise((resolve, reject) => {
    api.post('/user/auth',
    { email,
      password
    }).then(res => resolve(res.data))
      .catch(err => {
        reject(err.response)
      });
  });
};

function* getUserLogin(action) {
  try {
    const { email, password } = action.payload;
    const { data, token } = yield call(loginAuth, email, password);
    localStorage.setItem('@TOKEN', token);
    yield put({ type: 'FETCH_USER', payload: { user: data, token } });
    yield put(push('/teste'));
  } catch (error) {
    yield put({ type: 'ERROR_MESSAGE_LOGIN', payload: { message: error.data.data.message } });
  }
};

function* showMessage(action) {
  yield toastr.error('Erro!', action.payload.message);
};

function* getCurrentState(action) {
  yield put({ type: 'GET_CURRENT_STATE', payload: select(state => state) })
};

export default function* root() {
  yield all([
    takeLatest('AUTH', getUserLogin),
    takeLatest('ERROR_MESSAGE_LOGIN', showMessage),
    takeLatest('GET_STATE', getCurrentState)
  ]);
}