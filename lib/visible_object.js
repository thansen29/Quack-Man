import * as _ from 'lodash';
//contain all logic for collisions, for bounding boxes,
//maintaining position, render a sprite

class VisibleObject {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  collidesWith(visibleObject){
    let other = visibleObject.getBoundingBox();
    other = _.values(other);
    return other.some(this.isBetween);
  }

  isBetween(position){
    let current = this.getBoundingBox();
    return position.x > current.topLeft.x &&
      position.x < current.topRight.x &&
      position.y > current.topLeft.y &&
      position.y < current.bottomLeft.y;
  }

  getBoundingBox(){
    return {
      topLeft: { x: this.x, y: this.y },
      topRight: { x: this.x + this.width, y: this.y },
      bottomLeft: { x: this.x, y: this.y + this.height } ,
      bottomRight: { x: this.x + this.width, y: this.y + this.height }
    };
  }


}

export default VisibleObject;
