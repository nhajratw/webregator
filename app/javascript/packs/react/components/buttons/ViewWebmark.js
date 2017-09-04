import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function ViewWebmark(props) {
    let webmarks = 'webmarks/'
    return(
      <a href={webmarks + props.id} target="_blank"><button>View</button></a>
    );
}

export default ViewWebmark
