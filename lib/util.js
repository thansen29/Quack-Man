import Wall from './wall';
class Util {

  static mazeFactory(ctx, string, x, y, width, height){
    switch (string) {
      case "X":
        return new Wall(ctx, x, y, width, height);
      default:
    }
  }
}

export default Util;
