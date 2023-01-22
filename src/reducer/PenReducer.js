
import { PEN_ACTION_TYPE } from "../config/action_type"; 

export default (state, action) => {
    switch(action.type) {
        case PEN_ACTION_TYPE.TOOL_CHANGE :
        
            return { ...state, ...action.payload }
        case PEN_ACTION_TYPE.COLOR_CHANGE :
        
            return { ...state, ...action.payload }
        case PEN_ACTION_TYPE.SIZE_CHANGE :
        
            return { ...state, ...action.payload }
        case PEN_ACTION_TYPE.ACTIVE_CHANGE :
        
            return { ...state, ...action.payload }
        case PEN_ACTION_TYPE.BOOK_SCALE_X :

            return { ...state, ...action.payload }
        case PEN_ACTION_TYPE.BOOK_SCALE_Y :

            return { ...state, ...action.payload }
        default :
            return console.error(`error is in dispatch: ${action.type}`);
    }
}
