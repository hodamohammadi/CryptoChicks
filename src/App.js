import React, { Component } from 'react'
import _ from 'lodash';
import DiseaseTrackerContract from '../build/contracts/DiseaseTracker.json'
import getWeb3 from './utils/getWeb3'
import AddOrganizationCmp from './components/AddOrganizationCmp.js'
import AddDiseaseCmp from './components/AddDiseaseCmp.js'
import ReportDiseaseCmp from './components/ReportDiseaseCmp.js'
import FindDiseaseCmp from './components/FindDiseaseCmp.js'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

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

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-push-2">
              <h1 className="text-center">Disease Tracker</h1>
              <hr/><br/>

              <ReportDiseaseCmp trackerContract={this.state.trackerContract} account={this.state.account} />

              <hr/>

              <FindDiseaseCmp trackerContract={this.state.trackerContract} account={this.state.account} />

              <br /><br /><br />

                <hr/>

                <AddDiseaseCmp trackerContract={this.state.trackerContract} account={this.state.account} />
    
              <hr/>

              <AddOrganizationCmp trackerContract={this.state.trackerContract} account={this.state.account} />

              

  

            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

export default App
