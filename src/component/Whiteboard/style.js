import styled from 'styled-components';
import { Col } from 'reactstrap';
import { APP_STYLES } from '../../GlobalStyle';
import { base_url, PEN_STATICS, THEME_NAMES } from '../../config/config';

export const WhiteboardContainer = styled(Col).attrs({
    sm : 12,
    md : 'auto',
    tag: 'section'
})`
    flex  : 1 !important;
    position: relative;
    height: 100%;
    border-radius: ${APP_STYLES.Sizes.borderRadius};
    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(205, 205, 236, 0.25), inset 5px 5px 10px rgba(205, 205, 236, 0.5), inset -5px -5px 10px #FFFFFF;
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: ${APP_STYLES.colors.background};
`

const selectTheme = (theme) => Object.values(THEME_NAMES).find( themeName => themeName === theme );

export const WhiteBoard = styled.canvas`
    background-repeat: no-repeat; 
    background-position: center; 
    width: 100%; 
    height: 100%;
    background-color: ${ ({ theme }) => selectTheme(theme) };
    border-radius: 7px;
    cursor:  ${ ({pen}) => pen.isActive ? `url(${ base_url + 'icons/PenTools/' + pen.tool + (pen.tool !== 'eraser' ? ('_' + pen.color) : '') + '.png' }) ${PEN_STATICS.repairCurosrPosition[pen.tool]}, auto` : ''};
`