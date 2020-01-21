const INITIAL_STATE = {
  user: {},
  token: '',
  isAuth: false,
  message: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH':
      return { ...state };
    case 'FETCH_USER':
      return { ...state, user: action.payload.user, token: action.payload.token, isAuth: true };
    case 'ERROR_MESSAGE_LOGIN':
      return { ...state, isAuth: false, message: action.payload.message };
    default:
      return state;
  }
}