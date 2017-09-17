import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import firebase from 'firebase';
import { Input, Button, Card, CardSection, Spinner, ImageCardSection } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loginLoading: false,
    accountLoading: false,
    creating: false
  };

  onLoginButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loginLoading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFailure.bind(this));
  }

  onCreateAccountButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', accountLoading: true });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onCreateAccountFailure.bind(this));
  }

  onForgotPasswordButtonPress() {

  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loginLoading: false,
      accountLoading: false
    });
  }

  onLoginFailure() {
    this.setState({ error: 'Authentication failed.', loginLoading: false, accountLoading: false });
  }

  onCreateAccountFailure() {
    this.setState({
      error: 'An account exists with this email.',
      loginLoading: false,
      accountLoading: false });
  }

  renderLoginButton() {
    if (this.state.loginLoading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  renderCreateAccountButton() {
    if (this.state.accountLoading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onCreateAccountButtonPress.bind(this)}>
        Create an account
      </Button>
    );
  }

  renderForgotPasswordButton() {
    return (
      <Button onPress={this.onForgotPasswordButtonPress.bind(this)}>
        Forgot your password?
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <ImageCardSection>
        <View style={styles.thumbnailContainerStyle}>
          <Image
          style={styles.imageStyle}
          source={require('../../resources/coin.png')}
          />
        </View>
        </ImageCardSection>

        <CardSection>
          <Input
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="example@example.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Enter Password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderCreateAccountButton()}
        </CardSection>

        <CardSection>
          {this.renderForgotPasswordButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  imageStyle: {
    paddingTop: 322,
    height: 322,
    flex: 1,
    width: 322,
    backgroundColor: '#37474f'
  },
  thumbnailContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default LoginForm;
