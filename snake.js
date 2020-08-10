import { getInputDirection } from "./keyboardInput.js";

export const snakeSpeed = 6; //how many times snake moves / second

//array of x,y positions
const snakeBody = [
    {x: 13, y: 13},
]; 
let newSegments = 0;

//To get blocks to follow head, shift array up 1, and setting the head to be the correct position
//take position of given segment and segment after that is now going to move into that new position

export function update(){
    addSegments();

    const inputDirection = getInputDirection()

    //Loop through every segment except the last segment - Note: Last part of snake disappears
    for (let i = snakeBody.length - 2; i >= 0; i--){
        //Take last element and set it to the current position -- shifting snake
        snakeBody[i + 1] = { ...snakeBody[i]} //element before the one selected; i is going to equal the second to last element ; i + 1 is the last
    }

    //Update the Head Based 
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')

        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function onSnake(position, {ignoreSnakeHead = false} = {}) {
    //Check to see if the food is on the snakebody - Compare if positions are equal
    return snakeBody.some((segment, index) => {
        //Ignore the snake head completely
        if(ignoreSnakeHead && index === 0) return false     //index === 0 means on the head

        //if the food and snake positions are the same - returns true;
        return equalPositions(segment, position)   
    })
}


export function getHeadOfSnake(){
    return snakeBody[0];
}

export function snakeIntoSelf(){
    //Determine if Snake Head is touching any other part of body - Need to Ignore the Head of the Snake 
    return onSnake(snakeBody[0], {ignoreSnakeHead: true})
}


//Check to see if the Snakebody and Food Position are Equal
function equalPositions(position1, position2){
    return position1.x === position2.x && position1.y === position2.y
}

//Take New Segments and Add to End of Snakebody
function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({
            ...snakeBody[snakeBody.length - 1] //Duplicate last element of snack and add to the end
        })
    }

    //To prevent snakebody adding more elements
    newSegments = 0;
}