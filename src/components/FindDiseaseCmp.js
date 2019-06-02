import React from 'react';

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
    
    this.props.trackerContract.deployed().then((instance) => {
      return instance.diseases(parseInt(this.state.diseaseId, 10));
    }).then((disease) => {
      console.log("disease found");
      console.log(disease[2]);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <form id="frm1" action="/action_page.php">
              Disease ID: <input type="text" value={this.state.diseaseId} onChange={this.handleIdChange}/><br/><br/>
              <input className="btn btn-primary" onClick={this.handleSubmit} type="button" value="Find Disease" />
      </form>
      
    );
  }
}

export default FindDiseaseCmp;