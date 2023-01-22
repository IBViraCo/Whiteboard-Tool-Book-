import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import actionCreator from "../../actions/actionCreator";
import { PEN_ACTION_TYPE } from "../../config/action_type";
import BookContexts from "../../contexts/BookContexts";
import PenContext from "../../contexts/PenContext";
import { useInputTexts } from "../../contexts/TextInputContexts";
import { SliderDiv } from "./style";

export default () => {
    const [ penState, penDispatch ]             = PenContext.usePenContext();
    const [ bookState ]                         = BookContexts.useBookContext();
    const [ textInputs, setTextInputs ]         = useInputTexts()
    const [ isDragStart, setIsDragStart ]       = React.useState(false);
    const [ lastPose, setLastPose ]             = React.useState(0);
    const firstWhiteBoardWidth                  = React.useRef();
    const firstWhiteBoardHeight                 = React.useRef();

    const onResizeWindowHandler = async () => {
        const whiteboardCanvas = document.getElementById('whiteboardCanvas');
        const currentWhiteboardWidth = whiteboardCanvas.getBoundingClientRect().width;
        const currentWhiteboardHeight = whiteboardCanvas.getBoundingClientRect().height;
        const newWhiteBoardScale = currentWhiteboardWidth / firstWhiteBoardWidth.current;
        const newWhiteBoardScaleY = currentWhiteboardHeight  / firstWhiteBoardHeight.current
        
        actionCreator(penDispatch, PEN_ACTION_TYPE.BOOK_SCALE_X, { whiteboardScaleX    : newWhiteBoardScale})
        actionCreator(penDispatch, PEN_ACTION_TYPE.BOOK_SCALE_Y, { whiteboardScaleY    : newWhiteBoardScaleY}) 
    }

    const checkInputTextOutOfWhiteboradRange = (event) => {
        
        const checkOutOfBoxAndUpdate = prevState => {
            return prevState.filter( input => {
                if( !input ) return false;
                const InputRightPose = input.ref.current.getBoundingClientRect().right
                
                const isOutOfWhiteboardBox = InputRightPose > event.clientX
    
                if(isOutOfWhiteboardBox) return false
    
                return true
            })
        }

        setTextInputs( (prevState) =>  checkOutOfBoxAndUpdate(prevState) )
    }

    const onDragStartHandler = (event) => {
        const slider = event.target.closest('#slider')
        if( !slider ) return
        //set start drag
        setIsDragStart(true);

        setLastPose(event.clientX);
    }

    const onDragStopHandler = (event) => {

        if( !isDragStart  ) return;

        //set drag end
        setIsDragStart(false)

        //dispatch new Size
        const currentWhiteboardWidth = document.getElementById('whiteboardCanvas').getBoundingClientRect().width;

        const newWhiteBoardScale = currentWhiteboardWidth / firstWhiteBoardWidth.current;
        
        actionCreator(penDispatch, PEN_ACTION_TYPE.BOOK_SCALE_X, { whiteboardScaleX    : newWhiteBoardScale})

        setLastPose(event.clientX);

        checkInputTextOutOfWhiteboradRange(event)
    }

    const onDragMoveHandler = (event) => {
        if( !isDragStart  ) return;

        //get new Position
        const newPose  = event.clientX ;

        const moveSize = -(newPose - lastPose);

        //get book element
        const bookEl = document.getElementById('book');
        const bookWidth = bookEl.offsetWidth;
        
        //change book size 
        bookEl.style.width = ( bookWidth + moveSize ) + 'px' ;

        //dispatch new Size
        setLastPose(newPose);
    }

    const bodyEventHandler = (type = 'add') => {
        if( type === 'add') {
            document.body.addEventListener('mousedown', onDragStartHandler )
            document.body.addEventListener('mouseup', onDragStopHandler )
            document.body.addEventListener('mouseleave', onDragStopHandler )
            document.body.addEventListener('mousemove', onDragMoveHandler )
        }

        if(type === 'remove') {
            document.body.removeEventListener('mousedown', onDragStartHandler )
            document.body.removeEventListener('mouseup', onDragStopHandler )
            document.body.removeEventListener('mouseleave', onDragStopHandler )
            document.body.removeEventListener('mousemove', onDragMoveHandler )
        }
    }

    const initFirstWidths = () => {
        const bookEl = document.getElementById('book');
        bookEl.style.width = 'initial';
        const whiteboardCanvas = document.getElementById('whiteboardCanvas'); 
        const whiteboardWidth = whiteboardCanvas.getBoundingClientRect().width;
        const whiteboardHeight = whiteboardCanvas.getBoundingClientRect().height;

        firstWhiteBoardWidth.current = whiteboardWidth;
        firstWhiteBoardHeight.current = whiteboardHeight;
    }

    //init widths
    React.useEffect( () => {
        window.addEventListener('resize', onResizeWindowHandler )

        initFirstWidths();
    }, [])

    //init widths
    React.useEffect( () => {
        onResizeWindowHandler()

    }, [bookState.bookData])


    //init widths and scale on book load
    React.useEffect(() => {
        actionCreator(penDispatch, PEN_ACTION_TYPE.BOOK_SCALE_X, {
            bookScaleX          : 1,
            whiteboardScaleX    : 1,
            whiteboardScaleY    : 1
        })

        initFirstWidths();

    }, [bookState.isBookLoaded])


    //init events
    React.useEffect(() => {    
        bodyEventHandler('add');
        
        return () => {
            bodyEventHandler('remove');
        }

    },[isDragStart, lastPose]);

    return (
        <SliderDiv 
        id="slider"
        >
            <span>
                <FontAwesomeIcon icon={faBars} />
            </span>
        </SliderDiv>
    )
}