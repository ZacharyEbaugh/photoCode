import React from 'react'
import './LoadingPage.css'
import { PhotoCodeHeader } from './PhotoCodeHeader'

import { PropagateLoader } from 'react-spinners'


export default function LoadingPage() {

  return (
    <div className='LoadingContainer'>
        <PhotoCodeHeader />
        <PropagateLoader 
            className='LoadingSpinner'
            color='#FFFFFF'
            size={30}
        />
    </div>
  )
}
