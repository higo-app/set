import Card from 'components/Card'
import React from 'react';
import './styles.css';
import {originalDeck, getBoard, areEqual,solve } from 'utils'
import Modal from 'components/Modal'

class Board extends React.Component {

    constructor(props) {
        super(props)
        let deck = [ ...originalDeck]
        let helper = getBoard(deck, 12)
        console.log(helper)
        this.state = {
            deck: deck,
            board: helper[0],
            selected: [],
            found: [],
            error: null,
            initalTime: new Date(),
            solutions: helper[1]
        }
        this.handleSelected = this.handleSelected.bind(this)
        this.reloadBoard = this.reloadBoard.bind(this)
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
                for(let i  = 0; i < positions.length; ++i){
                    board[positions[i]] = null
                }
                let solutions = solve(board)
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
            if(!selected.includes(position)){
                selected.push(position)
                this.setState({
                    error: null,
                    selected: selected
                })
            }
        }
       
    }

    reloadBoard(){
        let board = this.state.board
        let helper = getBoard(this.state.deck, 12, board)
        this.setState({
            board: helper[0],
            solutions: helper[1]
        })
    }

    render() {
        return (
            <>
                <div className="">
                    {
                        this.state.error
                    }
                    {
                        (this.state.solutions.length !== 0) ? (null) : 
                        (
                            <Modal 
                                message="There´s no more set posible, tap ok to refresh"
                                action={this.reloadBoard}
                            ></Modal>
                        )
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