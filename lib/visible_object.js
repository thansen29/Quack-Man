class VisibleObject {
  constructor(ctx, x, y, width, height){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  calculateMatrixPos(x, y, width, height){
    const gridX = Math.floor(x / width);
    const gridY = Math.floor(y / height);
    return {
      x: gridX * width,
      y: gridY * height,
      gridX,
      gridY
    };
  }

  draw(){
  }


}

export default VisibleObject;
