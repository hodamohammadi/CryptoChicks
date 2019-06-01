import React, { Component } from 'react'
import _ from 'lodash';
import DiseaseTrackerContract from '../build/contracts/DiseaseTracker.json'
import getWeb3 from './utils/getWeb3'
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: {},
      adoptionContract: null,
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      }, () => {
        this.instantiateContract();
      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const adoption = contract(DiseaseTrackerContract);
    adoption.setProvider(this.state.web3.currentProvider)

    adoption.deployed().then((instance) => {
      console.log(instance);
      this.setState({
        adoptionContract: adoption
      });
      this.adoptPet();
    });
  }

  adoptPet() {
    const { adoptionContract } = this.state;

    this.state.web3.eth.getAccounts((error, accounts) => {
      adoptionContract.deployed().then((instance) => {
        console.log(instance);
        return instance.organizations('0');
      }).then(function(organization) {
        console.log(organization[1]);
      })
      .catch((err) => {
        console.log(err.message);
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

              <form id="frm1" action="/action_page.php">
              Organization Address: <input type="text" id="organizationAddress" /><br/>
              Organization Name: <input type="text" id="organizationName" /><br/><br/>
              <input className="btn btn-primary" type="button" value="Add Organization" />
              </form>

              <hr/>

              <form id="frm1" action="/action_page.php">
                Disease ID: <input type="text" id="diseaseId"/><br/>
                Disease Name: <input type="text" id="diseaseName"/><br/><br/>
                <input className="btn btn-primary" type="button" value="Add Disease"/>
              </form>

            </div>
          </div>
        
        </div>
      </div>
    );
  }
}

export default App
