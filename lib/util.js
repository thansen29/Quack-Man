import Wall from './wall';
import Pill from './pill';
import LargePill from './large_pill';
import QuackMan from './duck';
import Blinky from './blinky';
import Inky from './inky';
import Pinky from './pinky';
import Clyde from './clyde';

class Util {

  static mazeFactory(ctx, string, x, y, width, height){
    switch (string) {
      case "X":
        return new Wall(ctx, x, y, width, height);
      case ".":
        return new Pill(ctx, x, y, width, height);
      case "o":
        return new LargePill(ctx, x, y, width, height);
      case "q":
        return new QuackMan(ctx, x, y, width, height);
      case "b":
        return new Blinky(ctx, x, y, width, height);
      case "i":
        return new Inky(ctx, x, y, width, height);
      case "p":
        return new Pinky(ctx, x, y, width, height);
      case "c":
        return new Clyde(ctx, x, y, width, height);
      default:
    }
  }
}

export default Util;
