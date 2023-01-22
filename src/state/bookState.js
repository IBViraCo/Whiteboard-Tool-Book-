import React from "react";
import bookReducer from "./../reducer/bookReducer";

const useBookState = () => {
   return React.useReducer(
        bookReducer,
        {
          bookData          : [],
          dataPaints        : false,
          currentPage       : 1,
          isBookLoaded      : false,
          isPagesLoaded     : false,
          countPage         : false,
          resetCanvasPage   : false,
        }
    );

    
}

export default useBookState;