import { WEBCAM_ACTOIN_TYPE } from "../config/action_type";

export default ( state, action ) => {
    switch(action.type) {
        case WEBCAM_ACTOIN_TYPE.IS_ACTIVE : {
            return { ...state,  ...action.payload  }
        }
        case WEBCAM_ACTOIN_TYPE.SET_SIZE : {
            return { ...state,  ...action.payload  }
        }
        default : return console.error(`error is in dispatch: ${ action.type }`);
    }
}