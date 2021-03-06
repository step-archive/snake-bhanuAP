let snake=undefined;
let food=undefined;
let numberOfRows=60;
let numberOfCols=120;

let animator=undefined;

const animateSnake=function() {
  let oldHead=snake.getHead();
  let oldTail=snake.move();
  let head=snake.getHead();
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(head.isSameCoordAs(food)) {
    snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(food);
  }
  if(hasSnakeHitWall(head)) {
    endGame();
  }
}

const endGame = function() {
  location.reload();
}

const hasSnakeHitWall = function(head) {
  let x = head.x;
  let y = head.y;
  if(x == 119 && y >=0 && y <=60 && head.direction == 'east') {
    return true;
  } else if(x == 0 && y >=0 && y <=60 && head.direction == 'west') {
    return true;
  } else if(y == 0 && x >=0 && x <=120 && head.direction == 'north') {
    return true;
  } else if(x >= 0 && x <=120 && y==59 && head.direction == 'south') {
    return true;
  }
  return false;
}

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();

  snake=new Snake(head,body);
}

const createFood=function(numberOfRows,numberOfCols) {
  food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
}

window.onload=startGame;
