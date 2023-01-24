import { PEN_STATICS } from "./../../../config/config";
import {  PenToolsItem, ToolsItem } from './style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTools, 
    faEraser,
    faHighlighter,
    faPenAlt,
    faFont,
    faPenNib,
    faXmark,
    faTrashRestoreAlt
 } from '@fortawesome/free-solid-svg-icons';
import { PEN_ACTION_TYPE } from "../../../config/action_type";
import actionCreator from "../../../actions/actionCreator";


import WhiteboardContext from "../../../contexts/WhiteboardContext";
import BookContexts from "../../../contexts/BookContexts";
import { BOOK_ACTION_TYPE } from "../../../config/action_type";

import trash from '../../../assets/icons/trash.svg';
import highlighter from '../../../assets/icons/highlighter.svg';
import pic from '../../../assets/icons/pic.svg';
import shape from '../../../assets/icons/shape.svg';
import ThemIcon from '../themIcon';
import ColorToolbar from './ColorToolbar';
import ModalsColor from '../../../UI/ModalsColor';
import React from 'react';


const ToolToolbar = ( { penState, penDispatch, setToolbar, setPenIcon } ) => {

    const [isModal , setIsModal] = React.useState(false)

    const [ reset, setReset ]       = WhiteboardContext.useWhiteboardContext();
    const [ bookState, bookDispatch ] = BookContexts.useBookContext();

    const ToolClickHandler = (type, icon) => {

        actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools[type] });
        actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
        // setToolbar('main');
        setPenIcon(icon);
    }

    const handleResetWhiteboard = () => {
        if(reset) return;
        
        actionCreator(bookDispatch, BOOK_ACTION_TYPE.RESET_CANVAS, { resetCanvasPage : bookState.currentPage })
        
        setReset(true);
    }




    const rightClickModalHandler = (e)=>{
        e.preventDefault()
             
        if (e.type === "contextmenu"  ){
            setIsModal(!isModal)
        }
        if(e.type === 'click'){
            actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools.pen });
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.black } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            setIsModal(false)
        }
    
    }


    return (
        <>

    
             
        <PenToolsItem 
        onContextMenu={rightClickModalHandler}
        onClick={ rightClickModalHandler }
            className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.pen ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faPenNib} style={{color:'black' }} />
                    {
                        isModal?<ModalsColor>
                            <ColorToolbar/>
                        </ModalsColor>:null
                    }

        </PenToolsItem>

        <PenToolsItem onClick={ () => {
            
            actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools.pen });
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.green } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            setIsModal(false)
        } } className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.pen ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faPenNib} style={{color:'#06BD0D' }} />
            </PenToolsItem>

        <PenToolsItem onClick={ () => {
              actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools.pen });
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.red } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            setIsModal(false)

        } } className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.pen ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faPenNib} style={{color:'#FF0000' }} />
            </PenToolsItem>

            <PenToolsItem onClick={ () => {
                 actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools.highlight });
                actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.yellow } )
                actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
               setIsModal(false)

            } } className={`pointer d-inline pen-tools-tool-item pen-tools-highlight d-flex justify-content-center align-items-center ${penState.tool === PEN_STATICS.tools.highlight ? 'active-pen-icon' : ''}`} >
                {/* <FontAwesomeIcon icon={faHighlighter} /> */}
                <img src={highlighter} />
            </PenToolsItem>





            <ToolsItem onClick={ () =>{
                setIsModal(false)
                ToolClickHandler(PEN_STATICS.tools.eraser, faEraser)

                } } className={`pointer d-inline pen-tools-tool-item pen-tools-eraser d-flex justify-content-center align-items-center ${penState.tool === PEN_STATICS.tools.eraser ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faEraser} style={{color:'#1D3B76'}}/>
                {/* <img src={eraser}  /> */}

            </ToolsItem>

           <ToolsItem onClick={ () =>{ 
            
            handleResetWhiteboard()
            setIsModal(false)

            } } className="pointer pen-tool-chooser d-flex justify-content-center flex-column align-items-center">
                    {/* <FontAwesomeIcon icon={faXmark} className="mb-1" /> */}
                    {/* <FontAwesomeIcon icon={faTrashRestoreAlt} /> */}
                    {/* از نو                            */}
                    <img src={trash} />
           </ToolsItem>

           <ToolsItem onClick={()=>{
            setIsModal(false)
           }}>
           <img src={shape}  />
           </ToolsItem>

           <ToolsItem onClick={()=>{
            setIsModal(false)
           }}>
           <img src={pic}  />

           </ToolsItem>


            
        
          
            {/* <PenToolsItem onClick={ () => ToolClickHandler(PEN_STATICS.tools.text, faFont) } className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.text ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faFont} />
            </PenToolsItem> */}
            {/* <span
                onClick={() => setToolbar('main') }  
                id="tools-chooser" 
                className="pointer circle-choose-sizes-button d-flex flex-column align-items-center pt-2" 
                data-buton-type="size"
                >
                <FontAwesomeIcon icon={faTools}/>
                ابزار             
            </span> */}
               <ThemIcon  setIsModal={setIsModal}/>

               {/* <ColorToolbar setToolbar={setToolbar} penState={penState} penDispatch={penDispatch} /> */}
               {/* <ModalsColor/> */}
        </>
    )
}

export default ToolToolbar;