import React, { useRef } from "react";
import { Alert } from "reactstrap";

export default ({msg, color, time=3000}) => {
    const [ isVisible, setIsVisible ] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, time);

        return () => clearTimeout(timer);
    }, [])
    
    if( !isVisible ) return '';

    return (
        <Alert color={color} className="customAlert">
            { msg }
        </Alert>
    )
            
}