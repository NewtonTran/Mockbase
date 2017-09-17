import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
      />
    </View>
  );
};

const CurrencyInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.currencyLabelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={styles.currencyInputStyle}
        keyboardType='numeric'
      />
    </View>
  );
};

const BalanceDisplay = ({ label, balance }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.balanceStyleLabel}>{label}</Text>
      <Text style={styles.balanceStyle}>{balance}</Text>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#fbc02d',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  currencyInputStyle: {
    color: '#37474f',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 10,
    flex: 1,
    color: '#fbc02d'
  },
  currencyLabelStyle: {
    fontSize: 18,
    paddingLeft: 10,
    flex: 1,
    color: '#37474f'
  },
  balanceStyleLabel: {
    fontSize: 18,
    paddingLeft: 10,
    flex: 1,
    color: '#37474f',
    backgroundColor: '#FFF',
    lineHeight: 40,
    fontWeight: 'bold'
  },
  balanceStyle: {
    color: '#37474f',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 40,
    flex: 2,
    backgroundColor: '#fff'
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input, CurrencyInput, BalanceDisplay };
