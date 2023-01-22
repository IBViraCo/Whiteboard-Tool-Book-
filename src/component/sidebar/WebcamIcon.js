import actionCreator from "../../actions/actionCreator";
import WebcamOff from "../../assets/icons/WebcamOff";
import { WEBCAM_ACTOIN_TYPE } from "../../config/action_type";
import { WEBCAM_SIZES } from "../../config/config";
import WebcamContext from "../../contexts/WebcamContext";
import WebcamIcon from './../../assets/icons/webcam';
import { SidebarButton } from "./style";

export default () => {
    const [ { isActive, size }, webcamDispatch ] = WebcamContext.useWebcamContext();
    const checkWebcamDeactive = !isActive || size === WEBCAM_SIZES.disabled;

    const setWebcamSize = () => {
        if( !isActive ) return;

        switch(size) {
            case WEBCAM_SIZES.small : {
                actionCreator(webcamDispatch,WEBCAM_ACTOIN_TYPE.SET_SIZE, { size : WEBCAM_SIZES.half } );
                break;   
            };
            case WEBCAM_SIZES.half : {
                actionCreator(webcamDispatch,WEBCAM_ACTOIN_TYPE.SET_SIZE, { size : WEBCAM_SIZES.full } );
                break;   
            };
            case WEBCAM_SIZES.full : {
                actionCreator(webcamDispatch,WEBCAM_ACTOIN_TYPE.SET_SIZE, { size : WEBCAM_SIZES.disabled } );
                break;   
            }
            case WEBCAM_SIZES.disabled : {
                actionCreator(webcamDispatch,WEBCAM_ACTOIN_TYPE.SET_SIZE, { size : WEBCAM_SIZES.small } );
                break;
            }
        };
    }
    

    return (
        <SidebarButton onClick={setWebcamSize} className="mt-4">
            { checkWebcamDeactive ? <WebcamOff /> : <WebcamIcon /> }
        </SidebarButton>
    )
}