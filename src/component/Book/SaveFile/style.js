import styled from "styled-components"
import { APP_STYLES } from "../../../GlobalStyle"

export const SaveFile = styled.div`
    z-index: 20;
    top: 28%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    width: 25rem;
    background: ${ APP_STYLES.colors.background };
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    transition: all .5s ease;
`

export const CancelFile = styled.span`
    transition: all .3s;
    color: ${APP_STYLES.colors.danger};
    font-size: 1rem;
`

export const SaveFileTitle = styled.div`
    font-size: .95rem;
    font-weight: 800;
`

export const FileRenameInput = styled.input`
    box-shadow: inset -2px 2px 7px rgb(255 255 255 / 60%), inset 2px 2px 1px rgb(205 205 236 / 21%), inset 2px 4px 4px rgb(205 205 236 / 54%), inset -5px -5px 6px #ffffff;
    border-radius: 16px;
    background: #F5F5FA;
    text-align: right;
    transition: all .3s ease;

    &:focus {
        box-shadow: inset -2px 0px 8px rgb(255 255 255 / 60%), inset 4px 8px 11px rgb(205 205 236 / 56%), inset 1px 3px 6px rgb(205 205 236 / 67%), inset -5px -5px 6px #ffffff !important;
    }
`

export const SubmitFileRename = styled.button`
    box-shadow: -2px -2px 4px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(205, 205, 236, 0.25), -5px -5px 10px #FFFFFF, 5px 5px 10px rgba(205, 205, 236, 0.5);
    border-radius: 16px;
    background: #F5F5FA;
    font-weight: 800;
    transition: all .3s ease;

    &:active {
        box-shadow: -2px -2px 4px rgb(255 255 255 / 50%), 2px 2px 4px rgb(205 205 236 / 25%), -1px -2px 4px #ffffff, 1px 1px 4px rgb(205 205 236 / 75%);
    }
`

