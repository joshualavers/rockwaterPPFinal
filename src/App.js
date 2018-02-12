import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDTTRV-QWzgmsrQCtmtFEWc9NpctDSd-98',
      authDomain: 'rockwater-1504875268456.firebaseapp.com',
      databaseURL: 'https://rockwater-1504875268456.firebaseio.com',
      projectId: 'rockwater-1504875268456',
      storageBucket: 'rockwater-1504875268456.appspot.com',
      messagingSenderId: '221546554125'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
          <Router />
      </Provider>
    );
  }
}

export default App;
