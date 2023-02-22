import React from 'react'
import './PathLoader.css'

import { PropagateLoader } from 'react-spinners'


export default function PathLoader() {

  return (
    <div className='PathLoadingContainer'>
        <PropagateLoader 
            className='PathLoadingSpinner'
            color='#0065FF'
            size={30}
        />
    </div>
  )
}
