import { SidebarButton } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboard } from '@fortawesome/free-solid-svg-icons';
import themeContexts from '../../contexts/ThemeContexts';
import { THEME_NAMES } from '../../config/config';
export default () => {
    const [ theme, setTheme ] = themeContexts.useThemeContext();

    const themeHandler = () => {
        Object.values(THEME_NAMES).forEach( (themeName, i, array) => {
            const nextTheme = array[ i+1 ] ? array[ i+1 ] : array[0];
            if( themeName === theme ) setTheme(nextTheme);
        })
    }
 
    return (
        <SidebarButton onClick={themeHandler} >
            <FontAwesomeIcon icon={faChalkboard} />
        </SidebarButton>
    )
    
}
