import { fireEvent, render, screen } from "@testing-library/react";
import { APP_CONFIG } from "../../../config/config";
import BookContexts from "../../../contexts/BookContexts";
import Book from './../index';

const setup = (initBook = {}) => {
    const mockDispatch = jest.fn();
    return (
        <BookContexts.bookContext.Provider value={[ initBook, mockDispatch ]}>
            <Book />
        </BookContexts.bookContext.Provider >
    )
}
// describe.skip('show book', () => {

//     describe.skip('loading', () => {

//         it('show loading when add pdf', async () => {
//             const mockSetLoading = jest.fn();
//             //mock useState
//             React.useState = jest.fn( () => [ true, mockSetLoading]);
            
//             const wrapper = setup({});
            
//             const addFileButton = wrapper.findByTestId('add-file');

//             fireEvent.change(addFileButton, { target : { files : { type : APP_CONFIG.acceptFileType } }});

//             //change form 
//             const loading_component = wrapper.findByTestId('loading');

//             expect(loading_component).toBeVisible();
//         });

        
//     });

   
// });