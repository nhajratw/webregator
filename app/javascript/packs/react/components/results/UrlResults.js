import React from 'react'
import PropTypes from 'prop-types'

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

export default UrlResults
