import React from 'react'
import logoIcon from './../../assets/icons/vira-logo.png'
import {ImageIcon, LogoContainer} from './style'

export default function Logo() {
  return (
    <LogoContainer>
        <ImageIcon src={logoIcon} />
    </LogoContainer>
  )
}
