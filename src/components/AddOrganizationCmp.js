import React from 'react';

class AddOrganizationCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgAddress: '',
      orgName: '',
      long: '',
      lat: ''
    };

    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLongChange = this.handleLongChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddressChange(event) {
    this.setState({
      orgAddress: event.target.value
    });
  }

  handleNameChange(event) {
    this.setState({
      orgName: event.target.value
    });
  }

  handleLongChange(event) {
    this.setState({
      long: event.target.value
    });
  }

  handleLatChange(event) {
    this.setState({
      lat: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.trackerContract.deployed().then((instance) => {
      return instance.addOrganization(this.state.orgAddress, this.state.orgName, this.state.long, this.state.lat, {from: this.props.account});
    }).then((organization) => {
      console.log("org added");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form id="frm1" action="/action_page.php">
              Organization Address: <input type="text" value={this.state.orgAddress} onChange={this.handleAddressChange}/><br/>
              Organization Name: <input type="text" value={this.state.orgName} onChange={this.handleNameChange} /><br/>
              Coordinate Longitude: <input type="text" value={this.state.long} onChange={this.handleLongChange} /><br/>
              Coordinate Latitude: <input type="text" value={this.state.lat} onChange={this.handleLatChange} /><br/><br/>
              <input className="btn btn-primary" onClick={this.handleSubmit} type="button" value="Add Organization" />
      </form>
      
    );
  }
}

export default AddOrganizationCmp;