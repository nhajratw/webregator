import React from 'react'
import PropTypes from 'prop-types'

function Instructions(props){

  return (
    <instructions>
      <p className="instructions">{props.dialog}</p>
    </instructions>

  );
}

export default Instructions
