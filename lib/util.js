import Wall from './wall';
import Pill from './pill';
class Util {

  static mazeFactory(ctx, string, x, y, width, height){
    switch (string) {
      case "X":
        return new Wall(ctx, x, y, width, height);
      default:
        return new Pill(ctx, x, y, width, height);
    }
  }
}

export default Util;
