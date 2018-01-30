# Quack-Man
Quack-man is a remake of the original Pac-Man, a game that hardly needs any introduction.

# Instructions

## Gameplay
Much like the original Pac-Man, Quack-Man's aim is simple, collect the orbs to increase your points, and avoid the ghosts! Except when you eat a larger orb, then the ghosts become vulnerable and delicious.

![](https://preview.ibb.co/iFWgKR/quackman.png)

## Controls
- Click anywhere to begin the game
- Use arrow keys to change directions
- Press "S" to toggle the audio


# Technlogies
Vanilla JavaScript, HTML5 Canvas, HTML5, CSS3

# Features and Implementation
## Maze generator
The maze is generated dynamically, using a function to read from a text file and populate the maze based on the given string. This offers an option for easy maze customization. Future plans are to have a series of levels ready for when the player passes a level.
```
const boardModel =
`XXXXXXXXXXXXXXXXXXX
X.................X
X.X.XXXX.X.XXXXoX.X
X.X.X  X.X.X  X.X.X
X.X.XXXX.X.XXXX.X.X
X.X.o....X......X.X
X.X.XX.XXXXX.XX.X.X
X.X.X........XX.X.X
X...X.XXXX X.XX...X
XXX.X.XbpicX....XXX
   .X.XXXXXX.XX.
XXX.X........XX.XXX
X.o...XXXXXX.XX...X
X.XXX.....X.....X.X
X...X.XXX.X.XXX.X.X
X.X.X....q....X.X.X
X.X.X.X.XXX.X.X.X.X
X.X...X..X..X...o.X
X.XXXXXX.X.XXXXXX.X
X.................X
XXXXXXXXXXXXXXXXXXX`;

const item = Util.mazeFactory(ctx, cell, x, y, squareWidth, squareHeight);
switch (cell) {
  case ".":
  case "o":
    dots.push(item);
    break;
  case "q":
    quackMan = item;
    initQuack = {x, y};
    break;
  case "b":
  case "i":
  case "p":
  case "c":
    ghosts.push(item);
    defaultPositions.push({x, y});
    break;
  default:
    return item;
}
return null;
});
});

```

## Collision
One of the most important features of Quack-Man is collision detection. When the quack man touches a wall, a ghost, or an orb, the game needs to know. This simple yet elegant solution solves the problem for us:
```  
collidesWith(object) {
    return (this.x < (object.x + object.width) &&
         object.x < (this.x + this.width) &&
         this.y < (object.y + object.height) &&
         object.y < (this.y + this.height));
  }
```
## Movement
Paired in with the collision algorithm, much more work needed to be done to achieve smooth, reliable navigation. Direction changes needed to be queued up for when the move is available, as well as not actually changing directions until fully in the next grid square. This prevents any snapping to locations or glitchy movement.

# Future Plans
- Set up Firebase to allow users to add initials and keep track/persist high scores.
- New levels
- Enhance intelligence of ghost movement to actively hunt the quack man.
