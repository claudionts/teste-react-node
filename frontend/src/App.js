import React from 'react';
import ReduxToastr from 'react-redux-toastr';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './routes';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <ReduxToastr />
        <Routes />
      </>
    </Provider>
  );
};

export default App;
