import styled from 'styled-components';
import { APP_STYLES } from '../../GlobalStyle';


export const CloseIconContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    color: ${ APP_STYLES.colors.danger };
    transition: all .2s;
    cursor: pointer;
    border-radius: 100%;
    font-size: .8rem;
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        background-color: ${ APP_STYLES.colors.danger };
        color: ${ APP_STYLES.colors.white }
    }
`