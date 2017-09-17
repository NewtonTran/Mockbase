import axios from 'axios';

export default class CoinbaseClient {
  btc: '';
  eth: '';
  ltc: '';
  ethUrl: "https://api.coinbase.com/v2/prices/ETH-CAD/spot";
  ltcUrl: "https://api.coinbase.com/v2/prices/LTC-CAD/spot";

  constructor() {
    this.updatePrices();
  }

  updatePrices(callback) {
    axios.get('https://api.coinbase.com/v2/prices/BTC-CAD/spot')
      .then((btcResponse) => {
        this.btc = btcResponse.data.data.amount;
        axios.get('https://api.coinbase.com/v2/prices/ETH-CAD/spot')
          .then((ethResponse) => {
            this.eth = ethResponse.data.data.amount;
            axios.get('https://api.coinbase.com/v2/prices/LTC-CAD/spot')
              .then((ltcResponse) => {
                this.ltc = ltcResponse.data.data.amount;
                console.log(this.btc + this.eth + this.ltc);
                return callback(this.btc, this.eth, this.ltc);
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

  getBTCPrice() {
    return this.btc;
  }

  getETHPrice() {
    return this.eth;
  }

  getLTCPrice() {
    return this.ltc;
  }
}
