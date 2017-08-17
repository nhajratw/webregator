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
      results: false,
      dataResults:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelResults = this.cancelResults.bind(this);
    this.saveUrl = this.saveUrl.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get('/indexer.json', {
        params: {
          wm_url: this.state.value
        }
      })
      .then(res => {
        this.setState({ dataResults: res.data });
        this.setState({results: true});
      });
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
    let dataResults = this.state.dataResults;
    let renderResults = (
      <ResultWrapper
        url={this.state.value}
        cancel={this.cancelResults}
        atags={dataResults.atags}
        htags={dataResults.htags}
        saver={this.saveUrl}
      />
    );
    let resultsState = this.state.results ? renderResults : <no-results></no-results>

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" />
          <p>{this.state.value}</p>
        </form>
        {resultsState}
      </main>
    );
  }
}

function ResultWrapper(props){
  return (
    <webmark-dialog
        value={props.url}
        cancel={props.cancel}
        results={props.results}
        saver={props.saver}>
      <dialog-head>
        <SiteUrl url={props.url} />
        <CancelWebmark onClick={props.cancel} />
      </dialog-head>
      <UrlResults htags={props.htags} atags={props.atags}/>
      <ResultsSave saver={props.saver}/>
    </webmark-dialog>
  )
}

function SiteUrl(props){
  return <h1 id="site-url">{props.url.substring(0,20)}{(props.url.length>20) ? '...': ''}</h1>;
}
function CancelWebmark(props){
  return <button id="cancel" onClick={props.onClick}>CANCEL</button>
}
function UrlResults(props){
    return (
      <url-content atags={props.atags} htags={props.htags}>
      {props.htags.map(obj =>
        <h3 key={obj.id}>{obj.content}</h3>
      )}
      {props.atags.map(obj =>
        <p key={obj.id}><a href={obj.a_link} target="_blank">{obj.a_link}</a></p>
      )}

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
