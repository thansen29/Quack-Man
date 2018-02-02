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

  eatable(quackMan, squareWidth, squareHeight){
    const quackLocation = quackMan.calculateMatrixPos(quackMan.x, quackMan.y, squareWidth, squareHeight);
    const dotLocation = this.calculateMatrixPos(this.x, this.y, squareWidth, squareHeight);
    return dotLocation.gridX === quackLocation.gridX &&
      dotLocation.gridY === quackLocation.gridY &&
      this.visible;
  }

  draw(){
  }


}

export default VisibleObject;
