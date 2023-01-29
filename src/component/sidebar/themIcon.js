import { SidebarButton } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import themeContexts from '../../contexts/ThemeContexts';
import { THEME_NAMES } from '../../config/config';
import screen from '../../assets/icons/screen.svg';
import { CircleColorContainer, CircleColorPicker, PenToolsItem } from './PenIcon/style';
import { useState } from 'react';
import ModalsBackground from '../../UI/ModalsBackground';
import ModalsContext from '../../contexts/ModalsContext';

import selectionBackgroundGridXY from '../../assets/icons/selection-backgroundGrid-X&Y.svg'
import selectionBackgroundGridX from '../../assets/icons/selection-backgroundGrid-X.svg'
import selectionBackgroundGridY from '../../assets/icons/selection-backgroundGrid-Y.svg'


export default () => {
    const [ theme, setTheme ] = themeContexts.useThemeContext();

    const [isModalBackground ,setIsModalBackground ] = ModalsContext.useModalsContext()

    const themeHandler = (e) => {
        if (e.type === "contextmenu"  ){
            e.preventDefault()
       setIsModalBackground(!isModalBackground)
        }
        if(e.type === 'click'){
        Object.values(THEME_NAMES).forEach( (themeName, i, array) => {
            const nextTheme = array[ i+1 ] ? array[ i+1 ] : array[0];
            if( themeName === theme ) setTheme(nextTheme);
        })
    }
    }
 
    return (
        <PenToolsItem onClick={themeHandler} onContextMenu={themeHandler} >
            {/* <FontAwesomeIcon icon={faChalkboard} /> */}
            <img src={screen} alt="" />
            {
                isModalBackground? 
                <ModalsBackground 
              
              
                >

                            <CircleColorContainer onClick={(e)=>{e.stopPropagation()}} >
                                <CircleColorPicker onClick={(e)=>{
                                    e.stopPropagation()
                                    setTheme(THEME_NAMES.greenBoard)
                                }}
                                 style={{backgroundColor:`${THEME_NAMES.greenBoard}`}}>
                                </CircleColorPicker>

                                <CircleColorPicker 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setTheme(THEME_NAMES.whiteboard)
                                }}
                                style={{backgroundColor:`${THEME_NAMES.whiteboard}`}}>
                                </CircleColorPicker>
                                
                                <CircleColorPicker 
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setTheme(THEME_NAMES.blackBoard)
                                }}
                                style={{backgroundColor:`${THEME_NAMES.blackBoard}`}}>
                                </CircleColorPicker>



                                <CircleColorPicker
                                onClick={(e)=>{
                                    e.stopPropagation()

                                }}
                                >
                                 <img src={selectionBackgroundGridXY}/>
                                </CircleColorPicker>


                                <CircleColorPicker  
                                onClick={(e)=>{
                                    e.stopPropagation()

                                }}
                                >
                                 <img src={selectionBackgroundGridX}/>
                                </CircleColorPicker>


                                <CircleColorPicker 
                                onClick={(e)=>{
                                    e.stopPropagation()

                                }}
                                >
                                 <img src={selectionBackgroundGridY}/>
                                </CircleColorPicker>

                                
                            </CircleColorContainer>

                </ModalsBackground>
                :null
            }


        </PenToolsItem>
    )
    
}
