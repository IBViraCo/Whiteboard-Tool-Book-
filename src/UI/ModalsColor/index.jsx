import React from 'react'
import {Modal} from './style.js'

export default  ({children}) => {
  return (
    <Modal width={'148px'} height={'144px'}>
      {children}
    </Modal>
  )
}

