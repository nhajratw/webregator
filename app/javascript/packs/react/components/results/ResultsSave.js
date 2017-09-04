import React from 'react'
import PropTypes from 'prop-types'

function ResultsSave(props) {
  return(
    <dialog-save>
      <button id="save" onClick={props.saver}>SAVE URL</button>
    </dialog-save>
  );
}

export default ResultsSave
