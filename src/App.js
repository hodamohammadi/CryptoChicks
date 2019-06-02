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
import Map from "./components/Map.js";
import places from "./places.json";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: {},
      web3Provider: null,
      tackerContract: null,
      account: '0x0',
      long: 0,
      lat: 0
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

  onCoorAdded = (longPassed, latPassed) => {
    this.setState({
      long: longPassed,
      lat: latPassed
    })
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
            <div className="inner-content">
              <Switch>
                <Route 
                  path="/" 
                  exact 
                  render={props => <Tracker trackerContract={trackerContract} account={account } onCoorAdded={this.onCoorAdded} />}
                />
                <Route 
                  path="/register/" 
                  render={props => <Registration trackerContract={this.state.trackerContract} account={this.state.account} />}
                />
              </Switch>

              <div className="map-container">
                <Map
                  center={{ lat: 40.6451594, lng: -74.0850826 }}
                  zoom={10}
                  places={places}
                  long={this.state.long}
                  lat={this.state.lat}
                />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
