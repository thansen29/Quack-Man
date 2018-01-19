import VisibleObject from './visible_object';

class Ghost extends VisibleObject {
  constructor(ctx, x, y, width, height){
    super(ctx, x, y, width, height);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.eatable = false;

  }

  draw(){

  }
}
