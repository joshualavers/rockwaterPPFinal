import React from 'react';
import { Modal, Image } from 'react-native';
import { CardSection } from './CardSection';
// import { Button } from './Button';

const Confirm = ({ children, onAccept, onDecline, visible }, props) => {
  //const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
    <CardSection>
      <Image
      source={{ uri: props.uri, width: 300, height: 300 }}
      />
    </CardSection>
    </Modal>
  );
};

/* const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
}; */

export { Confirm };
