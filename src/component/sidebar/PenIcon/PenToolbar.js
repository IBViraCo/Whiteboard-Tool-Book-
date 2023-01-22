import { PENT_TOOLBAR_TYPES } from "./../../../config/config";
import { 
    ToolbarContentContainer,
    PenToolsToolbar
} from './style';
import React from "react";
import PenContext from "../../../contexts/PenContext";
import MainToolbar from "./MainToolbar";
import ColorToolbar from "./ColorToolbar";
import ToolToolbar from "./ToolToolbar";
import SizeToolbar from "./SizeToolbar";

export default ( { setPenIcon } ) => {
    const [ penState, penDispatch ] = PenContext.usePenContext();
    const [ toolbar, setToolbar ] = React.useState(PENT_TOOLBAR_TYPES.main);
    let content;
    
    const toolbarSelector = {
        main    : <MainToolbar setToolbar={setToolbar} />,
        color   : <ColorToolbar setToolbar={setToolbar} penState={penState} penDispatch={penDispatch} />,
        tool    : <ToolToolbar setToolbar={setToolbar} penState={penState} penDispatch={penDispatch} setPenIcon={setPenIcon} />,
        size    : <SizeToolbar setToolbar={setToolbar} penState={penState} penDispatch={penDispatch} />
    }

    content = toolbarSelector[toolbar];

    return(
        <PenToolsToolbar className="pen-tools-toolbar w-100 pen-tools-colors d-flex flex-column justify-content-center align-items-center">

            <ToolbarContentContainer >
                <div className="toolbar-item-container d-flex flex-column justify-content-center align-items-center w-100">
                    {content}
                </div>
            </ToolbarContentContainer>
        </PenToolsToolbar>
    )
}