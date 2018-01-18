import Wall from './wall';
class Util {

  static mazeFactory(string, x, y, width, height){
    //canvas width
    //num columns
    //num rows

    switch (string) {
      case "X":
        return new Wall(x, y, width, height);
      default:

    }
  }
}

export default Util;
