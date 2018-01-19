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

  draw(){
  }


}

export default VisibleObject;
