import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const ImageCardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const OpaqueCardSection = (props) => {
  return (
    <View style={styles.opaqueContainerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'transparent',
    position: 'relative'
  },
  opaqueContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#000',
    position: 'relative'
  },
  imageContainerStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderColor: 'transparent',
    position: 'center'
  }
};

export { ImageCardSection, OpaqueCardSection, CardSection };
