import React from 'react';
import { THEME_NAMES } from '../config/config';

const themeContext = React.createContext();


const useThemeContext = () => {
    const context = React.useContext(themeContext);

    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}


const ThemeContextProvider = ({children}) => {
    const [ theme, setTheme ] = React.useState( THEME_NAMES.whiteboard )
    return(
        <themeContext.Provider value={[ theme, setTheme ]} >
            { children }
        </themeContext.Provider>
    )
}

export default {
    ThemeContextProvider,
    useThemeContext
}