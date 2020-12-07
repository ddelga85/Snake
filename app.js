let grid = $('.grid')

let snake = [
                { x: 16, y: 16 },            
            ]
let worm = { x: 5,
             y: 16,
             src: '11.png',
            }
let direction;
let points = 0;
let highScore = 0;
let speed = 250

$('.instructions').text('Use WASD for controls')
$('.startButton').on('click', tick )
renderSnake();
renderWorm();

function tick(){  
   gameSpeed = setInterval(updateGame, speed) 
   updateGame();
   direction = "UP"
}

function initialState(){
  $('.instructions').text('Use WASD for controls')
  grid.children().removeAttr('class').removeAttr('src');
    snake = [
    { x: 16, y: 16 },            
    ]
    worm = { 
      x: 5,
      y: 16,
      src: '11.png',
    }
    direction;
    points = 0;
    speed = 250;
    updateGame();
    clearTimeout(gameSpeed);

}
function updateScore(){
  $('.points').text('Points: ' + points);
  if(points >= highScore){
    highScore = points;
    $('.high').text('High Score: ' + points)
  }
  
}

function updateGame(){
  updateScore();
  updateSnake();  
  selfCollision();
  wallCollision();
  checkWormEaten();
  $('.grid').children().removeClass('style');
  renderSnake();
  renderWorm();
  
  
}

function renderWorm(){
  const WORM_ELEMENT = document.createElement("IMG");
  $(WORM_ELEMENT).attr('class', 'worm');
  $(WORM_ELEMENT).attr('src', worm.src);
  $(WORM_ELEMENT).css('gridRowStart', worm.x);
  $(WORM_ELEMENT).css('gridColumnStart', worm.y);
  grid.append(WORM_ELEMENT);
}

function updateSnake(){    
  snakePosition();
  $('.grid').children().remove();
  renderSnake();    
}

function wormPosition(){      
  worm.x = Math.floor(Math.random() * 31) + 1;
  worm.y = Math.floor(Math.random() * 31) + 1;
  worm.src = (Math.floor(Math.random() * 4) + 11) + '.png';
  for(let i=1; i<snake.length; i++){
    snakeX = snake[i].x;
    snakeY = snake[i].y;
    if(snakeX === worm.x && snakeY === worm.y){
      console.log('redo');
      wormPosition();
    }
  }       
}

function snakePosition(){
  switch(direction){
      case "UP":
          snake.unshift({ x: snake[0].x - 1, y: snake[0].y})
          snake.pop();
          break;
      case "DOWN":
          snake.unshift({ x: snake[0].x + 1, y: snake[0].y})
          snake.pop();
          break;
      case "LEFT":
          snake.unshift({ x: snake[0].x, y: snake[0].y - 1})
          snake.pop();
          break;
      case "RIGHT":
          snake.unshift({ x: snake[0].x, y: snake[0].y + 1})
          snake.pop();
          break;
  }
}

function renderSnake(){
  for(let i=0; i<snake.length; i++){
      const SNAKE_ELEMENT = document.createElement('div');
      $(SNAKE_ELEMENT).attr('id', 'snake');
      $(SNAKE_ELEMENT).css('gridRowStart', snake[i].x);
      $(SNAKE_ELEMENT).css('gridColumnStart', snake[i].y);               
      switch(snake[i]){
          case snake[0]:
              $(SNAKE_ELEMENT).attr('id','snakeHead');
              break;
          // case snake[snake.length - 1]:
          //     $(SNAKE_ELEMENT).attr('id','snakeTail');                
          //     break;
      }
      
      grid.append(SNAKE_ELEMENT);
      
      
  }
}

$(window).on('keydown', function (event) {
  switch (event.originalEvent.code){
      case (direction !== "DOWN" && "KeyW"):
          direction = "UP"
          break;
      case (direction !== "UP" && "KeyS"):
          direction = "DOWN"
          break;
      case (direction !== "RIGHT" && "KeyA"):
          direction = "LEFT"
          break;   
      case (direction !== "LEFT" && "KeyD"):            
          direction = "RIGHT"
          break;
  }
  
})

function selfCollision(){
  for(let i=1; i<snake.length; i++){ 
    if( snake[i].x === snake[0].x && snake[i].y === snake[0].y  ){
      initialState();

      alert("GAME OVER - Stop hitting yourself!!!") 
    }
  }
}
function wallCollision(){     
    if (snake[0].x <1 || snake[0].x >31 || snake[0].y <1 || snake[0].y >31){ 
      initialState();  
      alert("GAME OVER - UMMM....That's a wall!")       
    }
}
  

function checkWormEaten(){
          if( snake[0].x === worm.x && snake[0].y === worm.y){
              switch(worm.src){
                case '11.png':
                  $('.instructions').text('\+ 50pts & Speed Increased!')
                  speed-=20;
                  if(speed < 40){
                    speed = 40;
                  }
                  points+=50;
                  clearTimeout(gameSpeed);
                  gameSpeed = setInterval(updateGame, speed)                   
                  break;                
                case '12.png':
                  $('.instructions').text('\+ 20pts!')
                  points+=20;
                  break;                
                case '13.png':
                  $('.instructions').text('\+ 20pts!')
                  points+=20;
                  break;                
                case '14.png':
                  $('.instructions').text('\+ 100pts & Extra Length Increase!')
                  snake.push(snake[snake.length-2])
                  snake.push(snake[snake.length-1])
                  points+=100;
                  break;                 
              }
              wormPosition();
              $('.grid').children().removeAttr('class').removeAttr('src');
              snake.push(snake[snake.length-1])
              
              
              

            }         
};
