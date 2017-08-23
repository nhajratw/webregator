import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

// HTTP Library
import axios from 'axios';
import lodash from 'lodash'

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
      loadError: null,
      dataResults:[],
      csrfToken: document.getElementsByName("csrf-token")[0].content
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelResults = this.cancelResults.bind(this);
    this.cancelErrorInput = this.cancelErrorInput.bind(this);
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
      }).catch(res => {
        console.log("error loading!", res);
        this.setState({loadError: true});
      });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  cancelResults(event) {
    event.preventDefault();
    this.setState({results: false});
    this.state.value = '';
  }
  cancelErrorInput(event){
    event.preventDefault();
    this.setState({loadError: null});
    this.state.value = '';
  }
  saveUrl(event) {
    event.preventDefault();
    let htags = [];
    let atags = [];
    _.forEach(this.state.dataResults.htags, function(value) {
      htags.push('<h3>' + value.content + '</h3>')
    });
    _.forEach(this.state.dataResults.atags, function(value) {
      atags.push('<a href="' + value.a_link + '">' + value.a_link +'</a><br>')
    });
    let combo = _.concat(htags,atags);
    let urlContent = _.join(combo, '');

    // Api to save
    axios({
      method: 'POST',
      params: {
        authenticity_token: this.state.csrfToken
      },
      url: "/webmarks.json",
      data: {
        url: this.state.value,
        content: urlContent
      }
    })
      .then(function (response) {
        location.reload();
        // Going to add Redux or refactor component
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render(){
    // Info
    let infoControl = (this.state.value.length>=1) ? <p>{this.state.value}</p> : <Instructions />;
    // Validations
    let $validUrl = this.state.value.match('^(http|https)://');
    let $validClass = $validUrl ? 'hidden' : 'error';
    let $validData = this.state.loadError ? 'block' : 'hidden';

    // Load Error
    let loadError = (
      <webmark-dialog class={$validData}>
        <dialog-head>
          <CancelWebmark onClick={this.cancelErrorInput} />
        </dialog-head>
        <ValidationMessage error="loadError" url={this.state.value} />
      </webmark-dialog>
    );

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
    let resultsState = (this.state.results && !this.state.loadError) ? renderResults : loadError;

    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          <input type="url" value={this.state.value} onChange={this.handleChange} required/>
          <input type="submit" />
          {infoControl}
          <ValidationMessage error="linkFormat" url={this.state.value} class={$validClass} />
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

function Instructions(props){

  return (
    <instructions>
      <p className="instructions">Enter a link</p>
    </instructions>

  );
}

function ValidationMessage(props){
  let linkFormat = (<p className="error">Enter a valid link starting with http or https</p>);
  let loadError = (<error-url style={{color:'red'}}>
        <p>Sorry, an error occured while loading the url!</p>
        Check out the entered url: <a href={props.url} target="_blank">{props.url}</a>
      </error-url>);
  let error = {
    linkFormat,
    loadError
  }

  let errorInput = props.error;
  let errorMessage = null;
  switch(errorInput) {
    case "linkFormat":
        errorMessage = error.linkFormat;
        break;
    case "loadError":
        errorMessage = error.loadError;
        break;
  }

  return (
    <error className={props.class}>
        {errorMessage}
    </error>
  );
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
            <ViewWebmark id={obj.id}/>
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

function ViewWebmark(props) {
    let webmarks = 'webmarks/'
    return(
      <a href={webmarks + props.id} target="_blank"><button>View</button></a>
    );
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
})
