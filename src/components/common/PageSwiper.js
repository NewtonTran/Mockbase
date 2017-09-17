import React, { Component } from 'react';
import firebase from 'firebase';
import axios from 'axios';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Swiper from 'react-native-page-swiper';
import { Button, CardSection, CurrencyInput, Transaction, OpaqueCardSection, BalanceDisplay } from '.';

export class PageSwiper extends Component {
  state = {
    btc: '',
    eth: '',
    ltc: '',
    btcText: '',
    ethText: '',
    ltcText: '',
    cadBalance: '100000.00',
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
        price: '4042.56'
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
        price: '70.12'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'LTC',
        amount: '1',
        price: '70.12'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'ETH',
        amount: '1',
        price: '302.63'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'SELL',
        currency: 'BTC',
        amount: '1',
        price: '4426.70'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'SELL',
        currency: 'BTC',
        amount: '1',
        price: '4426.70'
      },
      {
        date: 'Sept. 16, 2017',
        transactionType: 'BUY',
        currency: 'ETH',
        amount: '1',
        price: '296.43'
      },
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

  onPressBuyBTC() {
    const value = (+this.state.btc) * (+this.state.btcText);
    const newCurrBalance = (+this.state.btcText) + (+this.state.btcBalance);
    let newCADBalance = (+this.state.cadBalance) - value;
    newCADBalance = newCADBalance.toFixed(2);
    this.updateTransactions(
      'Sept. 17, 2017', 'BUY', 'BTC', this.state.btcText, this.state.btc);
    this.setState({
      btcText: '',
      btcBalance: newCurrBalance,
      cadBalance: newCADBalance,
    });
  }

  onPressBuyETH() {
    const value = (+this.state.eth) * (+this.state.ethText);
    const newCurrBalance = (+this.state.ethText) + (+this.state.ethBalance);
    let newCADBalance = (+this.state.cadBalance) - value;
    newCADBalance = newCADBalance.toFixed(2);
    this.updateTransactions(
      'Sept. 17, 2017', 'BUY', 'ETH', this.state.ethText, this.state.eth);
    this.setState({
      ethText: '',
      ethBalance: newCurrBalance,
      cadBalance: newCADBalance
    });
  }

  onPressBuyLTC() {
    const value = (+this.state.ltc) * (+this.state.ltcText);
    const newCurrBalance = (+this.state.ltcText) + (+this.state.ltcBalance);
    let newCADBalance = (+this.state.cadBalance) - value;
    newCADBalance = newCADBalance.toFixed(2);
    this.updateTransactions(
      'Sept. 17, 2017', 'BUY', 'LTC', this.state.ethText, this.state.eth);
    this.setState({
      ltcText: '',
      ltcBalance: newCurrBalance,
      cadBalance: newCADBalance,
    });
  }

  onPressSellBTC() {
    const value = (+this.state.btc) * (+this.state.btcText);
    const newCurrBalance = (+this.state.btcBalance) - (+this.state.btcText);
    let newCADBalance = (+this.state.cadBalance) + value;
    newCADBalance = newCADBalance.toFixed(2);
    this.setState({ btcText: '', btcBalance: newCurrBalance, cadBalance: newCADBalance });
  }

  onPressSellETH() {
    const value = (+this.state.eth) * (+this.state.ethText);
    const newCurrBalance = (+this.state.ethbalance) - (+this.state.ethText);
    let newCADBalance = (+this.state.cadBalance) + value;
    newCADBalance = newCADBalance.toFixed(2);
    this.setState({ ethText: '', ethBalance: newCurrBalance, cadBalance: newCADBalance });
  }

  onPressSellLTC() {
    const value = (+this.state.ltc) * (+this.state.ltcText);
    const newCurrBalance = (+this.state.ltcBalance) - (+this.state.ltcText);
    let newCADBalance = (+this.state.cadBalance) + value;
    newCADBalance = newCADBalance.toFixed(2);
    this.setState({ ltcText: '', ltcBalance: newCurrBalance, cadBalance: newCADBalance });
  }

  updateTransactions(date, transactionType, currency, amount, price) {
    const newTransaction = { date, transactionType, currency, amount, price };
    return this.state.transactions.unshift(newTransaction);
  }

  renderTransactions() {
    return this.state.transactions.map(transaction => {
        const { date, transactionType, currency, amount, price } = transaction;
        console.log(transaction);
          if (transactionType === 'BUY') {
            return (
              <Transaction date={date}>
                Bought {amount} {currency} at price {price}.
              </Transaction>
            );
          }
          return (
            <Transaction date={date}>
              Sold {amount} {currency} at price {price}.
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
            <BalanceDisplay label='CAD' balance={this.state.cadBalance} />
          </CardSection>

          <CardSection>
            <BalanceDisplay label='BTC' balance={this.state.btcBalance} />
          </CardSection>

          <CardSection>
            <BalanceDisplay label='ETH' balance={this.state.ethBalance} />
          </CardSection>

          <CardSection>
            <BalanceDisplay label='LTC' balance={this.state.ltcBalance} />
          </CardSection>

          <Text style={styles.subHeader2TextStyle}>Manage</Text>

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
            <Button onPress={this.onPressBuyBTC.bind(this)}>
              Buy
            </Button>
            <Button onPress={this.onPressSellBTC.bind(this)}>
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
          <Button onPress={this.onPressBuyETH.bind(this)}>
            Buy
          </Button>
          <Button onPress={this.onPressSellETH.bind(this)}>
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
            <Button onPress={this.onPressBuyLTC.bind(this)}>
              Buy
            </Button>
            <Button onPress={this.onPressSellLTC.bind(this)}>
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
    fontSize: 20,
    color: '#37474f',
    fontWeight: 'bold'
  },

  subHeader2TextStyle: {
    alignSelf: 'flex-start',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingTop: 20,
    fontSize: 20,
    color: '#37474f',
    fontWeight: 'bold'
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
