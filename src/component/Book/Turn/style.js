import styled from 'styled-components';
import { base_url, PEN_STATICS } from '../../../config/config';


export const PageImage = styled.img.attrs( ({page, index}) => ({
    src : page,
    dataPage : index,

}))`
    background-repeat: no-repeat;
    background-size: 65%; 
    background-position: center; 
    width: auto; 
    height: auto;
    max-width: 100%;
`

export const PaintPage = styled.canvas.attrs( (page, index) => ({
    dataPage : index
}) )`
    background-repeat: no-repeat; 
    background-position: center; 
    width: 100%; 
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: 5;
    cursor:  ${ ({pen}) => pen.isActive ? `url(${ base_url + 'icons/PenTools/' + pen.tool + (pen.tool !== 'eraser' ? ('_' + pen.color) : '') + '.png' }) ${PEN_STATICS.repairCurosrPosition[pen.tool]}, auto` : ''};

`

export const FlipBookContainer = styled.div`
    width : 100%;
    height : 100%;
    overflow: hidden;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;

`

export const FlipBook = styled.div.attrs({
    className : 'flipBook',
    id : 'bookContainerMain'
})`
    height: 100%;
    transform: ${ ({ zoomScale, translateBook }) => `scale(${(+zoomScale).toFixed(1)}) translate(${(+translateBook.x).toFixed(1)}px, ${(+translateBook.y).toFixed(1)}px) !important` };
    display: flex;
    justify-content: center;
    align-items: center;
    

`

export const PageContainer = styled.div.attrs((index) => ({
    className : index === 0 ? 'hard' : ''
}))`
    height : 100%;
    width: 95%;
      display: flex;
    justify-content: center;
    align-items: center;
    
`