import React from 'react'
import PropTypes from 'prop-types'
import WebmarkForm from './WebmarkForm'
import WebmarkList from './WebmarkList'

const App = () => (
  <dashboard style={{textAlign: 'center'}}>
    <WebmarkForm />
    <WebmarkList />
  </dashboard>
)

export default App
