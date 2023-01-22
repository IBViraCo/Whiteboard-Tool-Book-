import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CloseIconContainer } from './style'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CloseButton({ handleClickIcon }) {
    
    return (
        <CloseIconContainer
            onClick={ handleClickIcon }
        >
            <FontAwesomeIcon icon={faTimes} />
        </CloseIconContainer>
    )   
}
