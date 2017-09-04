import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function CancelWebmark(props){
  return <button id="cancel" onClick={props.onClick}>CANCEL</button>
}

export default CancelWebmark
