import React, {Component} from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Web3 from 'web3';

class App extends Component {
  constructor(props) {
    super(props);
    this.setState({
      web3: undefined
    })
    this.initWeb3 = this.initWeb3.bind(this);
  }

  componentDidMount() {
    window.addEventListener('load', this.initWeb3);
  }

  async initWeb3() {
        // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    this.setState({
      web3: new Web3(App.web3Provider)
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
