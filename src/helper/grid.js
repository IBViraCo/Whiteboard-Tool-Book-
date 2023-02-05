
    const gridXFixing = ()=>{
      const canvas = document.getElementById("whiteboardCanvas");
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.reset()
    
        const rectangle = new Path2D();
    
        for(let i =0 ; i<1820 ;i +=74){
          rectangle.rect(0, i, 1820, 74);
        }
        ctx.stroke(rectangle);
       
       
      }
  }
    const gridYFixing = ()=>{
      const canvas = document.getElementById("whiteboardCanvas");
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.reset()
    
        const rectangle = new Path2D();
    
        for(let i =0 ; i<1820 ;i +=71){
          rectangle.rect(i, 0, 71, 900);
        }
        ctx.stroke(rectangle);
       
      }
  }
    const gridXYFixing = ()=>{
      const canvas = document.getElementById("whiteboardCanvas");
      if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.reset()
        const rectangle = new Path2D();
    
        for(let i =0 ; i<1820 ;i +=50){
          rectangle.rect(0, i, 1820, 50);
          rectangle.rect(i, 0, 50, 900);
        }
        ctx.stroke(rectangle);
       
      }
  }



  export default {
    gridXFixing,
    gridYFixing,
    gridXYFixing
  }