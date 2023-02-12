import { isTouchDevice } from "./../helper/index";
const getNewPosition = (e, canvasEl, scale = 1) =>{
    if(!e || !canvasEl) return;
    const canvasPosition = canvasEl.getBoundingClientRect();
    const currentXPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientX : e.clientX; 
    const currentYPose = isTouchDevice() && !e.pointerType  ? e.touches[0].clientY : e.clientY; 

    const new_poseX = (+ ( currentXPose - canvasPosition.left ) )/ +scale || 0;
    const new_poseY = (+ ( currentYPose - canvasPosition.top ) )/ +scale || 0;
    
    return { 
        new_poseX,
        new_poseY
    }
}

const initContext = (canvasEl) => {
    if( !canvasEl ) return;
    const canvasContext = canvasEl.getContext('2d');

    canvasContext.canvas.width  = canvasEl.offsetWidth;
    canvasContext.canvas.height = canvasEl.offsetHeight;
        
    return canvasContext;
}

const drawLine = (context, lineData, scale = 1) => {
    const HighlightOrPenDraw = lineData.tool === 'highlight' ? 'xor' : 'source-over';

    context.beginPath();
    context.fillStyle   = lineData.color;
    context.strokeStyle = lineData.color;
    context.globalCompositeOperation = lineData.tool === 'eraser' ? "destination-out" : HighlightOrPenDraw;
    context.lineCap     = "round";
    context.lineJoin    = "round";
    context.moveTo(lineData['poseX']/ scale, lineData['poseY']/ scale);
    context.lineTo(lineData['poseX2'], lineData['poseY2']);
    context.lineWidth = lineData.size;
    context.stroke();
    context.closePath();
}

export default {
    initContext,
    getNewPosition,
    drawLine
}