import React, {Component} from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TruffleContract from '@truffle/contract'
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      web3: undefined,
      account: '', 
      contract: ''
    };
    this.initWeb3 = this.initWeb3.bind(this);
    this.initContract = this.initContract.bind(this);
  }

  componentWillMount() {
    this.initWeb3();
    this.initContract();
  }

  async initWeb3() {
    // // Modern dapp browsers...
    // if (window.ethesreum) {
    //   App.web3Provider = window.ethereum;
    //   try {
    //     // Request account access
    //     window.ethereum.enable();
    //   } catch (error) {
    //     // User denied account access...
    //     console.error("User denied account access")
    //     alert("You denied account access")
    //   }
    // }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   App.web3Provider = window.web3.currentProvider;
    // }
    // // If no injected web3 instance is detected, fall back to Ganache
    // else {
    //   App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    // }

    // for dev
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');

    const web3 = new Web3(App.web3Provider);
    const account = await web3.eth.getCoinbase();
    this.setState({ 
      account: account,
      web3: web3
    });
  }

  async initContract() {
    var contract = TruffleContract({
      abi: [{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"settlementBlockNumber","type":"uint256"}],"name":"Drawing","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"}],"name":"Drawn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"player","type":"address"}],"name":"Play","type":"event"},{"constant":true,"inputs":[],"name":"THRESHOLD","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"settlementBlockNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"draw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],
    });
    contract.setProvider(App.web3Provider);
    const lottery = await contract.at("0x0956657C6c9Eb916cF54288131b30BF4AD69aDab");
    this.setState({
      lottery: lottery
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Lottery Game 
          </p>
        </header>
        
        <footer><small>&copy; Copyright 2019, Myse1f</small></footer>
      </div>
    );
  }
}

export default App;
