import React from "react";
import { Row } from "reactstrap";
import Book from "./component/Book";
import Sidebar from "./component/sidebar";
import Webcam from "./component/Webcam";
import Whiteboard from "./component/Whiteboard";
import BookContexts from "./contexts/BookContexts";
import PenContext from "./contexts/PenContext";
import WebcamContext from "./contexts/WebcamContext";
import { initializeMedia } from "./helper";
import useBookState from "./state/bookState";
import usePenState from "./state/penState";
import useWebcamState from "./state/webcamState";
import ThemeContexts from "./contexts/ThemeContexts";
import ModalsContext from './contexts/ModalsContext';
import Slider from "./component/Slider";
import WhiteboardContext from "./contexts/WhiteboardContext";
import { APP_CONFIG, base_url } from "./config/config";
import { InputTextProvider } from './contexts/TextInputContexts';
import Logo from "./component/Logo";
import { ToolsItem } from './component/sidebar/PenIcon/style';


import getNewPosition from './helper/pen'

function App() {
  const [ bookState, bookDispatch ]     = useBookState()
  const [ penState, penDispatch ]       = usePenState();
  const [ webcamState, webcamDispatch]  = useWebcamState();
  const [ appBackground, setAppBackground] = React.useState( APP_CONFIG.background[0] );

  const changeBackground = e => {
    if( !e.target.classList.contains('app') && !e.target.classList.contains('sidebar') ) return;

    if( APP_CONFIG.background.length === 1 ) return;
    
    APP_CONFIG.background.forEach( ( bg, i, array ) => {
      if( array.at(-1) ===  appBackground ) return setAppBackground(array[ 0 ])
      if( array[ i + 1 ] && bg === appBackground ) return setAppBackground(array[ i + 1 ])
    })

  }

  //check access camera and init
  // React.useEffect(() => {
    // initializeMedia( webcamDispatch );
  // }, []);


// const infoHandler = () => {
  
// }




  return (
    <Row 
    className="App" 
    id="appContainer"
    style={{
      // background: `${ appBackground !== 'none' ? `url("${ base_url + 'images/' + appBackground }" ) 0 0 / cover no-repeat` : 'inherit'}`,
      backgroundColor:'#fff'
    }}
    onClick={changeBackground}
    >
        {/* <Logo /> */}
        <ModalsContext.ModalsContextProvider >
        <ThemeContexts.ThemeContextProvider >
          <WhiteboardContext.WhiteboardContextProvider>
            <PenContext.penContext.Provider value={[ penState, penDispatch ]}>
              <BookContexts.bookContext.Provider value={[ bookState, bookDispatch ]}>
                <WebcamContext.webcamContext.Provider value={[webcamState, webcamDispatch]}>
                  <InputTextProvider>

                    {/* <Sidebar />  */}
                    {/* <Book /> */}
                    {/* <Slider /> */}
                      {/* <Webcam />     */}
                 
                    <Whiteboard />
                      <Sidebar/>
                      {/* <button onClick={infoHandler}>info</button> */}
         

                  </InputTextProvider>
                </WebcamContext.webcamContext.Provider>
              </BookContexts.bookContext.Provider>
            </PenContext.penContext.Provider>
          </WhiteboardContext.WhiteboardContextProvider>
        </ThemeContexts.ThemeContextProvider>
        </ModalsContext.ModalsContextProvider>
    </Row>
  );
}

export default App;
