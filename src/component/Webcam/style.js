import styled from 'styled-components';
import { APP_STYLES } from '../../GlobalStyle';
import Webcam from 'react-webcam';
import { WEBCAM_SIZES } from '../../config/config';
import { motion } from 'framer-motion'; 

const paddingSize = '1rem';

const smallWebcam = `
    top: 3rem;
    left: 3rem;
    width: 11rem;
    height: 11rem;
    border-radius: 100%;
    border: 1px solid ${APP_STYLES.colors.dark};
`

const baseNotSmallSize = `
    top: ${paddingSize};
    left: ${paddingSize};
    width: calc( 100% - 1rem - ${paddingSize} );
    transform: translateX(0) translateY(0) !important;
`
const halfWebcam = `
    ${ baseNotSmallSize }
    height: 50%;
`

const fullWebcam = `
    ${ baseNotSmallSize }
    height: calc( 100% - 1rem - ${paddingSize} );
`

const renderSize = (size) => {
    switch (size){
        case WEBCAM_SIZES.small : return smallWebcam;
        case WEBCAM_SIZES.half  : return halfWebcam;
        case WEBCAM_SIZES.full  : return fullWebcam;
    }
}



export const WebcamContainer = styled(motion.div).attrs( props => ({
    drag: true,
    className : 'pointer',
    
}))`
    ${({size}) => renderSize(size)}
transition: ${ props => props.isdragging ? 'unset' : `all .3s`};
    background: ${APP_STYLES.colors.gray};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 5;
`

export const WebcamViewer = styled(Webcam).attrs(props => ({
        videoConstraints : {
            width : props.width,
            height : props.height,
            facingMode: "user"
        },
        mirrored : true
}))`
    border-radius: ${props => props.size === WEBCAM_SIZES.small ? '100%' : 0 };
`