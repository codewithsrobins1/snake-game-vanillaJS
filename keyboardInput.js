let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

//Keydown events
window.addEventListener('keydown', e => {
    switch (e.key){
        case 'ArrowUp':
            if(lastInputDirection.y !== 0) break //if currently moving up or down, ignore the move up order
            inputDirection =  { x: 0, y: -1}
            break
        case 'ArrowDown':
            if(lastInputDirection.y !== 0) break
            inputDirection =  { x: 0, y: 1}
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !== 0) break //if currently moving left or right, ignore the move up order
            inputDirection =  { x: -1, y: 0}
            break
        case 'ArrowRight':
            if(lastInputDirection.x !== 0) break
            inputDirection =  { x: 1, y: 0}
            break
    }
})

export function getInputDirection(){
    //Last Input To Check - Store previous direction to prevent snake from going back into itself
    lastInputDirection = inputDirection

    return inputDirection
}