import React from 'react';
import actionCreator from '../../actions/actionCreator';
import { WEBCAM_ACTOIN_TYPE } from '../../config/action_type';
import { WEBCAM_SIZES } from '../../config/config';
import WebcamContext from '../../contexts/WebcamContext';
import { onTransitionEndHandler } from '../../helper';
import { WebcamContainer, WebcamViewer } from './style';

export default () => {
    const [ { isActive, size }, webcamDispatch ]    = WebcamContext.useWebcamContext();
    const [ isDragging, setIsDragging ]             = React.useState(false);
    const webcamContainerRef                        = React.useRef();
    const [ containerSizes, setContainerSizes ]     = React.useState({
        width: 100,
        height: 100
    });
    const dragConstrants = {
        left : containerSizes.appLeft,
        right : containerSizes.appLeft + containerSizes.appWidth - containerSizes.width,
        top: containerSizes.appTop,
        bottom: containerSizes.appTop + containerSizes.appHeight  - containerSizes.height
    }
    const checkWebcamDeactive = !isActive || size === WEBCAM_SIZES.disabled;

    const getWebSize = (webContainer) => {
        const appContainer = webContainer.closest('.App');

        return {
            width: webContainer.offsetWidth,
            height: webContainer.offsetHeight,
            appWidth: appContainer.offsetWidth,
            appHeight: appContainer.offsetHeight,
            appTop: appContainer.offsetTop,
            appLeft: appContainer.offsetLeft
        }
    }

    const handleSize = (e) => {
        const container = e.target.closest('#webcamContainer');
        if( checkWebcamDeactive || !container || isDragging ) return;
        
        const setWebcamSize = () => {
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
                actionCreator(webcamDispatch,WEBCAM_ACTOIN_TYPE.SET_SIZE, { size : WEBCAM_SIZES.small } );
                 break;   
                };
            }
        }
        
        setWebcamSize();
    }

    const handleStartDrag   = () => setIsDragging(true);
    const handleEndDrag     = () => setTimeout(() => setIsDragging(false),5)



    //set webcam size on change webcamContainer size and active webcam
    React.useEffect(() => {
        if( checkWebcamDeactive || !webcamContainerRef.current ) return;
            
        setContainerSizes( { ...getWebSize(webcamContainerRef.current) });

        new Promise( resolve => resolve(onTransitionEndHandler(webcamContainerRef.current)) )
            .then(() => setContainerSizes( { ...getWebSize(webcamContainerRef.current) }))

    }, [isActive, size])

    if( checkWebcamDeactive ) return ''
    
    return(
        <WebcamContainer 
            id="webcamContainer"
            ref={webcamContainerRef}
            size={size}    
            isdragging={isDragging ? 1 : 0}
            onMouseUp={ handleSize }
            onDragStart = { handleStartDrag }
            onDragEnd = { handleEndDrag }
            dragConstraints={ dragConstrants }
            dragElastic={0}
            whileDrag={{ opacity: .7 }}
            dragTransition={{
                power: 0
            }}
        >
            <WebcamViewer  
                width={containerSizes.width} 
                height={containerSizes.height}  
                size={size}    
                />
        </WebcamContainer>
    )
}