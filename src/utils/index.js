const constructDeck = () => {
    let shapes = ["Diamond", "Oval", "Squiggle"]
    let colors = ["Red", "Purple", "Green"]
    let numbers = [1, 2, 3]
    let shadings = ["Solid", "Striped", "Outlined"]
    let deck = [];
    let position = 0;
    for (let number in numbers)
        for (let shape in shapes)
            for (let color in colors)
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
        for (let i = 0; i < properties.length; ++i) {
            if (!(
                checkDifferentProperty(
                    properties[i], positionOne, positionTwo, positionThree
                ) || checkEqualProperty(
                    properties[i], positionOne, positionTwo, positionThree
                )
            )
            ) {
                return { "result": false, "status": `Check the property ${properties[i]} in the set` }
            }
        }
        return { "result": true }
    }
    return { "result": false }
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
                    let position = areEqual(positionI.position, positionB.position, positionC.position)
                    if (position.result  === true){
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
    for(let i = 0; i < board.length; ++i){
        if(!board[i]){
            let index = generateRandomNumber(deckSize -  i)
            board[i] = deck.splice(index, 1)[0]
        }
    }
    for(let i = board.length; i < size ; ++i){
        let index = generateRandomNumber(deckSize -  i)
        board.push(
            deck.splice(index, 1)[0]
        )
    }
    let solutions = []
    while(solutions.length === 0){
        solutions = solve(board)
        board.pop()
        board.push(
            deck.pop()
        )
    }
    return [board, solutions]
}


export {
    originalDeck, areEqual, constructDeck, getBoard, solve
}