import styled from 'styled-components';
import { APP_STYLES } from './../../../GlobalStyle';
import { SidebarButton, buttonSize } from '../style';


export const PenIconButton = styled(SidebarButton)`

`

export const PenIconContainer = styled.div`
    bottom: calc( 5rem + 1.5rem );
    left: 2rem;
    border-radius: 26px;
    width: 3.5rem;
    transition: all .3s cubic-bezier(.11,-0.04,.07,.82);
    min-height: 3.5rem;
    background: ${APP_STYLES.colors.background};
    box-shadow: inset 1px 1px 2px rgba(205, 205, 236, 0.5), inset -1px -1px 2px #FFFFFF;
    transition: all .3s ease-out;
    margin-top: auto;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    padding-top: 1rem;
    background: gray;

    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        margin-bottom: 0;
    }

    @media screen and ( max-height : 690px) {
        min-height: unset !important;
    }
  
`;

export const ClosePenToolbarBtn = styled.span ` 
    border: 7px solid #F5F5FA;
    box-sizing: border-box;
    border-radius: 100%;
    padding: 6px;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;
    &:hover{
        color: ${APP_STYLES.colors.danger} !important;
    }
`

export const ToolbarContentContainer = styled.div`
    overflow: hidden;
    transition: all .2s;
    width: 100%;
`

export const PenToolsToolbar = styled.div`
    transition: all .3s;
    margin-bottom: calc( ${buttonSize} + 2rem) !important;
    user-select: none;
    width: 100%;
    background-color: gray;

    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        margin-bottom: calc( ${buttonSize} + 1rem ) !important;
    }
`
export const CircleColorContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content:center;

`
export const CircleColorPicker = styled.div`
    width: 1.75rem;
    height: 1.75rem;
    border-radius: 100%;
    margin-top: 0.5rem;
    position: relative;
    transition: all .2s;
    margin: 0.5rem 0.5rem;
    border: 1px solid aqua;
    display: flex;
    justify-content: center;
    align-items: center;
  

    
/*     
    &:hover{
        width   : 1.3rem;
        height  : 1.3rem;
    } */

    &.red{
        background-color: ${APP_STYLES.colors.danger};
    }

    &.blue{
        background-color: ${APP_STYLES.colors.blue};
    }

    &.green{
        background-color: ${APP_STYLES.colors.green};
    }

    &.yellow{
        background-color: ${APP_STYLES.colors.yellow};
    }

    &.black{
        background-color: ${APP_STYLES.colors.dark};
    }

    &.white{
        background-color: ${APP_STYLES.colors.white};
    }

    &:hover.red::after{
        content: '';
        visibility: visible;
    }
    &:hover.green::after{
        content: '';
        visibility: visible;
    }
    &:hover.blue::after{
        content: '';
        visibility: visible;
    }
    &:hover.yellow::after{
        content: '';
        visibility: visible;
    }
    &:hover.black::after{
        content: '';
        visibility: visible;
    }

    &:hover.white::after{
        content: '';
        visibility: visible;
    }

    /* @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        width: 1rem;
        height: 1rem;

        &:hover{
            width   : .75rem;
            height  : .75rem;
        }
    } */
`

export const ToolsItem = styled.span`
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
    /* background:#F5F5FA ; */
    background: ${APP_STYLES.colors.background};

    color: #3d6dbd;
    margin-top: 1rem;
    border-radius: 100%;
    transition: all .2s;
    /* box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(205, 205, 236, 0.25), -5px -5px 10px #FFFFFF, 5px 5px 10px rgba(205, 205, 236, 0.5); */
    box-shadow:0px 20px 30px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* position: relative; */


    /* &:hover{
        box-shadow: -2px -4px 4px rgb(255 255 255 / 50%), 2px 2px 4px rgb(205 205 236 / 25%), -5px -5px 10px #ffffff, 0px 0px 3px rgb(205 205 236 / 50%);
    } */
`
export const PenToolsItem = styled.span`
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
    /* background:#F5F5FA ; */
    background: ${APP_STYLES.colors.background};

    color: #3d6dbd;
    margin-top: 1rem;
    border-radius: 100%;
    transition: all .2s;
    /* box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(205, 205, 236, 0.25), -5px -5px 10px #FFFFFF, 5px 5px 10px rgba(205, 205, 236, 0.5); */
    box-shadow:0px 20px 30px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;


    &:hover{
        box-shadow: -2px -4px 4px rgb(255 255 255 / 50%), 2px 2px 4px rgb(205 205 236 / 25%), -5px -5px 10px #ffffff, 0px 0px 3px rgb(205 205 236 / 50%);
    }
`

export const CircleSizePicker = styled.span`
    margin-top: 1rem;
    position: relative;
    background: #3d6dbd;
    color: black;
    border-radius: 100%;
    transition: all .2s;

    &:hover{
        background: #a8c0ff;
    }

    &.size-1 {
        width: .6rem;
        height: .6rem;
    }

    &.size-2 {
        width: 1rem;
        height: 1rem;
    }
    &.size-3 {
        width: 1.5rem;
        height: 1.5rem;
    }

   
`