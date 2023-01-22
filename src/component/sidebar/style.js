import styled from 'styled-components';
import { Button } from 'reactstrap';
import { APP_STYLES } from '../../GlobalStyle';


export const SidebarContainer = styled.section`
    width: 5rem;
    display : flex;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
`

export const buttonSize = '3rem';
export const buttonMargin = '1rem';
export const SidebarButton = styled(Button)`
    border-radius: 100%;
    overflow: hidden;
    background: ${APP_STYLES.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9rem;
    width: ${buttonSize};
    height: ${buttonSize};
    color : ${APP_STYLES.colors.dark};
    margin-bottom: ${buttonMargin};
    outline: none ;
    border: 1px solid transparent;
    transition: all .2s;
    box-shadow: inset -2px -2px 4px #ffffff, inset 2px 2px 4px rgb(205 205 236 / 25%), inset 2px 5px 10px rgb(205 205 236 / 80%), inset -2px -5px 5px #ffffff;
    position: relative;
    z-index: 2;

    &:hover , 
    &:focus  {
        color: var(--bs-primary) !important;
        border-color: var(--bs-primary) !important;
        background: ${APP_STYLES.colors.background} !important;
    }

    @media screen and ( max-height : ${ APP_STYLES.MediaQueries.height }) {
        width: 2.5rem;
        height: 2.5rem;
    }

`



export const RecorderContainer = styled.div`
    width: 100%;
    transition: all .2s;
    height: ${ props => props.isstarted ? `${(+buttonSize[0] * 2) + (+buttonMargin[0] * 2)}rem` : `${Number(buttonSize[0]) + Number(buttonMargin[0])}rem` };
    position: relative;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center;
`
const RecorderIconStart = `
    background-color: ${ APP_STYLES.colors.danger };
    border-radius: 100%;
`
const RecorderIconStop = `
    background-color: ${ APP_STYLES.colors.blue };
    border-radius: 2px;
`

const recordIconSize = +buttonSize[0] / 3;
export const RecorderIcon = styled.span` 
    ${ props => props.isstarted ? RecorderIconStop : RecorderIconStart}
    width: ${recordIconSize}rem;
    height: ${recordIconSize}rem; 
    transition : all .3s linear;
 
`

export const PlayIcon = styled.div`
    border: 11px solid transparent;
    transition: all .2s ease-in .3s;
    border-right: 0;
    border-left: ${ props => props.ispaused ? '16px' : '0'} solid ${ APP_STYLES.colors.green };
    width: 0;
    height : 0;
    display: block;
    border-radius: 5px;
`

export const PauseIcon = styled(SidebarButton)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    transition: all .4s ease-out;
    position: absolute;
    opacity: ${ props => props.isstarted ? 1 : 0 };
    top: ${ props => props.isstarted ? buttonSize : 0 };
    z-index: 1;
    margin-top: 1rem;

    &:hover::after,
    &:hover::before, 
    &:focus::before, 
    &:focus::after {
        background-color: ${ APP_STYLES.colors.background } !important;
    }

    &:hover div, 
    &:focus div{
        border-left: ${ props => props.ispaused ? '16px' : '0'} solid ${ APP_STYLES.colors.background };

    }

    &::after{
        content: '';
        transition: all .2s linear;
        width: 5.5px;
        height: ${ props => !props.ispaused ? `${ recordIconSize + .2 }rem` : 0 };
        background-color: ${ APP_STYLES.colors.danger };
        border-radius: 2px;
    }

    &::before{
        content: '';
        transition: all .2s linear;
        width: 5.5px;
        height: ${ props => !props.ispaused ? `${ recordIconSize + .2 }rem` : 0 };
        background-color: ${ APP_STYLES.colors.danger };
        border-radius: 2px;
    }

`