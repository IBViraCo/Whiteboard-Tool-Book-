import actionCreator from "../actions/actionCreator";
import { BOOK_ACTION_TYPE, WEBCAM_ACTOIN_TYPE } from "../config/action_type";
import $ from 'jquery';
import { PDFWorker } from "pdfjs-dist";
import { APP_CONFIG } from "../config/config";
const PDFJS = require("pdfjs-dist/build/pdf");
const PDSWorker = require("pdfjs-dist/build/pdf.worker.entry");



const readFileData = (files) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(files);
    });
  };

  
  const initBookWidth = () => {
    document.getElementById('book').style.width = 'initial';
  }

  const checkIsNotImage = (file) =>  {
    const jpegFileType = APP_CONFIG.acceptFileType.split(',')[1].trim();
    const jpgFileType = APP_CONFIG.acceptFileType.split(',')[2].trim();
    const pngFileType = APP_CONFIG.acceptFileType.split(',')[3].trim();

    return file.type !== jpegFileType && file.type !== jpgFileType && file.type !== pngFileType
  }

  export const fileInputChangeHandler =async (e, {bookDispatch, setIsInvalidFile, setIsLoading}) => {
    e.preventDefault();
    const files = e.target.files

    const file = files[0];
  
    const pdfFileType = APP_CONFIG.acceptFileType.split(',')[0].trim();

   
    if( !files.length || !file || !file.type || (file.type === pdfFileType && checkIsNotImage(file)) ) return setIsInvalidFile(true);

    //check if is pdfFileType and multiple files
    
    const isAllFilesAreImage = Array.from(files).every( file => {
      
      if( checkIsNotImage(file) ) return false

      return true
    })

    //check if add more than one file all of them must be image
    const isMultiplefiles = files.length > 1 
    if( isMultiplefiles &&  !isAllFilesAreImage ) return setIsInvalidFile(true);
    

    //set loading
    setIsLoading(true);

    await actionCreator( bookDispatch, BOOK_ACTION_TYPE.FILE, [] );

    const isImageFileEntered = !!(file.type !== pdfFileType)
    
    const imagesData = isImageFileEntered ? await convertToImage(files) :  await convertPdfToImages(file);

    // console.log(imagesData)
    //dispatch to images 
    await actionCreator( bookDispatch, BOOK_ACTION_TYPE.FILE, imagesData );

    initBookWidth();

    //remove loading
    setIsLoading(false);
}
  

  /**
   * 
   * @param {File} file file -> the input file (e.g. event.target.files[0])
   * @returns images -> an array of images encoded in base64 
   */
  export const convertPdfToImages = async (file) => {
    PDFJS.GlobalWorkerOptions.workerSrc = PDFWorker;
    
    const images = [];
    const data = await readFileData(file);
    const pdf = await PDFJS.getDocument(data).promise;
    const canvas = document.createElement("canvas");
    for (let i = 0; i < pdf.numPages; i++) {
      const page = await pdf.getPage(i + 1);
      const viewport = page.getViewport({ scale: 1 });
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      images.push(canvas.toDataURL());
    }
    canvas.remove();
    return images;
  }

  export const convertToImage = async ( files ) => {
    const images = [];

    for (const file of files ){
      const data = await readFileData(file);
      images.push(data)
    }

    return images
  }

  /**
   * return add mediaDevices for other browesers
   */
  const webcamPolyfill = () => {
    if( !'mediaDevices' in navigator ) navigator.mediaDevices = {};

    if( !'getUserMedia' in navigator.mediaDevices ) return;

    /**
     * 
     * @param {String} constraints video | audio
     */
    navigator.mediaDevices.getUserMedia = function(constraints) {
      const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;;

      if( !getUserMedia ) return Promise.reject( new Error('getUserMedia not implemented') );

      return new Promise( (resolve, reject) => {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });

    }
  }

  export const initMediaDevices = async () => {
    webcamPolyfill();
    return navigator
      .mediaDevices
      .getUserMedia({
        video : true,
        audio : true
      })
  }

  export const initDisplayMedia = async () => {
    return navigator
      .mediaDevices
      .getDisplayMedia({
        audio : false,
        video : { mediaSource : "screen"  }
      }).then( async stream => {

        const audioStream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});

        return new MediaStream([ ...stream.getTracks(), ...audioStream.getTracks() ]);
      }).catch(err =>{
        return false
      })
  }

  export const initializeMedia = async ( webcamDispatch ) => {
     await initMediaDevices()
     .then( stream => {actionCreator(webcamDispatch, WEBCAM_ACTOIN_TYPE.IS_ACTIVE, { isActive : true } )})
     .catch( err => {actionCreator(webcamDispatch, WEBCAM_ACTOIN_TYPE.IS_ACTIVE, { isActive : false } )});
  }

  export const initMediaRecorder = stream => new MediaRecorder(stream)

  export const onTransitionEndHandler = async (element) => {
    return new Promise(resolve => {
        const handleTransitionEnd = () => {
          element.removeEventListener('transitionend', handleTransitionEnd);

            return resolve(true)
        }
        
        element.addEventListener('transitionend', handleTransitionEnd);            

    })
  }

    
export  const isMediaDeviceSupported     = () => 'mediaDevices' in navigator;
export  const isGetDisplayMediaSupported = () => ('mediaDevices' in navigator) && ('getDisplayMedia' in navigator.mediaDevices);

export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

export const enableFlipBook = () => $('.flipBook').turn('disable', false);

export function randomString(length) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

  if (! length) {
      length = Math.floor(Math.random() * chars.length);
  }

  var str = '';
  for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}