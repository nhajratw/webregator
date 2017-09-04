import React from 'react'
import PropTypes from 'prop-types'

// Components
import Instructions from './information/Instructions'
import CancelWebmark from './buttons/CancelWebmark'
import ValidationMessage from './validation'
import ResultWrapper from './results'

import axios from 'axios';

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
    let infoControl = (this.state.value.length>=1) ? <p>{this.state.value}</p> : <Instructions dialog="Enter a link"/>;
    // Validations
    let $validUrl = this.state.value.match('^(http|https)://');
    let $validClass = ($validUrl || this.state.value.length==0) ? 'hidden' : 'error';
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

export default WebmarkForm
