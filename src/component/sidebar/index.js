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
import ToolToolbar from './PenIcon/ToolToolbar';



import PenContext from '../../contexts/PenContext';//////////////////////////////add
import PenToolbar from './PenIcon/PenToolbar';//////////////////////////////add
import { faPenNib } from '@fortawesome/free-solid-svg-icons';//////////////////////////////add
import MainToolbar from './PenIcon/MainToolbar';


export default  () => {
    const [ bookState ]       = BookContexts.useBookContext();




    const [ penState, penDispatch ] = PenContext.usePenContext();/////////////add
    const [ penIcon, setPenIcon ]  = React.useState(faPenNib);////////////////add

   
   

    
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

            {/* <WebcamIcon /> */}

            {/* <RecorderIcon /> */}

            {/* <Cursor /> */}
            
            { bookState.isBookLoaded && <AddBookButton isSidebar={true} />  } 


            { bookState.isBookLoaded && bookState.bookData.length > 1 && <BookArrows handlePrev={handlePrev} handleNext={handleNext} />  } 

            {/* <ThemIcon /> */}
           
           
            <ToolToolbar  penState={penState} penDispatch={penDispatch} setPenIcon={setPenIcon} />

            
           {/* <PenIcon /> */}
            
        </SidebarContainer>
    )
}