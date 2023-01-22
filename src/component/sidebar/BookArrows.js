import { SidebarButton } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRight, 
    faArrowLeft
 } from '@fortawesome/free-solid-svg-icons';

export default ({ handlePrev, handleNext }) => {
    return (
        <>
            <SidebarButton onClick={handlePrev}>
                <FontAwesomeIcon icon={faArrowRight} />
            </SidebarButton>

            <SidebarButton onClick={handleNext}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </SidebarButton>
        </>
    )
}