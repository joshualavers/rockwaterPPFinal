import firebase from 'firebase';
import {
  USER_FETCH_SUCCESS,
  PRODUCT_FETCH_SUCCESS
} from './types';

export const userFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
        console.log('snapshot: ', snapshot);
        dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const productFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    const newArr = [];
  firebase.database().ref(`/users/${currentUser.uid}/Products`)
    .on('value', snapshot => {
      console.log('snapshot: ', snapshot);
      snapshot.forEach(productSnapshot => {
        console.log('productSnapshot: ', productSnapshot);
        const productKey = productSnapshot.key;
        const productName = productSnapshot.child('ProductName');
        const imageURL = productSnapshot.child('imageURL');
        const id = productSnapshot.child('id');
        const newObj = {
          key: productKey,
          name: productName.val(),
          imageURL: imageURL.val(),
          id: id.val(),
          value: 0
        };
        newArr.push(newObj);
        console.log(productKey);
        console.log(productName.val());
        console.log(productSnapshot.val());
      });
      console.log('newArr before dispatch: ', newArr);
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: newArr });
    });
  };
};
