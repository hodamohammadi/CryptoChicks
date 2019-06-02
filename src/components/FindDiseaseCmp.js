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
      return instance.diseases(parseInt(this.state.diseaseId, 10));
    }).then((disease) => {
        // for(var i = 0; i < disease[2].length(); i++) {
        //     trackerInstance.organizations((disease[2])[i]).then((org) => {
        //         console.log("long " + org[2] + " lat " + org[3]);
        //     })
        // }
    })
    .catch((err) => {
      console.log(err);
    })
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