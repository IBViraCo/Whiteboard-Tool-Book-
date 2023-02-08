import BookContexts from '../../contexts/BookContexts'
import Viewer from './Viewer'
import React from 'react'
import AddBookButton from './AddBookButton'
import './../../helper/turn'
import Turn from './Turn'
import Whiteboard from '../Whiteboard'



export default () => {
  const [bookState] = BookContexts.useBookContext()

  // let content = <AddBookButton />
  let content = <Whiteboard />

  // if (bookState.bookData && bookState.bookData.length) content = <Turn />
  // let content = <Turn />

  return<Viewer content={content} />

  
}
