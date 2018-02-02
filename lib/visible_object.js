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

  draw(){
  }


}

export default VisibleObject;
