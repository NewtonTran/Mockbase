import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Swiper from 'react-native-page-swiper';
import { Button, CardSection, CurrencyInput, Transaction } from '.';

export class PageSwiper extends Component {
  state = {
    btc: '',
    eth: '',
    ltc: '',
    btcText: '',
    ethText: '',
    ltcText: '',
    cadBalance: '10000.00',
    btcBalance: '0',
    ethBalance: '0',
    ltcBalance: '0',
    selectedCurrency: '',
    transactionType: '',
    transactions: [
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'BTC',
        amount: '5',
        price: '21320.56'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'SELL',
        currency: 'ETH',
        amount: '1',
        price: '306.70'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '69.17'
      }
    ],
    stockData: [
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      },
      {
        "x": 18,
        "y": 153227
      }
    ]
  };

  componentWillMount() {
    axios.get('https://api.coinbase.com/v2/prices/BTC-CAD/spot')
      .then((btcResponse) => {
        axios.get('https://api.coinbase.com/v2/prices/ETH-CAD/spot')
          .then((ethResponse) => {
            axios.get('https://api.coinbase.com/v2/prices/LTC-CAD/spot')
              .then((ltcResponse) => {
                this.setState({
                  btc: btcResponse.data.data.amount,
                  eth: ethResponse.data.data.amount,
                  ltc: ltcResponse.data.data.amount
                });
              })
              .catch((ltcError) => {
                console.log(ltcError);
              });
          })
          .catch((ethError) => {
            console.log(ethError);
          });
      })
      .catch((btcError) => {
        console.log(btcError);
      });
  }
  //
  // onPressBuy(currency) {
  //   this.setState({});
  // }
  //
  // onPressSell(currency) {
  //   this.setState({});
  // }

  renderTransactions() {
    return this.state.transactions.map(transaction => {
        const { date, transactionType, currency, amount, price } = transaction;
        return (
          <Transaction date={date}>
            {transactionType}, {currency}, {amount}, {price}
          </Transaction>
        );
      }
    );
  }

  render() {
    return (
      <Swiper style={styles.wrapper}>
        <View style={styles.profile}>
          <Text style={styles.headerTextStyle}>Profile</Text>

          <Text style={styles.subHeaderTextStyle}>Balances</Text>

          <CardSection>
            <Text style={styles.balanceStyle}>CAD: {this.state.cadBalance}</Text>
          </CardSection>

          <CardSection>
            <Text style={styles.balanceStyle}>BTC: {this.state.btcBalance}</Text>
          </CardSection>

          <CardSection>
            <Text style={styles.balanceStyle}>ETH: {this.state.ethBalance}</Text>
          </CardSection>

          <CardSection>
            <Text style={styles.lastBalanceStyle}>LTC: {this.state.ltcBalance}</Text>
          </CardSection>

          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Manage Profiles
            </Button>
          </CardSection>
        </View>
          <View style={styles.btcStyle}>
          <Text style={styles.headerTextStyle}>BTC</Text>
          <Text style={styles.priceTextStyle}>${this.state.btc}</Text>
          <CardSection>
            <CurrencyInput
              label="BTC"
              value={this.state.btcText}
              onChangeText={btcText => this.setState({ btcText })}
              placeholder="Enter BTC amount"
            />
          </CardSection>
          <CardSection>
          <Button>
              Buy
            </Button>
            <Button>
              Sell
            </Button>
          </CardSection>
        </View>
          <View style={styles.ethStyle}>
          <Text style={styles.headerTextStyle}>ETH</Text>
          <Text style={styles.priceTextStyle}>${this.state.eth}</Text>
          <CardSection>
          <CurrencyInput
            label="ETH"
            value={this.state.ethText}
            onChangeText={ethText => this.setState({ ethText })}
            placeholder="Enter ETH amount"
          />
          </CardSection>
          <CardSection>
          <Button>
            Buy
          </Button>
          <Button>
            Sell
          </Button>
          </CardSection>
        </View>
          <View style={styles.ltcStyle}>
          <Text style={styles.headerTextStyle}>LTC</Text>
          <Text style={styles.priceTextStyle}>${this.state.ltc}</Text>
          <CardSection>
            <CurrencyInput
              label="LTC"
              value={this.state.ltcText}
              onChangeText={ltcText => this.setState({ ltcText })}
              placeholder="Enter LTC amount"
            />
          </CardSection>
          <CardSection>
            <Button>
              Buy
            </Button>
            <Button>
              Sell
            </Button>
          </CardSection>
        </View>
        <View style={styles.transactionsStyle}>
          <Text style={styles.headerTextStyle}>  Transactions</Text>
          <ScrollView>
            {this.renderTransactions()}
          </ScrollView>
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },

  profile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc02d',
  },

  btcStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc02d',
  },

  ethStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc02d',
  },

  ltcStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc02d',
  },

  logOutStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbc02d',
  },

  priceTextStyle: {
    paddingBottom: 20,
    color: '#37474f',
    fontSize: 30
  },

  subHeaderTextStyle: {
    alignSelf: 'flex-start',
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: '#37474f'
  },

  headerTextStyle: {
    paddingBottom: 40,
    color: '#37474f',
    fontSize: 30,
    fontWeight: 'bold',
  },

  balanceStyle: {
    color: '#37474f',
    fontSize: 20
  },

  lastBalanceStyle: {
    paddingBottom: 60,
    color: '#37474f',
    fontSize: 20
  },

  scrollViewStyle: {
    paddingBottom: 20
  },

  transactionsStyle: {
    paddingTop: 40,
    justifyContent: 'space-between',
    backgroundColor: '#fbc02d'
  }
});
