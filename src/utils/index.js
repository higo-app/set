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
    console.log(deck)
    let solutions = [];
    for (let a = 0; a < deck.length; a++)
      for (let b = a + 1; b < deck.length; b++)
        for (let c = b + 1; c < deck.length; c++){
            let position = areEqual(deck[a].position, deck[b].position, deck[c].position)
            if (position.result  === true){
                solutions.push([a, b, c]);
            }
        }
            
         
    console.log(solutions)
    return solutions;
};

const originalDeck = constructDeck();

const getBoard = (deck, size) => {
    let result = []
    let deckSize = deck.length
    for(let i = 0; i < size ; ++i){
        let index = generateRandomNumber(deckSize -  i)
        result.push(
            deck.splice(index, 1)[0]
        )
    }
    let solutions = []
    while(solutions.length === 0){
        solutions = solve(result)
    }
    return [result, solutions]
}


export {
    originalDeck, areEqual, constructDeck, getBoard, solve
}