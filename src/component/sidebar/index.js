import { SidebarContainer } from './style';

import PenIcon from './PenIcon/PenIcon';
import $ from 'jquery';
import BookContexts from '../../contexts/BookContexts';
import WebcamIcon from './WebcamIcon';
import RecorderIcon from './RecorderIcon';
import React from 'react';
import Cursor from './Cursor';
import { enableFlipBook } from '../../helper';
import BookArrows from './BookArrows';
import ThemIcon from './themIcon';
import AddBookButton from '../Book/AddBookButton';


export default  () => {
    const [ bookState ]       = BookContexts.useBookContext();
    
    const handlePrev = () => {
        enableFlipBook();
        $('.flipBook').turn('previous')
    };
    const handleNext = () => {
        enableFlipBook();
        $('.flipBook').turn('next')
    };

    return (
        <SidebarContainer
            className="sidebar"
        >

            <WebcamIcon />

            <RecorderIcon />

            <Cursor />
            
            { bookState.isBookLoaded && <AddBookButton isSidebar={true} />  } 


            { bookState.isBookLoaded && bookState.bookData.length > 1 && <BookArrows handlePrev={handlePrev} handleNext={handleNext} />  } 

            <ThemIcon />
            
           <PenIcon />
            
        </SidebarContainer>
    )
}