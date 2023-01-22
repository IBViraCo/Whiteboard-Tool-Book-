import React from "react";
import { WEBCAM_SIZES } from "../config/config";
import webcamReducer from "../reducer/webcamReducer"

const useWebcamState = () => {
    return React.useReducer(
        webcamReducer,
        {
            isActive : false,
            size     : WEBCAM_SIZES.small
        }
    )
}

export default useWebcamState;