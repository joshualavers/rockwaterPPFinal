import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Image } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { Actions } from 'react-native-router-flux';
import { Card } from './common';
import { userFetch, productFetch } from '../actions';


class WelcomePage extends Component {
  async componentWillMount() {
    await this.props.userFetch();
    await this.props.productFetch();
  }

  render() {
    console.log('THIS.PROPS: ', this.props);
    console.log('PRODUCT NAME: ', this.props.ProductName);

    return (
      <Card style={styles.cardStyle}>
          <Image
          source={require('../images/puffin.png')}
          />
          <Text style={styles.textStyle}>Welcome back,</Text>
          <Text style={styles.textStyle}>{this.props.user}</Text>
          <RaisedTextButton
          title='Place Order'
          color='#66ff99'
          style={{ marginTop: 100 }}
          onPress={() => { Actions.core({ type: 'reset' }); Actions.productPage(); }}
          />
      </Card>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 24,
    color: '#000'
  },
  cardStyle: {
    paddingTop: 250,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

const mapStateToProps = state => {
  const { users } = state;
  return { user: users.Name, ProductName: users.ProductName };
};

export default connect(mapStateToProps, { userFetch, productFetch })(WelcomePage);
