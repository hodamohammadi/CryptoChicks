import React from 'react';
import '../css/base.css'

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
    }).then(() => {
      console.log("disease added");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form id="frm1" action="/action_page.php">
            <div className="input">
                <span>Virus ID:</span>
                <input type="text" value={this.state.diseaseId} onChange={this.handleIdChange}/>
            </div>
            <div className="input">
                <span>Virus Name:</span>
                <input type="text" value={this.state.diseaseName} onChange={this.handleNameChange} />
            </div>
            <input className="btn btn-danger" onClick={this.handleSubmit} type="button" value="Add Disease" />
      </form>
      
    );
  }
}

export default AddDiseaseCmp;