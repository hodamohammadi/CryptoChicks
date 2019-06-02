import React from 'react';

class ReportDiseaseCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diseaseId: 0,
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
    
    this.props.trackerContract.deployed().then((instance) => {
      return instance.reportDisease(parseInt(this.state.diseaseId, 10), {from: this.props.account});
    }).then(() => {
      console.log("disease reported");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form id="frm1" action="/action_page.php">
              Disease ID: <input type="text" value={this.state.diseaseId} onChange={this.handleIdChange}/><br/>
              <input className="btn btn-primary" onClick={this.handleSubmit} type="button" value="Report Disease" />
      </form>
      
    );
  }
}

export default ReportDiseaseCmp;