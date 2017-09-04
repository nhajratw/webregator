import React from 'react'
import PropTypes from 'prop-types'

// Components
import ViewWebmark from './buttons/ViewWebmark'
import DeleteWebmark from './buttons/DeleteWebmark'

//
import axios from 'axios';

// ** Webmark List
class WebmarkList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      webmarks: [],
      webmarkResults: [],
      csrfToken: document.getElementsByName("csrf-token")[0].content
    };

    this.deleteWebmark = this.deleteWebmark.bind(this);
  }
  componentDidMount() {
    var webmark = [];
    axios.get(`/webmarks.json`)
      .then(res => {
        const webmarks = res.data
        this.setState({ webmarks });
      });
  }
  deleteWebmark(event){
    event.preventDefault();
    // Api to delete
    axios({
      method: 'DELETE',
      params: {
        authenticity_token: this.state.csrfToken
      },
      url: "/webmarks/" + event.target.id
    })
      .then(function (response) {
        location.reload();
        //Going to add Redux or refactor component
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render(){
    return(
      <webmark-list>
          {this.state.webmarks.map(obj =>
            <webmark key={obj.id}>
            <site-name>{obj.url}</site-name>
            <ViewWebmark id={obj.id}/>
            <DeleteWebmark id={obj.id} onClick={this.deleteWebmark} /><br />
            </webmark>
          )}
      </webmark-list>
    );
  }
}
export default WebmarkList
