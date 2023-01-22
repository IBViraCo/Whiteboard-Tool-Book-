
import React from "react";

const bookContext = React.createContext();

const useBookContext = () => {
    const context = React.useContext(bookContext);
    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}

export default {
    useBookContext,
    bookContext
}