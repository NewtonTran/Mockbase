import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection, PageSwiper } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null, dashboard: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCAXHMtsUWjVhmPyPkAWRKmuboafSPPsvI',
      authDomain: 'authentication-53b44.firebaseapp.com',
      databaseURL: 'https://authentication-53b44.firebaseio.com',
      projectId: 'authentication-53b44',
      storageBucket: 'authentication-53b44.appspot.com',
      messagingSenderId: '1050448154548'
    });

    var database = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true, dashboard: true });
      } else {
        this.setState({ loggedIn: false, dashboard: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <PageSwiper />
          </View>
        );
      case false:
        return (
          <View>
            <Header headerText="Login to Mockbase!" />
            <LoginForm />
          </View>
        );
      default:
        return (
          <View>
            <Spinner />
          </View>
        );
    }
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return <PageSwiper />
      case false:
        return (
          <View>
            <Header headerText="Login to Mockbase!" />
            <LoginForm />
          </View>
        );
      default:
        return (
          <View>
            <Spinner />
          </View>
        );
    }
  }
}

export default App;
