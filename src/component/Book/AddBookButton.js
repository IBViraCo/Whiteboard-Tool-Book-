import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddBookBtn } from './style'
import { APP_CONFIG, APP_MESSAGES, MY_COLOR } from '../../config/config'
import { fileInputChangeHandler } from '../../helper'
import React from 'react'
import BookContexts from '../../contexts/BookContexts'
import Alert from '../Alert'
import AppLoading from '../AppLoading'
import vector from '../../assets/icons/Vector.svg'
import pic from '../../assets/icons/pic.svg'


export default ({ isSidebar = false }) => {


  const [isInvalidFile, setIsInvalidFile] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [bookState, bookDispatch] = BookContexts.useBookContext()


  return (  
    <>
  
      {isInvalidFile ? (
        <Alert msg={APP_MESSAGES.invalidFile} color="danger" />
      ) : (
        ''
      )}
      {isLoading ? <AppLoading /> : ''}
      <input
        onChange={(e) =>
          fileInputChangeHandler(e, {
            bookDispatch,
            setIsInvalidFile,
            setIsLoading,
          })
        }
        className="d-none"
        id="addBookInput"
        type="file"
        multiple
        accept={APP_CONFIG.acceptFileType}
      />

      <AddBookBtn isSidebar={isSidebar} data-test="add-file">
        {/* <FontAwesomeIcon icon={faPlus} /> */}
        <img src={pic} />
      </AddBookBtn>
    </>
  )
}
