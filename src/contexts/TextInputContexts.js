import { createContext, useContext, useState } from "react";

const inputTextContext = createContext()

export const useInputTexts = () => {
    const inputTexts = useContext( inputTextContext )  

    if( !inputTexts ) throw new Error('must be used within InputTextProvider')

    return inputTexts
}

export const InputTextProvider = ({ children }) => {
    const [ textInputs, setTextInputs] = useState([]);

    return (
        <inputTextContext.Provider value={[ textInputs, setTextInputs ]}>
            {children}
        </inputTextContext.Provider>
    )
}
