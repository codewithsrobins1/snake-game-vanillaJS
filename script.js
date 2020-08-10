import {update as updateSnake, draw as drawSnake, snakeSpeed, getHeadOfSnake, snakeIntoSelf} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGrid} from './grid.js'

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

//Setup Game Loop
function main(currentTime){
    if(gameOver){
        return alert('You lost! Refresh page to start new game.')
    }

    //Tell browser when to render next frame
    window.requestAnimationFrame(main) 

    //Get the number of seconds
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000

    //Calculate Seconds Between each move -- check if secondssincelastrender is less than the time between our renders
    if(secondsSinceLastRender < 1 / snakeSpeed) return

    //Update last render time
    lastRenderTime = currentTime;

    update();
    draw();
}

//Start the Loop
window.requestAnimationFrame(main);


//Update the screen based on actions taken in game
function update(){
    updateSnake();
    updateFood();
    checkGameOver();
}


//Render the items on screen in correct positions
function draw(){
    //Remove Previous Pieces from Snake
    gameBoard.innerHTML = ''
    
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

//Game Over - Snake runs into itself or off grid
function checkGameOver(){
    gameOver = outsideGrid(getHeadOfSnake()) || snakeIntoSelf()
}
