class VisibleObject {
  constructor(ctx, x, y, width, height){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  collidesWith(object) {
    return (this.x < (object.x + object.width) &&
         object.x < (this.x + this.width) &&
         this.y < (object.y + object.height) &&
         object.y < (this.y + this.height));
  }

  calculateCurrentCenter(){
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }

  calculateNextCenter(X, Y, width, height){
    return {
      x: X * width + (width / 2),
      y: Y * height + (height / 2),
    };
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

  wrap(x, y){
    if(x >= 600){
      this.x = 0;
    } else if(x <= 0){
      this.x = 600;
    } else if (y >= 600){
      this.y = 0;
    } else if( y <= 0){
      this.y = 600;
    }
  }

  smoothMovement(centerX, centerY, nextCenterX, nextCenterY){
    return (this.direction[0] === -1 && centerX >= nextCenterX) ||
        (this.direction[0] === 1 && centerX <= nextCenterX) ||
        (this.direction[1] === -1 && centerY >= nextCenterY) ||
        (this.direction[1] === 1 && centerY <= nextCenterY);
  }

  notInverseDirection(){
    return this.direction[0] + this.nextDirection[0] &&
    this.direction[1] + this.nextDirection[1];
  }

  draw(){
  }


}

export default VisibleObject;
