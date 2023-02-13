import { WhiteboardContainer, WhiteBoard } from "./style";
import PenContext from "../../contexts/PenContext";
import BookContexts from "../../contexts/BookContexts";
import React, { useEffect } from "react";
import withPaintWrapper from "../../HOC/withPaintWrapper";
import ThemeContexts from "../../contexts/ThemeContexts";
import WhiteboardContext from "../../contexts/WhiteboardContext";
import Pagination from '../Pagination';
import AddBookButton from '../Book/AddBookButton';
import Sidebar from '../sidebar';
import modals from '../../contexts/ModalsContext'

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
    const[isModalColor , setIsModalColor ,isModalBackground , setIsModalBackground,setIsModalShape , isModalShape] =modals.useModalsContext()

React.useEffect(()=>{
    const canvas = document.getElementById('whiteboardCanvas');
    canvasEl.current = canvas;   
    // console.log(canvas)
    const ctx = canvas.getContext('2d')
        let img = new Image()
        img.setAttribute("id", `id_you_like`);
        // console.log(canvas.width)
        // console.log(canvas.height)
        canvas.style.border = '1px solid blue'
        img.style.cursor = 'pointer'
        img.src = bookState.bookData[0]
        let currentX = canvas.width/2
        let currentY = canvas.height/2
        let centerPageX = currentX - img.width/2
        let centerPageY = currentY - img.height/2
        
            img.onload = function(){
                ctx.drawImage(img , 0 ,0 )
            }
    
    },[bookState])
    





    
   
    // canvas.onmousedown = (e) => {
    //         console.log('mousedown' ,e.layerX , e.layerY)
    // }
    // canvas.onmouseup = (e) => {
    //         console.log('mouseup' ,e.layerX , e.layerY)
    // }
    // canvas.onmouseout = (e) => {
    //         console.log('mouseout' ,e.layerX , e.layerY)
    // }

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
        setIsModalShape(false)
        setIsModalColor(false)
        setIsModalBackground(false)
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
            <WhiteBoard                                  
                    id='whiteboardCanvas'
                    ref={canvasEl} 
                    pen={penState} 
                    { ...chooseEvents }
                    theme={theme}
                >
                   
                    </WhiteBoard> 
             { textInputs } 
             <Pagination />
            
         </WhiteboardContainer>
        </>
    )
}

export default withPaintWrapper(Whiteboard);