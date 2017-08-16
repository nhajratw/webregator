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

// ** Webmark Form
class WebmarkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      results: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelResults = this.cancelResults.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({results: true});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  cancelResults(event) {
    event.preventDefault();
    this.setState({results: false});
  }
  saveUrl(event) {
    event.preventDefault();
    console.log('saver');
  }

  render(){
    let resultsState = this.state.results ? 'block' : 'hidden';
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" />
          <p>{this.state.value}</p>
        </form>
        <ResultWrapper
          class={resultsState}
          url={this.state.value}
          cancel={this.cancelResults}
          results=""
          saver={this.saveUrl}
        />
      </main>
    );
  }
}

function ResultWrapper(props){
  return (
    <webmark-dialog class={props.class}
        value={props.url}
        cancel={props.cancel}
        results={props.results}
        saver={props.saver}>
      <dialog-head>
        <SiteUrl url={props.url} />
        <CancelWebmark onClick={props.cancel} />
      </dialog-head>
      <UrlResults results={props.results}/>
      <ResultsSave saver={props.saver}/>
    </webmark-dialog>
  )
}

function SiteUrl(props){
  return <h1 id="site-url">{props.url}</h1>;
}
function CancelWebmark(props){
  return <button id="cancel" onClick={props.onClick}>CANCEL</button>
}
function UrlResults(props){
  return (
    <url-content results={props.results}>
      <p>Results will go here</p>
    </url-content>
  );
}
function ResultsSave(props) {
  return(
    <dialog-save>
      <button id="save" onClick={props.saver}>SAVE URL</button>
    </dialog-save>
  );
}

// ** Webmark List
class WebmarkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      webmarks: [],
      webmarkResults: []
    };
  }
  componentDidMount() {
    var webmark = [];
    axios.get(`/webmarks.json`)
      .then(res => {
        const webmarks = res.data
        this.setState({ webmarks });
      });
  }
  render(){
    return(
      <webmark-list>
          {this.state.webmarks.map(obj =>
            <webmark key={obj.id}>
            <site-name>{obj.url}</site-name>
            <ViewWebmark />
            <DeleteWebmark /><br />
            </webmark>
          )}
      </webmark-list>
    );
  }
}

// ** Webmark List Elements
class DeleteWebmark extends React.Component {
  render(){
    return(
      <button>Delete</button>
    );
  }
}

class ViewWebmark extends React.Component {
  render(){
    return(
      <button>View</button>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
})
