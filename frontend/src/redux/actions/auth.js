export const auth = (auth) => {
  return {
    type: 'AUTH',
    payload: { ...auth },
  };
};

export const fetchUser = (payload) => {
  return { type: 'FETCH_USER', payload: { ...payload } };
};

export const showMessage = (payload) => {
  return { type: 'ERROR_MESSAGE_LOGIN', payload: { ...payload } };
};