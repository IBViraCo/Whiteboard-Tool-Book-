import styled from 'styled-components';

export const Modal = styled.div`

width: ${(props)=>props.width};
height:${(props)=>props.height};
z-index : 10000;
position: absolute ;
top: 20%;
left: 120%;
background: #fff;
border: 1px solid #1D3B76;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 21px;
display: flex;
justify-content: center;
align-items: center;

` 