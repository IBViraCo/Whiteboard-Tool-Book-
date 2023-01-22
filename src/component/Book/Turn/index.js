import React, { useEffect } from "react";
import actionCreator from "../../../actions/actionCreator";
import { BOOK_ACTION_TYPE } from "../../../config/action_type";
import BookContexts from "../../../contexts/BookContexts";
import { FlipBookContainer, PageImage, PaintPage, FlipBook, PageContainer  } from "./style";
import $ from 'jquery';
import { APP_CONFIG, TurnJsConfigs } from "../../../config/config";
import PenContext from "../../../contexts/PenContext";
import withPaintWrapper from "../../../HOC/withPaintWrapper";
import { isTouchDevice } from "../../../helper";



const Turn = ({
        pen,
        isPaintStart,
        setIsPaintStart,
        getNewLineData,
        getCurrentPositionAndSetLasPose,
        mouseUpHandler,
        mouseDownHandler,
        OnTextHandler,
        textInputs,
        setTextInputs
    }) => {
    const { drawLine, initContext } = pen;

    const [ bookState, bookDispatch ]           = BookContexts.useBookContext();
    const [ penState ]                          = PenContext.usePenContext();
    const [ zoomScale, setZoomScale ]           = React.useState(1)
    const [ isMoveEnable, setIsMoveEnable]      = React.useState(false);
    const [ lastPosetranslateBook, setLastPosetranslateBook]    = React.useState(false)
    const [ translateBook, setTranslateBook]    = React.useState({
        x : 1,
        y : 1
    })
    const [ firstPrevTouch, setFirstPrevTouch ] = React.useState();
    const [ secondPrevTouch, setSecondPrevTouch ] = React.useState();
    const turnJsRef                             = React.useRef();
    const canvasesRef                           = React.useRef([]);
    const contexts                              = React.useRef([]);
    const MainContainer                         = React.useRef();
    const zoomContainer                         = React.useRef();
    const [ isPinchStart, setIsPinchStart]      = React.useState(false)

    //init set pages loaded
    //init turnJs
    useEffect(() => {
        if( !bookState.bookData || !bookState.bookData.length ) return;

        actionCreator( bookDispatch, BOOK_ACTION_TYPE.PAGES_LOADED, { isPagesLoaded : true });
        
        turnJsRef.current = $('.flipBook');

        //init turnJs
        $('.flipBook').turn({...options});

        actionCreator( bookDispatch, BOOK_ACTION_TYPE.BOOK_LOADED, { isBookLoaded : true });

        initContextsPages(1)
        
    }, [bookState.bookData]);

    //reset context page context
    useEffect( () => {
        if( !bookState.resetCanvasPage ) return;

        initContextsPages( bookState.resetCanvasPage )

        actionCreator(bookDispatch, BOOK_ACTION_TYPE.RESET_CANVAS, { resetCanvasPage : false })
        
        resetTextInputsByPage(bookState.resetCanvasPage)

    }, [ bookState.resetCanvasPage ])

    useEffect( () => {

        if( isPaintStart && isMoveEnable ) setIsMoveEnable(false)
        
    }, [ isPinchStart ])
  
    const draw = (e, canvasEl) => {
      
        const new_line_data = getNewLineData(e, canvasEl, zoomScale);

        const canvasId = +canvasEl.dataset.page;
        const currentContext = contexts.current.find( ctx =>{
            return +ctx.canvas.dataset.page === canvasId
        });

        if(!currentContext) return;
        
        drawLine(currentContext, new_line_data, zoomScale);
    }

    const isZoomContainerValidToMoveTop = () => {
        const mainPositions = MainContainer.current.getBoundingClientRect()
        const zoomPositions = zoomContainer.current.getBoundingClientRect()

        return zoomPositions.top < ( mainPositions.height * .8 ) + mainPositions.top
    }
    const isZoomContainerValidToMoveLeft = () => {
        const mainPositions = MainContainer.current.getBoundingClientRect()
        const zoomPositions = zoomContainer.current.getBoundingClientRect()

        return zoomPositions.left < (mainPositions.width * .8) + mainPositions.left 
    }
    const isZoomContainerValidToMoveBottom = () => {
        const mainPositions = MainContainer.current.getBoundingClientRect()
        const zoomPositions = zoomContainer.current.getBoundingClientRect()

        return zoomPositions.bottom > ( mainPositions.height * (1 - .8) ) + mainPositions.top
    }
    const isZoomContainerValidToMoveRight = () => {
        const mainPositions = MainContainer.current.getBoundingClientRect()
        const zoomPositions = zoomContainer.current.getBoundingClientRect()

        return zoomPositions.right > (mainPositions.width * ( 1 - .8 )) + mainPositions.left 
    }

    const pinchZoomMove = e => {
        
        const curX1 = (e.touches[0].pageX < e.touches[1].pageX)? e.touches[0].pageX : e.touches[1].pageX;
        const curY1 = (e.touches[0].pageY < e.touches[1].pageY)? e.touches[0].pageY : e.touches[1].pageY;
        const curX2 = (e.touches[0].pageX > e.touches[1].pageX)? e.touches[0].pageX : e.touches[1].pageX;
        const curY2 = (e.touches[0].pageY > e.touches[1].pageY)? e.touches[0].pageY : e.touches[1].pageY;

        const dist1 = Math.abs(firstPrevTouch.x - secondPrevTouch.x);
        const dist2 = Math.abs(curX1 - curX2);

        if( zoomScale <= APP_CONFIG.maxBookZoom && zoomScale >= 1 ) {
            setZoomScale((zoomScale* dist2) / dist1);

        
            setFirstPrevTouch({
                x : curX1,
                y : curY1
            })
    
            setSecondPrevTouch({
                x : curX2,
                y : curY2
            })
        } else if( zoomScale > APP_CONFIG.maxBookZoom ) 
            setZoomScale( APP_CONFIG.maxBookZoom )
         else if( zoomScale < 1 ) 
            setZoomScale( 1 )

        if( zoomScale === 1 ) setTranslateBook({x: 1, y: 1})

    }

    const pinchZoomStart = e => {
        //first sorted from left and top
        const prevFirstTouchX = (e.touches[0].pageX < e.touches[1].pageX)?  e.touches[0].pageX  : e.touches[1].pageX;
        const prevFirstTouchY = (e.touches[0].pageY < e.touches[1].pageY)? e.touches[0].pageY  : e.touches[1].pageY;
        const prevSecondTouchX = (e.touches[0].pageX > e.touches[1].pageX)? e.touches[0].pageX  : e.touches[1].pageX;
        const prevSecondTouchY = (e.touches[0].pageY > e.touches[1].pageY)? e.touches[0].pageY : e.touches[1].pageY;

        setFirstPrevTouch({
            x : prevFirstTouchX,
            y : prevFirstTouchY
        })

        setSecondPrevTouch({
            x : prevSecondTouchX,
            y : prevSecondTouchY  
        })

        setIsPinchStart(true);

    }
    

    const bookStartMoveHandler = e => {
        if( isTouchDevice() && !e.pointerType && e.touches && e.touches && e.touches.length === 2 && !isPinchStart ) return pinchZoomStart(e);
        if( isMoveEnable || penState.isActive ) return;

        const currentXPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientX : e.clientX; 
        const currentYPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientY : e.clientY; 
        const translateX = translateBook.x;
        const translateY = translateBook.y;
        setLastPosetranslateBook({
            x: currentXPose - translateX,
            y: currentYPose - translateY
        })
        setIsMoveEnable(true);
    } 

    const bookMoveHandler = (e) => {
        if( e.touches && e.touches && e.touches.length === 2 && isPinchStart ) return pinchZoomMove(e);

        if( !isMoveEnable || !lastPosetranslateBook || +zoomScale === 1 ) return;

        const currentXPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientX : e.clientX; 
        const currentYPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientY : e.clientY; 

        const differencMove = {
            x: currentXPose - lastPosetranslateBook.x,
            y: currentYPose - lastPosetranslateBook.y
        }

        setTranslateBook(differencMove)
    }

    const bookStopMoveHandler = e => {
        if( isPinchStart ) setIsPinchStart(false);

        setIsMoveEnable(false)

        const bookWidth = zoomContainer.current.offsetWidth;
        const bookHeight = zoomContainer.current.offsetHeight;
        const maxToleranceAllowedToMove = .7;

        if ( !isZoomContainerValidToMoveTop() ) setTranslateBook( {  x: translateBook.x, y: maxToleranceAllowedToMove * bookHeight })

        if ( !isZoomContainerValidToMoveBottom() ) setTranslateBook( {  x: +translateBook.x, y: -maxToleranceAllowedToMove * bookHeight })
        if ( !isZoomContainerValidToMoveLeft() ) setTranslateBook( {  x: maxToleranceAllowedToMove * bookWidth, y: translateBook.y })
        if ( !isZoomContainerValidToMoveRight()  ) setTranslateBook( {  x: -maxToleranceAllowedToMove * bookWidth, y: translateBook.y })
    }
 
    const mouseMoveHandler = (e, canvasEl) => {
        //check pen is active
        if(!penState.isActive) return;

        //check paint started
        if(!isPaintStart) return;

        //select and run draw or erase method
        draw(e, canvasEl);

        getCurrentPositionAndSetLasPose(e, canvasEl);
    }

    const handleMouseWheelZoom = (e) => {
        //check zoom in or zoom out
        //zoom in
        if( e.deltaY < 0 && +zoomScale < APP_CONFIG.maxBookZoom ) setZoomScale( zoomScale + .1 )

        //zoom out
        if( e.deltaY > 0 && +zoomScale > 1 ) setZoomScale( zoomScale - .1 )

        if( zoomScale === 1 ) setTranslateBook({x: 1, y: 1})
    }

    const initContextsPages = (page) => {
        const canvas = canvasesRef.current.find(canvas =>{
            if(!canvas || !canvas.dataset) return false;
            return +canvas.dataset.page === +page
        } );

        const new_context = initContext(canvas);

        const isContextExists = contexts.current.some( context => {
            if( context.canvas && context.canvas.dataset.page && +context.canvas.dataset.page === +page ) return true;
            return false
        })
        
        if( isContextExists ) contexts.current = contexts.current.map( context => {
            if( context.canvas && context.canvas.dataset.page && +context.canvas.dataset.page === +page ) return new_context;

            return context
        })
        
        if( !isContextExists ) contexts.current.push(new_context)
    }

    const resetTextInputsByPage = ( page ) => {
        
        setTextInputs(prevState => {
            return prevState.filter( input => {
                if( !input || !input.ref || !input.ref.current ) return false

                const isInputValueEmpty = input.ref.current.querySelector('textarea').value.trim()
                return +input.ref.current.getAttribute('page') !== +page && isInputValueEmpty
            })
        })
    }

    /**
     * 
     * @param {Number} page new PageNumber on change page
     * callback function while turning page
     */
     const turning = (event, page) => {actionCreator(bookDispatch, BOOK_ACTION_TYPE.CURRENT_PAGE, { currentPage : page })};

    const start = (event, pageObject, corner) => { 
        if (corner == 'tl' || corner == 'tr' || corner == 'bl' || corner == 'br'){
            turnJsRef.current.turn("disable", true);//for paint on corners
            event.preventDefault(); 
        } 
        
        const is_context_loaded = contexts.current.some(ctx => +ctx.canvas.dataset.page === +pageObject.next);
        if(is_context_loaded) return;

        initContextsPages(pageObject.next);
    }  

    const options = {
        pages: bookState.countPage,
        ...TurnJsConfigs,
        when: {
            start,
            turning,
        }
    }



    if( !bookState.bookData || !bookState.bookData.length ) return '';

    const renderPages = bookState.bookData.map((page, i) => {
        const index = i + 1;

        const onPenEvents = {
            onPointerDown :  (e) =>  mouseDownHandler(e, canvasesRef.current[index]) ,
            onPointerUp :  (e) => mouseUpHandler(e, canvasesRef.current[index]) ,
            onPointerCancel :  (e) => mouseUpHandler(e, canvasesRef.current[index]) ,
            onPointerOut :  (e) => mouseUpHandler(e, canvasesRef.current[index]) ,
            onPointerMove :  (e) => mouseMoveHandler(e, canvasesRef.current[index]) ,
        }
    
        const onTextEvents = {
            onClick : e => OnTextHandler( e, canvasesRef.current[index], zoomScale )
        }
    
        const chooseEvents = penState.tool === 'text' ? { ...onTextEvents } : { ...onPenEvents }

        return (
            <PageContainer index={i}  key={`book_page_${i}`}>
                <PageImage page={page} index={index} />
                <PaintPage 
                    page={page} 
                    index={index} 
                    pen={penState}
                    ref={ el => canvasesRef.current[index] = el }
                    { ...chooseEvents }
                    data-page={index}
                ></PaintPage>
                {textInputs.filter( input => {
                    return input.props.page && input.props.page && +input.props.page === index
                })}
            </PageContainer>
        )
    });

     return (
        <FlipBookContainer
            data-testid="mainBookContainer"
            ref={MainContainer}
        >
            <FlipBook 
                ref={zoomContainer}
                onMouseDown={ bookStartMoveHandler }
                onTouchStart={ bookStartMoveHandler }
                onMouseUp={ bookStopMoveHandler }
                onTouchEnd={ bookStopMoveHandler }
                onMouseOut={ bookStopMoveHandler }
                onTouchCancel={ bookStopMoveHandler }
                onMouseMove={ bookMoveHandler }
                onTouchMove={ bookMoveHandler }
                onWheel={ handleMouseWheelZoom }
                zoomScale={zoomScale} 
                translateBook={translateBook}
                data-testid="zoomContainer"
                
                >
                { renderPages }
            </FlipBook>
        </FlipBookContainer>
     )
 }

 export default withPaintWrapper(Turn, true);