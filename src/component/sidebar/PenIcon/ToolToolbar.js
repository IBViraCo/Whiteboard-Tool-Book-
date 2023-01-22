import { PEN_STATICS } from "./../../../config/config";
import { PenToolsItem } from './style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faTools, 
    faEraser,
    faHighlighter,
    faPenAlt,
    faFont
 } from '@fortawesome/free-solid-svg-icons';
import { PEN_ACTION_TYPE } from "../../../config/action_type";
import actionCreator from "../../../actions/actionCreator";

const ToolToolbar = ( { penState, penDispatch, setToolbar, setPenIcon } ) => {

    const ToolClickHandler = (type, icon) => {
        actionCreator(penDispatch, PEN_ACTION_TYPE.TOOL_CHANGE, { tool : PEN_STATICS.tools[type] });
        actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
        setToolbar('main');
        setPenIcon(icon)
    }

    return (
        <>
            <PenToolsItem onClick={ () => ToolClickHandler(PEN_STATICS.tools.eraser, faEraser) } className={`pointer d-inline pen-tools-tool-item pen-tools-eraser d-flex justify-content-center align-items-center ${penState.tool === PEN_STATICS.tools.eraser ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faEraser} />
            </PenToolsItem>
            <PenToolsItem onClick={ () => ToolClickHandler(PEN_STATICS.tools.highlight, faHighlighter)  } className={`pointer d-inline pen-tools-tool-item pen-tools-highlight d-flex justify-content-center align-items-center ${penState.tool === PEN_STATICS.tools.highlight ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faHighlighter} />
            </PenToolsItem>
            <PenToolsItem onClick={ () => ToolClickHandler(PEN_STATICS.tools.pen, faPenAlt) } className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.pen ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faPenAlt} />
            </PenToolsItem>
            <PenToolsItem onClick={ () => ToolClickHandler(PEN_STATICS.tools.text, faFont) } className={`pointer d-inline pen-tools-tool-item pen-tools-pen d-flex justify-content-center align-items-center  ${penState.tool === PEN_STATICS.tools.text ? 'active-pen-icon' : ''}`} >
                <FontAwesomeIcon icon={faFont} />
            </PenToolsItem>
            <span
                onClick={() => setToolbar('main') }  
                id="tools-chooser" 
                className="pointer circle-choose-sizes-button d-flex flex-column align-items-center pt-2" 
                data-buton-type="size"
                >
                <FontAwesomeIcon icon={faTools}/>
                ابزار             
            </span>
        </>
    )
}

export default ToolToolbar;