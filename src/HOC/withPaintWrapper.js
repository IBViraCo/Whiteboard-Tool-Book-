import React from "react";
import { PEN_STATICS } from "../config/config";
import PenContext from "../contexts/PenContext";
import { randomString } from "../helper";
import pen from "../helper/pen";
import { useInputTexts } from "../contexts/TextInputContexts";
import actionCreator from "../actions/actionCreator";
import { PEN_ACTION_TYPE } from "../config/action_type";
import { motion } from "framer-motion";
import CloseButton from "../component/CloseIcon";
import Pagination from '../component/Pagination';

const withPaintWrapper =  (WrappedComponent, isBook = false) => props => {

   
   
    
    const { getNewPosition} = pen;
    const [ penState, penDispatch ] = PenContext.usePenContext();
    const [ textInputs, setTextInputs] = isBook ? React.useState([]) : useInputTexts();

    const [ isPaintStart, setIsPaintStart ] = React.useState(false);
    const [ lastMovePose, setLastMovePose ] = React.useState({ 
        last_poseX : 0,
        last_poseY : 0
    });
    const [ lastTextInputs, setLastTextInputs ] = React.useState([])

    const getNewLineData = (e, canvasEl, scale = 1) => {
        //get current move position
        const { new_poseX, new_poseY } = getNewPosition(e, canvasEl, scale);
        const { last_poseX, last_poseY } = lastMovePose;
        const size = ( penState.tool === 'eraser' || penState.tool === 'highlight' ) ? penState.size + ( Math.PI )  : penState.size;

        const color = ( penState.tool === 'highlight' ) ? `${penState.color}80` : penState.color;

        const scaleX = e.target.getAttribute('id') === 'whiteboardCanvas' ? penState.whiteboardScaleX : 1;
        const scaleY = e.target.getAttribute('id') === 'whiteboardCanvas' ? penState.whiteboardScaleY : 1;

        return {
            poseX   : last_poseX / (scaleX),
            poseY   : last_poseY / scaleY,
            poseX2  : new_poseX / (scaleX),
            poseY2  : new_poseY / scaleY,
            color   : color,
            tool    : penState.tool,
            size
        }
    }

    const getCurrentPositionAndSetLasPose = (e, canvasEl) => {
        const { new_poseX, new_poseY } = getNewPosition(e, canvasEl);

        //set last lines data for next move
        setLastMovePose({
            last_poseX : new_poseX,
            last_poseY : new_poseY
        })
    }

    const mouseDownHandler = (e, canvasEl) => {
        //check pen active
        if(!penState.isActive) return;

        //check start paint
        if(isPaintStart) return;

        //setState start paint 
        setIsPaintStart(true);

        getCurrentPositionAndSetLasPose(e, canvasEl);
    }

    const mouseUpHandler = (e, canvasEl) => {
        //check pen active
        if(!penState.isActive) return;

        //check paint not start
        if(!isPaintStart) return;

        //set paint end
        setIsPaintStart(false);
    }

    React.useEffect( () => {
        if( !textInputs.length ) setLastTextInputs([])
    }, [textInputs])

    React.useEffect( () => {
        const lastTextInputItem = textInputs.at(-1);
        
        if( !lastTextInputItem || textInputs.length <= lastTextInputs.length ) return;
        
        setTimeout(() => {
            if(lastTextInputItem.ref && lastTextInputItem.ref.current && lastTextInputItem.ref.current.querySelector('textarea'))
                    lastTextInputItem.ref.current.querySelector('textarea').focus()
        },100)

    }, [ lastTextInputs ])


    const OnTextHandler = (e, canvasEl, zoomScale = false) => {
        if( !penState.isActive || ( zoomScale && zoomScale !== 1) ) return;
        const inputWidth = 15
        const inputHeight = 3.7 * (Number(penState.size) / 2 )
        const containerPose = canvasEl.parentElement.getBoundingClientRect();
        const dataPage = canvasEl.dataset.page || null

        const calcPose = {
            top : e.clientY - containerPose.top,
            left : e.clientX - containerPose.left
        }

        if( e.clientX + ( inputWidth * 16 ) >= containerPose.right ) calcPose.left = calcPose.left - (inputWidth * 16) 

        if( e.clientY + ( inputHeight * 16 ) >= containerPose.bottom ) calcPose.top = calcPose.top - (inputHeight * 16) 
          
        //add input 
        const id = randomString(8);
        const autoGrowTextarea = (e) => {
            const element = e.target;
            element.style.height = inputHeight + 'rem'
            element.style.height = ( element.scrollHeight + 5) + 'px'
        }
        const TextareaEl = () => {
            return (
                <textarea 
                    ref={React.createRef(id)} 
                    onInput={autoGrowTextarea}
                    className="textInput"
                    key={id}
                    dir="auto"
                    style={{
                        left: calcPose.left,
                        top: calcPose.top,
                        width: inputWidth + 'rem',
                        height: inputHeight + 'rem',
                        color: penState.color,
                        fontSize: `${+penState.size}rem`,
                        resize: 'none',
                        direction: 'auto',
                        paddingLeft: '.8rem'
                    }}
                ></textarea>
            )   
            
        }
        const tolerance = 15
        const constrantsToDrag = {
            left : containerPose.left + (isBook ? 0 : tolerance ),
            right : containerPose.right -  (isBook ? 0 : tolerance ),
            top : containerPose.top +  (isBook ? 0 : tolerance ),
            bottom : containerPose.bottom -  (isBook ? 0 : tolerance )
        }

        const dragConstraints = {
            left : constrantsToDrag.left - e.clientX ,
            right : constrantsToDrag.right - ( e.clientX + (inputWidth * 16) ),
            top : constrantsToDrag.top - e.clientY,
            bottom : constrantsToDrag.bottom - ( e.clientY + (inputHeight * 16) ),
        }

        const handleClickRemoveIcon = (e) => {
            const parent = e.target.closest('.textInputCotainer')

            setTextInputs( (prevState) => {
                
                const newInputs =  prevState.filter(input => {
                    if( !input || !input.ref || !input.ref.current ) return false

                    return input.ref.current.dataset.id !== parent.dataset.id
                })
                setLastTextInputs(newInputs)
                return newInputs
            })
        }

        const inputContainerComp = React.createElement(
            motion.div,
            {
                key : `text_input_${id}_${Math.floor(Math.random(0) * 100)}`,
                "data-id" : id,
                "page": dataPage,
                drag: true,
                dragConstraints,
                dragElastic: 0,
                whileDrag: { opacity: .9 },
                dragTransition: {
                    power: 0
                },
                "style" : {
                    left: calcPose.left,
                    top: calcPose.top,
                    width: inputWidth + 'rem',
                    height: inputHeight + 'rem',
                },
                "className" : [
                    'textInputCotainer'
                ],
                "ref" : React.createRef(randomString(8))
            },
            [
                <CloseButton handleClickIcon={handleClickRemoveIcon}/>,
                <TextareaEl />
            ]
        )

        setTextInputs( (lastState) => {
            setLastTextInputs( [...lastState] ) 
           return [...lastState, inputContainerComp ]
        })

        actionCreator(penDispatch, PEN_ACTION_TYPE.ACTIVE_CHANGE, { isActive : false })

    }

        return (
   
       
            <WrappedComponent 
                {...props}  
              
                OnTextHandler={OnTextHandler}
                textInputs={textInputs}
                setTextInputs={setTextInputs}
                pen={pen}
                isPaintStart={isPaintStart}
                lastMovePose={lastMovePose}
                mouseDownHandler={mouseDownHandler}
                mouseUpHandler={mouseUpHandler}
                setIsPaintStart={setIsPaintStart}
                getNewLineData={getNewLineData}
                getCurrentPositionAndSetLasPose={getCurrentPositionAndSetLasPose}
                />  
   
        )             
}

export default withPaintWrapper;