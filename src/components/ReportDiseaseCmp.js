import React from 'react';
import '../css/base.css'

class ReportDiseaseCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseId: 0,
      diseaseName: ""
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({
      diseaseId: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    var trackerInstance;
    this.props.trackerContract.deployed().then((instance) => {
      trackerInstance = instance;
      return instance.reportDisease(parseInt(this.state.diseaseId, 10), {from: this.props.account});
    }).then(() => {
      return trackerInstance.diseases(this.state.diseaseId);
    }).then((disease) => {
      this.setState({
        diseaseName: disease[1]
      })
      
      return trackerInstance.organizations(this.props.account);
    }).then((org) => {
      alert("A case of " +  this.state.diseaseName + " has been reported at " + org[1]);
    })
    .catch((err) => {
      console.log(err);
      alert("You are not a verified organization");
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
              <input type="text" />
            </div>
            <input className="btn btn-danger" onClick={this.handleSubmit} type="button" value="Report Disease" />
      </form>
      
    );
  }
}

export default ReportDiseaseCmp;