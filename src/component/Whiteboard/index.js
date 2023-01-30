import { WhiteboardContainer, WhiteBoard } from "./style";
import PenContext from "../../contexts/PenContext";
import BookContexts from "../../contexts/BookContexts";
import React from "react";
import withPaintWrapper from "../../HOC/withPaintWrapper";
import ThemeContexts from "../../contexts/ThemeContexts";
import WhiteboardContext from "../../contexts/WhiteboardContext";
import Pagination from '../Pagination';
import AddBookButton from '../Book/AddBookButton';
const Whiteboard = ({
    pen,
    isPaintStart,
    mouseDownHandler,
    mouseUpHandler,
    getNewLineData,
    getCurrentPositionAndSetLasPose,
    children,
    OnTextHandler,
    textInputs,
    setTextInputs
}) => {
    const [ reset , setReset ]      = WhiteboardContext.useWhiteboardContext();
    const { drawLine, initContext}  = pen;
    const [ penState ]              = PenContext.usePenContext();
    const [ bookState ]             = BookContexts.useBookContext();
    const [ theme ]                 = ThemeContexts.useThemeContext();

    const canvasEl = React.useRef();
    
    const [ context, setContext ] = React.useState();


    const setCanvas = () => {
        const canvas = document.getElementById('whiteboardCanvas');
        canvasEl.current = canvas;                                     
    }

    const resetWhiteboard = () => {
        // setCanvas();
        const canvasContext = initContext(canvasEl.current);
        setContext(canvasContext);
        setTextInputs([])
    }

    const clearCanvas = () => {
        context.clearRect( 0, 0, canvasEl.current.width, canvasEl.current.height);

    }

    //init canvas context on render component
    React.useEffect(() => {
        if( !canvasEl.current ) return;

        const canvasContext = initContext(canvasEl.current);
        setContext(canvasContext);
    }, []);


    //refresh canvas size by add book
    React.useEffect(() => {
        if(!bookState.isBookLoaded) return;

        resetWhiteboard();

    }, [bookState.isBookLoaded])

    //reset whiteboard on click reste button
    React.useEffect( () => {
        if( !reset ) return;

        clearCanvas();
        setReset(false);
        setTextInputs([])
        
    }, [reset])

    const draw = (e, canvasEl) => {
        const new_line_data = getNewLineData(e, canvasEl);

        drawLine(context, new_line_data);
    }

    const mouseMoveHandler = (e, canvasEl) => {
        e.preventDefault();
        //check pen is active
        if(!penState.isActive) return;

        //check paint started
        if(!isPaintStart) return;

        //select and run draw or erase method
        draw(e, canvasEl);

        getCurrentPositionAndSetLasPose(e, canvasEl);
    }

    const onPenEvents = {
        onPointerDown :  (e) =>  mouseDownHandler(e, canvasEl.current) ,
        onPointerUp :  (e) => mouseUpHandler(e, canvasEl.current) ,
        onPointerCancel :  (e) => mouseUpHandler(e, canvasEl.current) ,
        onPointerOut :  (e) => mouseUpHandler(e, canvasEl.current) ,
        onPointerMove :  (e) => mouseMoveHandler(e, canvasEl.current) ,
    }

    const onTextEvents = {
        onClick : e => OnTextHandler( e, canvasEl.current )
    }

    const chooseEvents = penState.tool === 'text' ? { ...onTextEvents } : { ...onPenEvents }
    return (
    <>
  
        <WhiteboardContainer id='whiteboardContainer'>  
            {children} 
            <WhiteBoard                                   //////////////////////        Canvas
                    id='whiteboardCanvas'
                    ref={canvasEl} 
                    pen={penState} 
                    { ...chooseEvents }
                    theme={theme}
                /> 
             { textInputs } 
             <Pagination/>

            
         </WhiteboardContainer>
        </>
    )
}

export default withPaintWrapper(Whiteboard);