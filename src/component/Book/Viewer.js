import BookContexts from "../../contexts/BookContexts";
import { BookContainer } from "./style"


export default ({content}) => {
    const [ bookState ] = BookContexts.useBookContext();

    return (
        <BookContainer 
        id="book"
        isbookloaded={ bookState.isBookLoaded ? 1 : 0 }
        >
           
            { content }
        </BookContainer>
    )
}