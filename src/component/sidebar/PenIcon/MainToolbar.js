import { PENT_TOOLBAR_TYPES } from "./../../../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faPalette,
    faPenAlt,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import WhiteboardContext from "../../../contexts/WhiteboardContext";
import BookContexts from "../../../contexts/BookContexts";
import PenContext from "../../../contexts/PenContext";
import actionCreator from "../../../actions/actionCreator";
import { BOOK_ACTION_TYPE } from "../../../config/action_type";
import trash from '../../../assets/icons/trash.svg';

function MainToolbar ({ setToolbar }){
    const [ reset, setReset ]       = WhiteboardContext.useWhiteboardContext();
    const [ bookState, bookDispatch ] = BookContexts.useBookContext();

    const handleResetWhiteboard = () => {
        if(reset) return;
        
        actionCreator(bookDispatch, BOOK_ACTION_TYPE.RESET_CANVAS, { resetCanvasPage : bookState.currentPage })
        
        setReset(true);
    }

    return (
            <>
                <span onClick={ () => handleResetWhiteboard() } className="pointer pen-tool-chooser d-flex justify-content-center flex-column align-items-center">
                    {/* <FontAwesomeIcon icon={faXmark} className="mb-1" /> */}
                    <img src={trash}   />
                    {/* از نو                            */}
                </span>


                {/* <span onClick={ () => setToolbar( PENT_TOOLBAR_TYPES.color ) } id="color-picker-tool" className="pointer pen-tool-chooser d-flex justify-content-center flex-column align-items-center">
                    <FontAwesomeIcon icon={faPalette} className="mb-1" />
                    رنگ                             
                </span>
                <span onClick={ () => setToolbar( PENT_TOOLBAR_TYPES.tool ) } id="pen-picker-tool" className="pointer pen-tool-chooser d-flex justify-content-center flex-column align-items-center">
                    <FontAwesomeIcon icon={faPenAlt} className="mb-1" />
                                    ابزار                               
                </span>
                <span onClick={ () => setToolbar( PENT_TOOLBAR_TYPES.size ) } id="size-picker-tool" className="pointer pen-tool-chooser circle-choose-sizes-button d-flex justify-content-center flex-column align-items-center" data-buton-type="size">
                    <span className="change_color_to_size_btn_parent_property circle-choose-sizes-icon d-inline-block"></span>
                    سایز                              
                </span> */}
                    
            </>   
    );

}

export default MainToolbar;