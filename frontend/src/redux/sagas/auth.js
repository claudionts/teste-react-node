import { put, call, takeLatest, all } from 'redux-saga/effects';
import api from '../../services/api';
import { toastr } from 'react-redux-toastr';

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
    yield put({ type: 'FETCH_USER', payload: { user: data, token } });
  } catch (error) {
    yield put({ type: 'ERROR_MESSAGE_LOGIN', payload: { message: error.data.data.message } });
  }
};

function* showMessage(action) {
  yield toastr.error('Erro!', action.payload.message);
};

export default function* root() {
  yield all([
    takeLatest('AUTH', getUserLogin),
    takeLatest('ERROR_MESSAGE_LOGIN', showMessage)
  ]);
}