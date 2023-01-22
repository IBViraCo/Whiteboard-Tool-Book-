import { PEN_STATICS, THEME_NAMES } from "./../../../config/config";
import { CircleColorPicker } from './style';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { PEN_ACTION_TYPE } from "../../../config/action_type";
import actionCreator from "../../../actions/actionCreator";
import ThemeContexts from "../../../contexts/ThemeContexts";
import { useEffect } from "react";

const ColorToolbar = ({ penState, penDispatch, setToolbar }) => {
    const [ theme ] = ThemeContexts.useThemeContext();

    const BlackColor = () => 
        <CircleColorPicker onClick={() => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.black } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
        } } 
        className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.black} ${penState.color === PEN_STATICS.colors.black ? 'active-color-picker' : ''}`} 
        >&nbsp;</CircleColorPicker>


    const WhiteColor = () => 
        <CircleColorPicker onClick={() => {
            actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.white } )
            actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
        } } 
        className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.white} ${penState.color === PEN_STATICS.colors.white ? 'active-color-picker' : ''}`} 
        >&nbsp;</CircleColorPicker>


    useEffect(() => {
        if(theme === THEME_NAMES.whiteboard && penState.color === PEN_STATICS.colors.white ) actionCreator(penDispatch,  PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.black } );
    }, [theme])

    return (
        <>
            <CircleColorPicker onClick={() => {
                actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.red } )
                actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
                } } 
                className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.red} ${penState.color === PEN_STATICS.colors.red ? 'active-color-picker' : ''}`} 
                >&nbsp;</CircleColorPicker>
            <CircleColorPicker onClick={() => {
                actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.green } )
                actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
                } } 
                className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.green} ${penState.color === PEN_STATICS.colors.green ? 'active-color-picker' : ''}`} 
                >&nbsp;</CircleColorPicker>
            <CircleColorPicker onClick={() => {
                actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.blue } )
                actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
                } } 
                className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.blue} ${penState.color === PEN_STATICS.colors.blue ? 'active-color-picker' : ''}`} 
                >&nbsp;</CircleColorPicker>
            <CircleColorPicker onClick={() => {
                actionCreator(penDispatch, PEN_ACTION_TYPE.COLOR_CHANGE, { color : PEN_STATICS.colors.yellow } )
                actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : true })
                } } 
                className={`pointer circle-color-picker pen-color-parent-property ${PEN_STATICS.colors.yellow} ${penState.color === PEN_STATICS.colors.yellow ? 'active-color-picker' : ''}`} 
                >&nbsp;</CircleColorPicker>
            <BlackColor />
            { theme !== THEME_NAMES.whiteboard ? <WhiteColor /> : '' }

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

export default ColorToolbar