import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowPointer, 
    faCircle, 
    faHandPointer
} from '@fortawesome/free-solid-svg-icons';
import { SidebarButton } from './style';
import { cursorIcons, pointCursorColor } from '../../config/config';
import PenContext from '../../contexts/PenContext';
import actionCreator from '../../actions/actionCreator';
import { PEN_ACTION_TYPE } from '../../config/action_type';

export default () => {
    const [ cursorIcon, setCursorIcon ] = React.useState(cursorIcons.auto);
    const [ prevCursor, setPrevCursor ] = React.useState(cursorIcons.auto);
    const [ penState, penDispatch ]     = PenContext.usePenContext();

    const fontawesomeCursorIcon = {
        auto : faArrowPointer,
        pointer : faHandPointer,
        point : faCircle
    } 

    const changeCursor = () => {
        actionCreator(penDispatch , PEN_ACTION_TYPE.ACTIVE_CHANGE , {isActive: false})
        // let nextCursor;
        // Object.keys(cursorIcons).forEach( (cursor, i, array) => {
        //     if(cursor !== cursorIcon) return;

        //     const resultCursor = array[ i + 1 ];
        //     nextCursor = resultCursor ? resultCursor : array[0];
        // });
        // setPrevCursor(cursorIcon);
        // setCursorIcon(nextCursor);
    }

    // const setCursor = () => {
    //     document.body.classList.remove(prevCursor);

    //     if(penState.isActive) return;
        
    //     const bookCanvases = document.querySelectorAll('.flipBook canvas');

    //     document.body.classList.add(cursorIcon);
    //     document.getElementById('whiteboardCanvas').classList.remove(prevCursor);
    //     document.getElementById('whiteboardCanvas').classList.add(cursorIcon);
    //     if(!bookCanvases.length) return;

    //     bookCanvases.forEach(canvas => {
    //         canvas.classList.remove(prevCursor);
    //         canvas.classList.add(cursorIcon);
    //     })

    // }

    // React.useEffect( () => {
    //     if( (cursorIcon.trim() === 'pointer' || cursorIcon.trim() === 'point')  && penState.isActive ) actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : false })

    // }, [ cursorIcon ])

    // React.useEffect(() => {
    //     setCursor();
    // }, [ cursorIcon, penState.isActive ])

    return (
        <SidebarButton onClick={ changeCursor }>
            <FontAwesomeIcon
            style={{
                color: cursorIcon === cursorIcons.point ? pointCursorColor : 'inherit'
            }}
            icon={fontawesomeCursorIcon[cursorIcon]} />
        </SidebarButton>
    )
}