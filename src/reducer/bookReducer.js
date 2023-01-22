import { BOOK_ACTION_TYPE } from "./../config/action_type";

export default (state, action) => {

    switch(action.type) {
        case BOOK_ACTION_TYPE.FILE :
            const bookData  = [ ...Object.values(action.payload) ];
            const countPage = bookData.length;

            return { ...state, bookData, countPage };

        case BOOK_ACTION_TYPE.BOOK_LOADED :
            return { ...state, ...action.payload }

        case BOOK_ACTION_TYPE.CURRENT_PAGE :
            return { ...state, ...action.payload }

        case BOOK_ACTION_TYPE.PAGES_LOADED :
            return { ...state, ...action.payload }
        case BOOK_ACTION_TYPE.RESET_CANVAS :
            return { ...state, ...action.payload }
        case BOOK_ACTION_TYPE.IS_IMAGE_BOOK :
            return { ...state, ...action.payload }

        default : 
            throw new Error(`error is in dispatch: ${action.type}`);
    }
}