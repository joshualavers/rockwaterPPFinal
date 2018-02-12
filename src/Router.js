import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
// import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
import ProductPage from './components/ProductPage';
// import { logoutUserSuccess } from './actions';
// import EmployeeList from './components/EmployeeList';
// import EmployeeCreate from './components/EmployeeCreate';
// import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="auth" initial titleStyle={{ alignSelf: 'center' }}>
          <Scene key="login" component={LoginForm} initial hideNavBar />
        </Scene>
        <Scene key="core">
          <Scene
            key="welcomePage"
            component={WelcomePage}
            title="Welcome"
            titleStyle={{ alignSelf: 'center' }}
            rightTitle="Log Out"
            onRight={() => {
              firebase.auth().signOut();
              Actions.auth({ type: 'reset' });
              Actions.login();
            }}
            initial
          />
          <Scene
            key="productPage"
            component={ProductPage}
            title="Products"
            titleStyle={{ alignSelf: 'center' }}
          />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
