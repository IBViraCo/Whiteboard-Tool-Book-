import React from 'react';


const modalsContext = React.createContext();


const useModalsContext = () => {
    const context = React.useContext(modalsContext);

    if(!context) throw new Error(`must be used within a GuessedWordsProvider`);

    return context;
}


const ModalsContextProvider = ({children}) => {
 
    const [isModalColor , setIsModalColor] = React.useState( false)

    const [isModalBackground ,setIsModalBackground ] = React.useState(false);

    const [ setIsModalShape,isModalShape ] = React.useState(false);

    
    return(
        <modalsContext.Provider value={[
            isModalColor ,
             setIsModalColor ,
             isModalBackground ,
              setIsModalBackground,
              isModalShape,
              setIsModalShape,
              ]} >
            { children }
        </modalsContext.Provider>
    )
}

export default {
    ModalsContextProvider,
    useModalsContext
}