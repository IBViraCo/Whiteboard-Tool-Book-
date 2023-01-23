import { createGlobalStyle } from "styled-components";
import iransansWoff from './assets/font/iransans/woff/iransansweb(fanum).woff';
import iransansWoffBlack from './assets/font/iransans/woff/iransansweb(fanum)_black.woff';
import iransansWoffBold from './assets/font/iransans/woff/iransansweb(fanum)_bold.woff';
import iransansWoffLight from './assets/font/iransans/woff/iransansweb(fanum)_light.woff';
import iransansWoffMedium from './assets/font/iransans/woff/iransansweb(fanum)_medium.woff';

import iransansWoff2 from './assets/font/iransans/woff/iransansweb(fanum).woff';
import iransansWoff2Black from './assets/font/iransans/woff2/iransansweb(fanum)_black.woff2';
import iransansWoff2Bold from './assets/font/iransans/woff2/iransansweb(fanum)_bold.woff2';
import iransansWoff2Light from './assets/font/iransans/woff2/iransansweb(fanum)_light.woff2';
import iransansWoff2Medium from './assets/font/iransans/woff2/iransansweb(fanum)_medium.woff2';
import { base_url } from "./config/config";


export const APP_STYLES = {
    colors : {
        background : '#E5E5E5',
        dark       : '#040404',
        danger     : '#ad0e0e',
        darkLight  : '#767676',
        gray       : '#c4c4c4ad',
        blue       : '#4444e8',
        green      : '#2bb701',
        yellow     : 'yellow',
        white      : '#fff',
        textInputBackground : 'transparent'
    },
    Sizes :{
        borderRadius : '.5rem',
    },
    MediaQueries : {
        height : '780px' 
    }
   
}

export default createGlobalStyle`
    @font-face {
        font-family: 'iransans';
        src: url(${iransansWoff2}) format('woff2'),
             url(${iransansWoff}) format('woff');
        font-weight: 400;
        font-style : normal;
    }
    @font-face {
        font-family: 'iransans';
        src: url(${iransansWoff2Black}) format('woff2'),
             url(${iransansWoffBlack}) format('woff');
        font-weight: 800;
        font-style : normal;
    }

    @font-face {
        font-family: 'iransans';
        src: url(${iransansWoff2Bold}) format('woff2'),
             url(${iransansWoffBold}) format('woff');
        font-weight: 600;
        font-style : normal;
    }
    @font-face {
        font-family: 'iransans';
        src: url(${iransansWoff2Light}) format('woff2'),
             url(${iransansWoffLight}) format('woff');
        font-weight: 300;
        font-style : normal;
    }
    @font-face {
        font-family: 'iransans';
        src: url(${iransansWoff2Medium}) format('woff2'),
             url(${iransansWoffMedium}) format('woff');
        font-weight: 500;
        font-style : normal;
    }


    html,
    body{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        direction: rtl;
        font-weight: 400;
        font-family: 'iransans';
        width: 100%;
        height: 100%;
        color : ${APP_STYLES.colors.dark};
        overflow: hidden;
        touch-action: none !important;
    }

    *{    
        box-sizing: inherit;
    }

    #root{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${APP_STYLES.colors.background};
    }

    .App{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: .8rem;
        
    }

    .pointer {
        cursor : pointer;
    }

    .auto {
        cursor : auto;
    }

    .point {
        cursor : ${ `url(${ base_url + 'icons/pointers/point.png' }) 0 0, auto` }
    }

    .pen-tool-chooser{
        margin-top: 1rem;
        transition: all .3s;
        font-size: .9rem;
        text-align: center;
        
        &:hover{
            color: ${APP_STYLES.colors.darkLight};
        }

        &:hover .circle-choose-sizes-icon::before{
            background: ${APP_STYLES.colors.darkLight} !important;
        }
    }

    .circle-choose-sizes-button {
        margin-top: 1rem;
        transition: all .2s;
    }

    
  

    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        .circle-choose-sizes-button {
            font-size: .8rem;
        }
       
        .circle-choose-sizes-button > svg {
            height: .8rem !important;
        }
    }

    .change_color_to_size_btn_parent_property {
        height: .9rem;
        width: .9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: all .2s;
    }

    .circle-choose-sizes-icon {
        border: 1px solid ${APP_STYLES.colors.dark};
        border-radius: 100%;

        &::before{
            content: "";
            background: ${APP_STYLES.colors.dark};
            width: 50%;
            height: 50%;
            border-radius: 100%;
            transition: all .2s;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

       
    }

    .customAlert {
        position: fixed;
        z-index: 10;
        width: auto;
        left: 50%;
        transform: translateX(-50%);
    }

    .app-loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: .76;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 1.5rem;
        z-index: 20;
    }

    .active-color-picker {
    width: 1.3rem !important;
    height: 1.3rem !important;
    }
    .active-color-picker::after{
        content: "";
        visibility: visible;
    }

    
    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        .active-color-picker {
        width: .75rem !important;
        height: .75rem !important;
        }
    }
    .active-color-picker.pen-color-parent-property::after{
        visibility: visible;
    }
    .pen-color-parent-property::after {
        transition: all .2s;
        position: absolute;
        visibility: hidden;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 100%;
    }

    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        .pen-color-parent-property::after {
            width: 1rem;
            height: 1rem;
        }
    }

    .red.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.danger};
    } 

    .green.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.green};
        
    } 

    .blue.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.blue};
    } 

    .yellow.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.yellow};
    } 

    .black.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.dark};
    }
    .white.pen-color-parent-property::after {
        border: 1px solid ${APP_STYLES.colors.white};
    }

    .toolbar-item-container{
        overflow: hidden;
        width: 100%;
        transition: all .5s ease-out;
    }

    .pen-tools-eraser {
        color: #6c757d !important;
    }

    .pen-tools-highlight {
        color: #a8c0ff !important;
    }

    .active-pen-icon {
        border: 1px solid #3d6dbd !important;
        background-color: ${APP_STYLES.colors.background} !important;
        color: ${APP_STYLES.colors.blue} !important;
        box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(205, 205, 236, 0.25), inset 5px 5px 10px rgba(205, 205, 236, 0.5), inset -5px -5px 10px #FFFFFF !important;
    }

    .active-pen-size::after{
        content: "";
        width: calc( 100% + .4rem );
        height: calc( 100% + .4rem);
        border: 1px solid #3d6dbd;
        border-radius: 100%;
        position: absolute;
    }

    .textInputCotainer{
        position: absolute;
        z-index: 10;
    }

    .textInput{
        width: 100%;
        height: 100%;
        border: unset;
        border-bottom: 1px solid #bababa;
        direction: rtl;
        background: ${ APP_STYLES.colors.textInputBackground };
    }
`