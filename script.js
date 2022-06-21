
let snakeBody = [
   {x: 160, y: 140},
   {x: 140, y: 140},
   {x: 120, y: 140},
   {x: 100, y: 140}
];

let score = 0;
let changing_direction = false;
let pos_x_food;
let pos_y_food;
let x_step = 20;
let y_step = 0;

let left = document.querySelector("#left");
let bottom = document.querySelector("#bottom");
let right = document.querySelector("#right");
let up = document.querySelector("#top");

const gametable = document.getElementById("gametable");
const gametable_2d = gametable.getContext("2d");

chooseFood();
startGame();

document.addEventListener("keydown", controlDirection);
document.getElementById("start").onclick = function play() {
   document.getElementById("start").setAttribute("disabled", "");
   setInterval(startGame, 100);
}

function startGame() {
   if (statusGame()) {
      gametable_2d.font = "85px Times New Roman";
      gametable_2d.fillStyle = "red";
      gametable_2d.textAlign = "center";
      gametable_2d.fillText("You Lost!", gametable.width / 2, gametable.height / 2);
      return;
   }
   changing_direction = false;
   resetGameTable();
   makeFood();
   move_snake();
   buildSnake();
}

function resetGameTable() {
   gametable_2d.clearRect(0, 0, gametable.width, gametable.height);
}

function makeFood() {
   gametable_2d.fillStyle = '#d7ea27';
   gametable_2d.strokeStyle = 'black';
   gametable_2d.fillRect(pos_x_food, pos_y_food, 20, 20);
   gametable_2d.strokeRect(pos_x_food, pos_y_food, 20, 20);
}

function statusGame() {
   for (let i = 4; i < snakeBody.length; ++i) {
      if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y) {
         return true;
      }
   }
   if (snakeBody[0].x < 0 || snakeBody[0].x == gametable.width || snakeBody[0].y < 0 || snakeBody[0].y == gametable.height) {
      return true;
   }
}

function chooseFood() {
   pos_x_food = Math.round(Math.random() * 19) * 20;
   pos_y_food = Math.round(Math.random() * 19) * 20;
   snakeBody.forEach(function is_snake_there(piece) {
      if (piece.x == pos_x_food && piece.y == pos_y_food)
         chooseFood();
   });
}

function controlDirection(key) {
   const left_key_code = 37;
   const right_key_code = 39;
   const up_key_code = 38;
   const down_key_code = 40;

     if (changing_direction) 
        return;
     changing_direction = true;
   const pressed_key = key.keyCode;
   if (pressed_key === left_key_code && x_step == 0) {
      x_step = -20;
      y_step = 0;
   }
   if (pressed_key === up_key_code && y_step == 0) {
      x_step = 0;
      y_step = -20;
   }
   if (pressed_key === right_key_code && x_step == 0) {
      x_step = 20;
      y_step = 0;
   }
   if (pressed_key === down_key_code && y_step == 0) {
      x_step = 0;
      y_step = 20;
   }
}

up.addEventListener("click", function () {
   if (y_step == 0) {
      x_step = 0;
      y_step = -20;
   }
});

bottom.addEventListener("click", function () {
   if (y_step == 0) {
      x_step = 0;
      y_step = 20;
   }
});

left.addEventListener("click", function () {
   if (x_step == 0) {
      x_step = -20;
      y_step = 0;
   }
});

right.addEventListener("click", function () {
   if (x_step == 0) {
      x_step = 20;
      y_step = 0;
   }
});

function move_snake() {
   const new_head_snake = {
      x: snakeBody[0].x + x_step, y: snakeBody[0].y + y_step
   };
   snakeBody.unshift(new_head_snake);
   const has_eaten = snakeBody[0].x === pos_x_food && snakeBody[0].y === pos_y_food;
   if (has_eaten) {
      score += 5;
      document.getElementById('score').innerHTML = "Score: " + score;
      chooseFood();
   } else {
      snakeBody.pop();
   }
}

function buildSnake() {
   snakeBody.forEach(function draw(partSnake) {
      gametable_2d.fillStyle = '#1E90FF';
      gametable_2d.strokeStyle = '#E9967A';
      gametable_2d.fillRect(partSnake.x, partSnake.y, 20, 20);
      gametable_2d.strokeRect(partSnake.x, partSnake.y, 20, 20);
   });

   gametable_2d.fillStyle = '#eb392b';
   gametable_2d.fillRect(snakeBody[0].x, snakeBody[0].y, 20, 20);


}