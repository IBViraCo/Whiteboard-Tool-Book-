import React from 'react';

const whiteboardContext = React.createContext();


const useWhiteboardContext = () => {
    const context = React.useContext(whiteboardContext);

    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}

const WhiteboardContextProvider = ( { children } ) => {
    const [ reset, setReset ] = React.useState(false);

    return(
        <whiteboardContext.Provider value={[ reset, setReset ]} >
            { children }
        </whiteboardContext.Provider>
    )
}


export default {
    WhiteboardContextProvider,
    useWhiteboardContext
}