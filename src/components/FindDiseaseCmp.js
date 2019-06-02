import React from 'react';
import '../css/base.css'

class FindDiseaseCmp extends React.Component {
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
        console.log(trackerInstance);
        console.log(this.state.diseaseId);
      return instance.diseases(parseInt(this.state.diseaseId, 10));
    }).then((disease) => {
      console.log(disease, "disease");
      this.setState({
        diseaseName: disease[1]
      })
      return trackerInstance.organizations(disease[2]);
    }).then((organization) => {
      console.log(this.state.diseaseName);
      console.log(organization[2]);
      console.log(organization[3]);
      this.onCoorAdded(parseInt(organization[2], 10), parseInt(organization[3], 10))
    })
    .catch((err) => {
      console.log(err);
    })
  }

  onCoorAdded(long, lat) {
    this.props.onCoorAdded(long, lat)
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
            <p value={this.state.diseaseName}></p>
            <input className="btn btn-danger" onClick={this.handleSubmit} type="button" value="Locate Disease" />
      </form>
      
    );
  }
}

export default FindDiseaseCmp;