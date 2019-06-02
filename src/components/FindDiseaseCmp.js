import React from 'react';
import '../css/base.css'

class FindDiseaseCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseId: 0

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
      console.log(disease);
      return trackerInstance.organizations(disease[2]);
    }).then((organization) => {
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
              <span>Disease ID:</span>
              <input type="text" value={this.state.diseaseId} onChange={this.handleIdChange}/>
            </div>
            <input className="btn btn-primary" onClick={this.handleSubmit} type="button" value="Locate Disease" />
      </form>
      
    );
  }
}

export default FindDiseaseCmp;