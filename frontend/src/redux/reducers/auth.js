const INITIAL_STATE = {
  user: {},
  isAuth: false,
  message: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH':
      return { ...state };
    case 'FETCH_USER':
      return { ...state, user: action.payload.user, isAuth: true };
    case 'ERROR_MESSAGE_LOGIN':
      return { ...state, isAuth: false, message: action.payload.message };
    default:
      return state;
  }
}