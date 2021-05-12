const constructDeck = () => {
    let shapes = ["diamond", "oval", "squiggle"]
    let colors = ["red", "purple", "green"]
    let numbers = [1, 2, 3]
    let shadings = ["solid", "striped", "outlined"]
    let deck = [];
    let position = 0;
    for (let number in numbers){
        for (let shape in shapes){
            for (let color in colors){
                for (let shading in shadings){
                    deck.push({
                        shape: shapes[shape],
                        color: colors[color],
                        shading: shadings[shading],
                        number: numbers[number],
                        position: position
                    });
                    position += 1
                }
            }
        }
    }
       
    return deck;
}

const generateRandomNumber = (limit) => {
    return  Math.floor(Math.random() * limit); 
}


const checkEqualProperty = (key, positionOne, positionTwo, positionThree) => {
    return (
        originalDeck[positionOne][key] === originalDeck[positionTwo][key] &&
        originalDeck[positionTwo][key] === originalDeck[positionThree][key] &&
        originalDeck[positionOne][key] === originalDeck[positionThree][key]
    )
}


const checkDifferentProperty = (key, positionOne, positionTwo, positionThree) => {
    return (
        originalDeck[positionOne][key] !== originalDeck[positionTwo][key] && 
        originalDeck[positionTwo][key] !== originalDeck[positionThree][key] &&
        originalDeck[positionOne][key] !== originalDeck[positionThree][key]
    )
}



const areEqual = (positionOne, positionTwo, positionThree) => {
    
    const properties = ["shape", "color", "shading", "number"]
    if (positionOne > 0 && positionTwo > 0 && positionThree > 0) {
        for(let property in properties){
            if (!(
                checkDifferentProperty(
                    properties[property], positionOne, positionTwo, positionThree
                ) || checkEqualProperty(
                    properties[property], positionOne, positionTwo, positionThree
                )
            )
            ) {
                return false
            }
        }
       
        return true
    }
    return false
}


const solve = (deck) => {
    let solutions = [];
    for (let i = 0; i < deck.length; i++){
        for (let b = i + 1; b < deck.length; b++){
            for (let c = b + 1; c < deck.length; c++){
                let positionI = deck[i]
                let positionB = deck[b]
                let positionC = deck[c]
                if(positionI && positionB && positionC){
                    if (areEqual(positionI.position, positionB.position, positionC.position)){
                        solutions.push([i, b, c]);
                    }
                }
            }
        }
    }      
    return solutions;
};

const originalDeck = constructDeck();

const getBoard = (deck, size, board = []) => {
    let deckSize = deck.length
    while(board.length > 0){
        let item = board.pop()
        if(item){
            deck.push(item)
        }
    }
    for(let i = 0; i < size ; ++i){
        let index = generateRandomNumber(deckSize -  i)
        board.push(
            deck.splice(index, 1)[0]
        )
    }
    let solutions = []
    let counter = 0
    while(solutions.length === 0 && deck.length > 0 && counter < 5){
        solutions = solve(board)
        deck.push(board.pop())
        board.push(deck.pop())
        counter += 1
    }
    if(counter >= 5){
        return getBoard(deck, size, board)
    }
    console.log(solutions)
    return [board, solutions]
}


export {
    originalDeck, areEqual, constructDeck, getBoard, solve
}