import React, {Component} from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import Intro from './Intro'
import Lottery from './Lottery'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      web3: undefined,
      account: '', 
      lottery: undefined,
      numOfPlayers: 0,
      threshold: 11,
      winner: '',
    };
    this.initWeb3 = this.initWeb3.bind(this);
  }

  componentWillMount() {
    this.initWeb3();
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
    this.setState({
      web3Provider: App.web3Provider
    })
    const account = await web3.eth.getCoinbase();
    this.setState({ 
      account: account,
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
        <Intro/>
        <Lottery 
          web3Provider={this.state.web3Provider}
          account={this.state.account} 
          winner={this.state.winner}/>
        <footer className="App-footer"><small>&copy; Copyright 2019, Myse1f</small></footer>
      </div>
    );
  }
}

export default App;
