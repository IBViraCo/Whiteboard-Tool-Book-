import React from "react";

const penContext = React.createContext();


const usePenContext = () => {
    const context = React.useContext(penContext);

    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}


export default {
    penContext,
    usePenContext
}