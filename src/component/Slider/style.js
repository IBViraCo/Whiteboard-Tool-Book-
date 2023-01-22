import styled from 'styled-components';
import { APP_STYLES } from '../../GlobalStyle';


export const SliderDiv = styled.div.attrs({
    className : 'pointer',
})`
    padding: 0 !important;
    font-size: .5rem;
    width: .9rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    & .svg-inline--fa {
        width: .7rem;

    }
    & span {
        width: 100%;
        display: flex;
        justify-content: center;
        transform: rotate(90deg);
    }
`