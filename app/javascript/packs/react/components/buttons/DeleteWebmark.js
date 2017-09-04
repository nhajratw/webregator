import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function DeleteWebmark(props) {
    return(
      <button onClick={props.onClick} id={props.id} >Delete</button>
    );
}

export default DeleteWebmark
