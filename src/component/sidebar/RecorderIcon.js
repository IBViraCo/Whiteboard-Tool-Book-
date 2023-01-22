import { SidebarButton, RecorderIcon, PauseIcon, RecorderContainer, PlayIcon } from './style';
import React from 'react';
import { isGetDisplayMediaSupported, initDisplayMedia, initMediaRecorder } from '../../helper';
import Alert from '../Alert';
import SaveFile from '../Book/SaveFile';



export default () => {
    const [ isMediaSupported, setIsMediaSupported ] = React.useState(false);
    const [ clickedToStart, setClickedToStart ]     = React.useState(false);
    const [ isStarted, setIsStarted] = React.useState(false);
    const [ isShowModal, setIsShowModal ] = React.useState(true);
    const [ isPaused, setIsPaused ]  = React.useState(false);
    const [ isError, setIsError ]    = React.useState(false);
    const streamData = React.useRef([]);
    const mediaRecorder = React.useRef();
    const blob          = React.useRef();

    const msgError  = 'مشکلی در هنگام ضبط بوجود آمده لطفا دوباره تلاش کنید';

    const setBlob = () => {
        if(!streamData.current.length) return;

        const blobConfig = {
            type : 'video/webm'
        }

        blob.current = new Blob(
            streamData.current,
            blobConfig
        )
    }

    const initMediaRecorderEvents = () => {
        //init events
        mediaRecorder.current.addEventListener('dataavailable', (event) => {
            if(!event.data.size) return;

            streamData.current.push(event.data);
        })

        mediaRecorder.current.addEventListener('start', () => {
            //set played
            setIsStarted(true);
            if(!isStarted) setIsPaused(false);
        })

        mediaRecorder.current.addEventListener('stop', () => {
            setBlob();
            setIsStarted(false);
        })
    }

    const errorFunctionality = () => {
        setIsError(true);
        setIsShowModal(false);
        setIsStarted(false);
        setTimeout(() => {setClickedToStart(false)},4000);   
        if(mediaRecorder.current) mediaRecorder.current.stop();
    }

    const StartFunctionality = async () => {
        //init mediaDevice 
        const stream = await initDisplayMedia();

        if(!stream) return;

        //init mediaRecorder
        mediaRecorder.current = initMediaRecorder(stream);

        //start
        mediaRecorder.current.start(200);       

        initMediaRecorderEvents();
    }

    const resetDate = () => {
        streamData.current = [];
        blob.current = '';
    }

    const start = async () => {
        resetDate();

        try{
            //check support
            if( !isMediaSupported ) return;
        
            StartFunctionality();

        }catch(err) {
            console.error('error is: ' + err);
            errorFunctionality();           
        }
    }

    const handleClickPause = () => {
        //check paused
        if( !isPaused ) mediaRecorder.current.pause();
        if( isPaused ) mediaRecorder.current.resume();

        setIsPaused(!isPaused);
    }

    const handleClickRecorder =  () => {
        setClickedToStart(true);

        //check start or stop 
        if( !isStarted ) start();
        if( isStarted ) mediaRecorder.current.stop();

        setTimeout(() => {setClickedToStart(false)},4000);
    } 

    //check support
    React.useEffect(() => {
        setIsMediaSupported( !!isGetDisplayMediaSupported() );
    }, []);

    //show save modal
    React.useEffect(() => {
        if(isStarted && !isShowModal) setIsShowModal(true);
    }, [ isStarted ])
    
    return (
        <>
        { clickedToStart && !isMediaSupported && <Alert 
                                                            msg="دستگاه شما از ضبط صدا پشتیبانی نمیکند. لطفا ورودی های دستگاه یا ورژن مرورگر خود را بررسی نمایید"
                                                            color='danger'
                                                        /> 
        }
        { isError && <Alert 
                            msg={msgError}
                            color='danger'
                        /> 
        }

        {
            isShowModal && <SaveFile blob={blob.current} isShowModal={isShowModal} setIsShowModal={setIsShowModal}/>
        }
        
        <RecorderContainer isstarted={ isStarted ? 1 : 0 }>
            <SidebarButton onClick={handleClickRecorder} >
                <RecorderIcon isstarted={ isStarted ? 1 : 0 } />
                
                </SidebarButton>
            <PauseIcon 
                onClick={handleClickPause}
                ispaused={ isPaused ? 1 : 0 } 
                isstarted={ isStarted ? 1 : 0 }
                >
                <PlayIcon ispaused={ isPaused ? 1 : 0 } />
            </PauseIcon>
        </RecorderContainer>
        </>
        
    )
}