import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// HTTP Library
import axios from 'axios';

// Webmark Dashboard Component
class Dashboard extends React.Component {
  render(){
    return(
      <dashboard style={{textAlign: 'center'}}>
        <WebmarkForm />
        <WebmarkList />
      </dashboard>
    );
  }
}

class WebmarkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({results: true});
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
          <p>{this.state.value}</p>
          <WebmarkResults />
      </form>
    );
  }
}

class WebmarkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      webmarks: []
    };
  }
  componentDidMount() {
    axios.get(`/webmarks.json`)
      .then(res => {
        console.log(res.data, "Data with axios");
      });
  }
  render(){
    return(
      <webmark-list>
        <p>Webmark List</p>
      </webmark-list>
    );
  }
}

// Webmark Results Component
class WebmarkResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: false
    };
  }

  render(){
      return (
        <webmark-dialog class={this.state.display ? 'block' : 'hidden'}>
            <ResultsMenu/>
        </webmark-dialog>
      );
  }
}

class ResultsMenu extends React.Component {
  render(){
    return(
      <dialog-head>
      <h1 id="site-url">Site Url</h1>
      <button id="cancel" type="button" name="button">CANCEL</button>
      </dialog-head>
    );
  }
}

class ResultsSection extends React.Component {
  render(){
    return(
      <url-content>
      </url-content>
    );
  }
}

class ResultsListing extends React.Component {
  render(){
    return(
      <p>
        List of results
      </p>
    );
  }
}

class ResultsSave extends React.Component {
  render(){
    return(
      <dialog-save>
        <button id="save">SAVE URL</button>
      </dialog-save>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
})
