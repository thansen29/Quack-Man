import Wall from './wall';
import Pill from './pill';
import LargePill from './large_pill';
class Util {

  static mazeFactory(ctx, string, x, y, width, height){
    switch (string) {
      case "X":
        return new Wall(ctx, x, y, width, height);
      case ".":
        return new Pill(ctx, x, y, width, height);
      case "o":
        return new LargePill(ctx, x, y, width, height);
      default:
    }
  }
}

export default Util;
