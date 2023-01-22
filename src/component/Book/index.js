import BookContexts from '../../contexts/BookContexts'
import Viewer from './Viewer'
import React from 'react'
import AddBookButton from './AddBookButton'
import './../../helper/turn'
import Turn from './Turn'

export default () => {
  const [bookState] = BookContexts.useBookContext()

  let content = <AddBookButton />

  if (bookState.bookData && bookState.bookData.length) content = <Turn />

  return<Viewer content={content} />

  
}
