import React from 'react'
import PropTypes from 'prop-types'

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

export default ValidationMessage
