import Card from 'components/Card'
import React from 'react';
import './styles.css';
import {originalDeck, getBoard, areEqual } from 'utils'

class Board extends React.Component {

    constructor(props) {
        super(props)
        let deck = [ ...originalDeck]
        let helper = getBoard(deck, 12)
        let board = helper[0]
        console.log(helper)
        this.state = {
            deck: deck,
            board: board,
            selected: [],
            found: [],
            error: null,
            solutions: helper[1]
        }
    }

    componentDidMount(){

    }

    handleSelected(position){
        let selected = this.state.selected
        if(selected.length === 2){
            let result = areEqual(
                this.state.board[selected[0]].position,
                this.state.board[selected[1]].position, 
                this.state.board[position].position
            )
            if(result.result){
                let board = this.state.board
                let positions = [
                    selected[0],
                    selected[1],
                    position
                ]
                let found = this.state.found
                found.push(positions)
                let solutions = this.state.solutions
                for(let i  = 0; i < positions.length; ++i){
                    let helper = []
                    for(let j = 0; j < solutions.length; ++j){
                        if(!solutions[j].includes(positions[i])){
                            helper.push(solutions[j])
                        }
                    }
                    solutions = helper
                    board[positions[i]] = null
                }
                console.log(solutions)
                this.setState({
                    found: found,
                    selected : [],
                    board: board,
                    solutions: solutions
                })
            }
            else{
                this.setState({
                    selected : [],
                    error: result.status
                })
            }
            
        }
        else{
            selected.push(position)
            this.setState({
                error: null,
                selected: selected
            })
        }
       
    }

    render() {
        return (
            <>
                <div className="">
                    {
                        this.state.error
                    }
                </div>
                <div className="board">
                    {
                        this.state.board.map((item, i) => {
                            if(item){
                                return(
                                    <Card 
                                    key={i} 
                                    isSelected={this.state.selected.includes(i)} 
                                    {...item}
                                    handleClick={() => this.handleSelected(i)}
                                ></Card>
                                )
                            }else{
                                return(
                                    <div className="card"></div>
                                )
                            }
                               
                        })
                    }
                </div>
                <div className="messages">
                    Sets posible: {this.state.solutions.length}
                </div>
                <div className="messages">
                    Total cards left: {this.state.deck.length}
                </div>
            </>
        )
    }

}

export default Board