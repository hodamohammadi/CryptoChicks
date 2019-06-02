import React from 'react';

class AddDiseaseCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseId: 0,
      diseaseName: ''
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({
      diseaseId: event.target.value
    });
  }

  handleNameChange(event) {
    this.setState({
      diseaseName: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    this.props.trackerContract.deployed().then((instance) => {
      return instance.addDisease(parseInt(this.state.diseaseId, 10), this.state.diseaseName, {from: this.props.account});
    }).then((organization) => {
      console.log("disease added");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form id="frm1" action="/action_page.php">
              Disease ID: <input type="text" value={this.state.diseaseId} onChange={this.handleIdChange}/><br/>
              Disease Name: <input type="text" value={this.state.diseaseName} onChange={this.handleNameChange} /><br/><br/>
              <input className="btn btn-primary" onClick={this.handleSubmit} type="button" value="Add Disease" />
      </form>
      
    );
  }
}

export default AddDiseaseCmp;