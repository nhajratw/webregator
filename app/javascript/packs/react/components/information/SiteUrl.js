import React from 'react'
import PropTypes from 'prop-types'

function SiteUrl(props){
  return <h1 id="site-url">{props.url.substring(0,20)}{(props.url.length>20) ? '...': ''}</h1>;
}

export default SiteUrl
