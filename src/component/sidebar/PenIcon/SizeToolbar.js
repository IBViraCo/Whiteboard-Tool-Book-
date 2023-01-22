import { PEN_STATICS } from "./../../../config/config";
import { CircleSizePicker } from './style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { PEN_ACTION_TYPE } from "../../../config/action_type";
import actionCreator from "../../../actions/actionCreator";

const SizeToolbar = ( { penState, penDispatch, setToolbar } ) => {
    return (
    <>
        <CircleSizePicker onClick={ () => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.SIZE_CHANGE, { size : PEN_STATICS.sizes[3] } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            } } 
            className={`pointer d-flex justify-content-center align-items-center circle-size-picker size-3 ${penState.size === PEN_STATICS.sizes[3] ? 'active-pen-size' : ''}`} 
            >
                &nbsp;
            </CircleSizePicker>
        <CircleSizePicker onClick={ () => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.SIZE_CHANGE, { size : PEN_STATICS.sizes[2] } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            } } 
            className={`pointer d-flex justify-content-center align-items-center circle-size-picker size-2 ${penState.size === PEN_STATICS.sizes[2] ? 'active-pen-size' : ''}`} 
            >
                &nbsp;
            </CircleSizePicker>
        <CircleSizePicker onClick={ () => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.SIZE_CHANGE, { size : PEN_STATICS.sizes[1] } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
            } } 
            className={`pointer d-flex justify-content-center align-items-center circle-size-picker size-1 ${penState.size === PEN_STATICS.sizes[1] ? 'active-pen-size' : ''}`} 
            >
                &nbsp;
            </CircleSizePicker>
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

export default SizeToolbar;