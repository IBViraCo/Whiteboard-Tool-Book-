import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Turn from "..";
import Book from "../..";
import { APP_CONFIG, PEN_STATICS } from "../../../../config/config";
import BookContexts from "../../../../contexts/BookContexts";
import PenContext from "../../../../contexts/PenContext";
import ThemeContexts from "../../../../contexts/ThemeContexts";
import WebcamContext from "../../../../contexts/WebcamContext";
import WhiteboardContext from "../../../../contexts/WhiteboardContext";

const initialDataForBookLoaded = {
    bookData : [
        'https://www.researchgate.net/profile/Pavan-Turaga/publication/327570177/figure/fig2/AS:669518707822602@1536637107726/Test-set-images-used-for-evaluating-the-algorithms-for-the-image-reconstruction.ppm'
    ],
    countPage : 1,
    currentPage : 1,
    dataPaints : false,
    isBookImage : false,
    isBookLoaded : false,
    isPagesLoaded : false,
    resetCanvasPage: false
}

const initDataForPenState = {
    color               : PEN_STATICS.colors.black,
    size                : PEN_STATICS.sizes[1],
    tool                : PEN_STATICS.tools.pen,
    isActive            : false,
    whiteboardData      : [],
    bookData            : {},
    whiteboardScaleX    : 1,
    whiteboardScaleY    : 1
}

const pointStartEventObject = { 
    pageX: 1190,
    pageY: 667,
    clientX: 1190,
    clientY: 667
}

const pointMoveEventObject = { 
    pageX: 1200,
    pageY: 667,
    clientX: 1200,
    clientY: 667
}

const defaultTranslateBook = {
    x : 1,
    y : 1
}

const mockComponent = ( initBook = {}, initPen = initDataForPenState ) => {
    const mockDispatch = jest.fn();
    const mockPenDispatch = jest.fn();
    const mockWebcamDispatch = jest.fn();

    return render(
        <PenContext.penContext.Provider value={[ initPen, mockPenDispatch ]}>
        <BookContexts.bookContext.Provider value={[initBook, mockDispatch]}>
        <WebcamContext.webcamContext.Provider value={[{}, mockWebcamDispatch]}>
            <Turn />
        </WebcamContext.webcamContext.Provider>
        </BookContexts.bookContext.Provider>
        </PenContext.penContext.Provider>
    )
}

const zoomOnPlusOrMinus = ( wrapper, type = 'plus' ) => {
    fireEvent.wheel(wrapper, { deltaY : type === 'plus' ?  -100 : 100 })
}

const toMaxZoom = (wrapper) => {
    const numberOfMaxZoom = +String(APP_CONFIG.maxBookZoom).split('.')[1];
    Array.from({ length : numberOfMaxZoom }).forEach(item => {
       zoomOnPlusOrMinus(wrapper, 'plus')
    })
}

describe( 'after load book', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mockComponent(initialDataForBookLoaded)
    })

    afterEach(() => {
        wrapper = null
    })


    it( 'after load book component render currectly', () => {

        //find main el
        const BookComponent = wrapper.getByTestId('mainBookContainer');
    
        expect(BookComponent).toBeInTheDocument()
    } )
    
    
    describe( 'zoom Book after load pdf', () => {
    
      
        it( 'on scroll up mouse turnjs Book must scale .1 up', () => {
            //find main el
            const TurnJsComponent = wrapper.getByTestId('zoomContainer');

            zoomOnPlusOrMinus(TurnJsComponent, 'plus')

            expect(TurnJsComponent).toHaveStyle('transform: scale(1.1) translate(1.0px,1.0px)');
        })

        it( 'on scroll down mouse turnjs book must scale minus .1 down ', () => {
            //find main el
            const TurnJsComponent = wrapper.getByTestId('zoomContainer');

            zoomOnPlusOrMinus(TurnJsComponent, 'plus')

            zoomOnPlusOrMinus(TurnJsComponent, 'minus')

            expect(TurnJsComponent).toHaveStyle('transform: scale(1.0) translate(1.0px,1.0px)');
        })


        it( 'book not zoom out when state of zoom is on minimum', () => {
            //find main el
            const TurnJsComponent = wrapper.getByTestId('zoomContainer');

            zoomOnPlusOrMinus(TurnJsComponent, 'minus')

            expect(TurnJsComponent).toHaveStyle('transform: scale(1.0) translate(1.0px,1.0px)');
        })

        it( 'book not zoom in when state of zoom is on maximum', () => {
             //find main el
             const TurnJsComponent = wrapper.getByTestId('zoomContainer');

             toMaxZoom( TurnJsComponent )

             expect(TurnJsComponent).toHaveStyle(`transform: scale(${APP_CONFIG.maxBookZoom}) translate(1.0px,1.0px)`);
        })
    
    
    
    
    })


    describe('move book', () => {
        

        it('move book to diffrence of mousemoved on mousedown and mousemoveup', () => {
            //get element of zoom
            const TurnJsComponent = wrapper.getByTestId('zoomContainer');

            //zoom to enable move
            toMaxZoom( TurnJsComponent )

            //mouse down 
            fireEvent.mouseDown(TurnJsComponent, pointStartEventObject)
            
            //mouse move
            fireEvent.mouseMove(TurnJsComponent, pointMoveEventObject)

            const differenceX = (pointMoveEventObject.clientX - pointStartEventObject.clientX + defaultTranslateBook.x)
            const differenceY = (pointMoveEventObject.clientY - pointStartEventObject.clientY + defaultTranslateBook.y)

            //assert style
            expect( TurnJsComponent ).toHaveStyle(`transform: scale(${APP_CONFIG.maxBookZoom}) translate(${differenceX}.0px,${differenceY}.0px)`)
        })

        it('not move book on scale one',() => {
            const TurnJsComponent = wrapper.getByTestId('zoomContainer');
            
            zoomOnPlusOrMinus(TurnJsComponent, 'plus')

            //mouse down 
            fireEvent.mouseDown(TurnJsComponent, {...pointStartEventObject})
            
            //mouse move
            fireEvent.mouseMove(TurnJsComponent, {...pointMoveEventObject})

            Array.from({length: 2}).forEach(item => zoomOnPlusOrMinus(TurnJsComponent, 'minus')) 

            //assert style
            expect( TurnJsComponent ).toHaveStyle(`transform: scale(1.0) translate(1.0px,1.0px)`)
        })

        
        
        
    })
  
    
})

it('move book not work on enable pen', () => {
    const customInitBookData = { 
        ...initialDataForBookLoaded, 
        resetCanvasPage : true
    }

    const customInitPenData = {
        ...initDataForPenState,
        isActive : true
    }
    
    const wrapper = mockComponent(customInitBookData, customInitPenData)

    const TurnJsComponent = wrapper.getByTestId('zoomContainer');

    //zoom to enable move
    toMaxZoom( TurnJsComponent )

     //mouse down 
     fireEvent.mouseDown(TurnJsComponent, {...pointStartEventObject})
    
     //mouse move
     fireEvent.mouseMove(TurnJsComponent, {...pointMoveEventObject})

    expect(TurnJsComponent).toHaveStyle(`transform: scale(${APP_CONFIG.maxBookZoom}) translate(1.0px,1.0px)`);

})


it('after changing book state should reset to default', () => {
    const resetDataForPenState = { 
        ...initialDataForBookLoaded, 
        resetCanvasPage : true
    }

    const wrapper = mockComponent(resetDataForPenState)

    const TurnJsComponent = wrapper.getByTestId('zoomContainer');

    expect(TurnJsComponent).toHaveStyle('transform: scale(1.0) translate(1.0px,1.0px)');
})