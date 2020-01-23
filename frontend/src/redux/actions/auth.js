export const auth = (payload) => ({ type: 'AUTH', payload });

export const fetchUser = (payload) => ({ type: 'FETCH_USER', payload });

export const getState = (payload) => ({ type: 'GET_STATE', payload });

export const getCurrentState = (payload) => ({ type: 'GET_CURRENT_STATE', payload });

export const showMessage = (payload) => ({ type: 'ERROR_MESSAGE_LOGIN', payload });