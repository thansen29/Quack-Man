//contain all logic for collisions, for bounding boxes,
//maintaining position, render a sprite

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
  //
  // getBoundingBox(){
  //   return {
  //     topLeft: { x: this.x, y: this.y },
  //     topRight: { x: this.x + this.width, y: this.y },
  //     bottomLeft: { x: this.x, y: this.y + this.height } ,
  //     bottomRight: { x: this.x + this.width, y: this.y + this.height }
  //   };
  // }

  draw(){

  }


}

export default VisibleObject;
