import React from 'react';
import { Text } from 'react-native';
import { OpaqueCardSection } from '.';

const Transaction = ({ date, children }) => {
  return (
    <OpaqueCardSection>
      <Text>{date}</Text>
      <Text style={styles.textStyle}>{children}</Text>
    </OpaqueCardSection>
  );
};

const styles = {
  textStyle: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
    color: '#000',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '##fff',
    marginLeft: 5,
    marginRight: 5
  },
  dateTextStyle: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5
  }
};

export { Transaction };
