import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import webregatorReactApp from './reducers'

import App from './components/App'

let store = createStore(webregatorReactApp)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
});
