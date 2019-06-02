import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import _ from 'lodash';
import DiseaseTrackerContract from '../build/contracts/DiseaseTracker.json'
import getWeb3 from './utils/getWeb3'
import Registration from './components/Registration.js'
import Tracker from './components/Tracker.js'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import './css/base.css'
import './'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: {},
      web3Provider: null,
      tackerContract: null,
      account: '0x0'
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      }, () => {
        this.state.web3.currentProvider.enable();
      
        this.instantiateContract();
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract');
    const adoption = contract(DiseaseTrackerContract);
    const { web3 } = this.state;
    adoption.setProvider(this.state.web3.currentProvider);

    adoption.deployed().then((instance) => {
      console.log(instance);
      this.setState({
        trackerContract: adoption
      });
      return;
    }).then(() => {
      web3.eth.getAccounts((error, accounts) => {
        this.setState({
          account: accounts[0]
        });
      })
    });
  }

  render() {

    const { trackerContract, account } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <div className="app__container">
            <h1>Disease Tracker</h1>
            <div className="navigation">
              <Link className="btn btn-primary" to="/">Track</Link>
              <Link className="btn btn-primary" to="/register">Register</Link>
            </div>
            <Switch>
              <Route 
                path="/" 
                exact 
                render={props => <Tracker trackerContract={trackerContract} account={account}/>}
              />
              <Route 
                path="/register/" 
                render={props => <Registration trackerContract={this.state.trackerContract} account={this.state.account} />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
