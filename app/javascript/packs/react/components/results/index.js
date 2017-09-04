import React from 'react'
import PropTypes from 'prop-types'

// Components
import SiteUrl from '../information/SiteUrl'
import CancelWebmark from '../buttons/CancelWebmark'
import UrlResults from './UrlResults'
import ResultsSave from './ResultsSave'

function ResultWrapper(props){
  return (
    <webmark-dialog
        value={props.url}
        cancel={props.cancel}
        results={props.results}
        saver={props.saver}>
      <dialog-head>
        <SiteUrl url={props.url} />
        <CancelWebmark onClick={props.cancel} />
      </dialog-head>
      <UrlResults htags={props.htags} atags={props.atags}/>
      <ResultsSave saver={props.saver}/>
    </webmark-dialog>
  )
}

export default ResultWrapper
