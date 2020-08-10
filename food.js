import { onSnake, expandSnake } from './snake.js'
import {randomGridPosition} from './grid.js'

let food = randomFoodPosition();
const snakeExpand = 1; 

export function update(){
    //Check if Snake is on top of food/eating it
    if(onSnake(food)) {
        //Expand the Snake
        expandSnake(snakeExpand)

        food = randomFoodPosition();
    }
}

export function draw(gameBoard){
    const foodItem = document.createElement('div')
    foodItem.style.gridRowStart = food.y
    foodItem.style.gridColumnStart = food.x
    foodItem.classList.add('food')

    gameBoard.appendChild(foodItem)
}

export function randomFoodPosition(){
    let newFoodPosition;

    //Make sure new food is not on the snake
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition()
    }

    return newFoodPosition;
}