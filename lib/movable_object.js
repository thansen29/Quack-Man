import Wall from './wall';
import * as _ from 'lodash';
import VisibleObject from './visible_object';

class MovableObject extends VisibleObject {

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

  wallCollision(grid){
    let collides = false;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if(cell instanceof Wall && this.collidesWith(cell)){
          collides = true;
          return collides;
        }
      });
    });
    return collides;
  }
}

export default MovableObject;
