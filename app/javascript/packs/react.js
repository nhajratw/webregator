import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// HTTP Library
import axios from 'axios';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log('this', this);
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  componentDidMount() {
    axios.get(`/webmarks.json`)
      .then(res => {
        console.log(res.data, "Data with axios");
      });
  }

  render() {
    return (
      <dashboard style={{textAlign: 'center'}}>
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
          <p>{this.state.value}</p>
      </form>

      </dashboard>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
})
