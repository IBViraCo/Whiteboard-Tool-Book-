import React from "react";

const webcamContext = React.createContext();

const useWebcamContext = () => {
    const context = React.useContext(webcamContext);

    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}

export default {
    webcamContext,
    useWebcamContext
}