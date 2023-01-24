import {
    PenIconButton,
    PenIconContainer
} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import PenToolbar from './PenToolbar';
import PenContext from '../../../contexts/PenContext';
import actionCreator from '../../../actions/actionCreator';
import { PEN_ACTION_TYPE } from '../../../config/action_type';

export default () => {
    const [ penState, penDispatch ] = PenContext.usePenContext();
    const [ penIcon, setPenIcon ]  = React.useState(faPenNib);

    return (
        <PenIconContainer className="pen-tools-container ">
          
            
            <PenToolbar setPenIcon={setPenIcon} />
        
         
            <PenIconButton 
                onClick={ () => { actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : !penState.isActive }) } }
                className={`position-absolute ${ penState.isActive ? 'active-pen-icon' : '' }`}
                >
                <FontAwesomeIcon icon={penIcon} />
          
            </PenIconButton>
        </PenIconContainer>
    )
}