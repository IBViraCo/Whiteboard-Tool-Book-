import styled from 'styled-components';
import { Col } from 'reactstrap';
import { APP_STYLES } from '../../GlobalStyle';
import { buttonMargin, buttonSize } from '../sidebar/style';

const addBookButtonSize = '3.2rem';
export const BookContainer = styled(Col).attrs({
    sm : 12,
    md : 'auto',
    tag: 'section'
})`
    user-select: none;
    height: 100%;
    /* width:80%; */
    min-width:30%;
    /* min-width: ${ (props) => !props.isbookloaded ? "95%" : 'auto' }; */
    max-width : 75%; 
    padding : 1rem;
    border-radius: ${APP_STYLES.Sizes.borderRadius};
    box-shadow: inset -2px -2px 4px rgba(255, 255, 255, 0.5), inset 2px 2px 4px rgba(205, 205, 236, 0.25), inset 5px 5px 10px rgba(205, 205, 236, 0.5), inset -5px -5px 10px #FFFFFF;
    display: flex;
    justify-content: center;
    background-color: ${APP_STYLES.colors.background};
`;


export const AddBookBtn = styled.label.attrs({
    type : 'submit',
    className: 'pointer',
    htmlFor: 'addBookInput'
})`
    border-radius: 100%;
    width: ${ (props) => props.isSidebar ? buttonSize : addBookButtonSize};
    height : ${(props) => props.isSidebar ? buttonSize : addBookButtonSize};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${APP_STYLES.colors.background};
    box-shadow: ${ ({isSidebar}) => isSidebar ? `inset -2px -2px 4px #ffffff, inset 2px 2px 4px rgb(205 205 236 / 25%), inset 2px 5px 10px rgb(205 205 236 / 80%), inset -2px -5px 5px #ffffff` : `-2px -2px 4px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(205, 205, 236, 0.25), -5px -5px 10px #FFFFFF, 5px 5px 10px rgba(205, 205, 236, 0.5)`};
    border: 1px solid gray;
    color : ${APP_STYLES.colors.dark};
    /* margin-top:2rem; */
    /* align-self: ${ (props) => props.isSidebar ? 'center' : 'end' }; 
    margin: ${ (props) => props.isSidebar ? 'unset' : '1rem' };
     margin-bottom: ${ (props) => props.isSidebar ? buttonMargin : 'unset' };  */ */

    &:hover  {
        color: ${({isSidebar}) => isSidebar ? `var(--bs-primary)` : 'inherit'};
        border-color: ${({isSidebar}) => isSidebar ? `var(--bs-primary)` : 'inherit'} 
    }
`;

