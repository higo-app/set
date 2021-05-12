import Card from 'components/Card'
import React from 'react';
import Modal from 'components/Modal'
import Message from 'components/Message'
import {Link} from 'react-router-dom'
import {originalDeck, getBoard, areEqual,solve } from 'utils'
import './styles.css';

class Board extends React.Component {

    constructor(props) {
        super(props)
        let deck = [ ...originalDeck]
        let helper = getBoard(deck, 12)
        this.state = {
            deck: deck,
            board: helper[0],
            selected: [],
            win:false,
            message: null,
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
            if(
                areEqual(
                    this.state.board[selected[0]].position,
                    this.state.board[selected[1]].position, 
                    this.state.board[position].position
                )
            ){
                let board = this.state.board
                let positions = [
                    selected[0],
                    selected[1],
                    position
                ]
                for(let i  = 0; i < positions.length; ++i){
                    board[positions[i]] = null
                }
                let solutions = solve(board)
                console.log(solutions)
                this.setState({
                    message: "Correct set selected!",
                    selected : [],
                    board: board,
                    solutions: solutions
                })
            }
            else{
                this.setState({
                    selected : [],
                    error: "Incorrect set"
                })
            }
        }
        else{
            if(selected.includes(position)){
                let index = selected.indexOf(position)
                selected.splice(index, 1)
                this.setState({
                    error: null,
                    selected: selected
                })
                
            }
            else{
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
            solutions: helper[1],
            win: helper[1].length  === 0
        })
    }

    render() {

        let modal = (<></>)
        let messages = []
        
        if(this.state.solutions.length === 0 && !this.state.win){
            modal = (
                <Modal>
                    <div className="content title">
                        No sets available!!
                    </div>
                    <button className="Button" onClick={this.reloadBoard}>Shuffle cards</button>
                </Modal>
            )
        }
        if(this.state.win){
            let diference = (Date.now() - this.state.initalTime)
            let seconds = ((Math.floor(diference / 1000)))
            modal = (
                <Modal>
                    <div className="content title">
                        You win!
                    </div>
                    <div className="content">
                        You find all the sets in {seconds} seconds.
                    </div>
                    <div className="content">
                        <button className="Button" onClick={() => {window.location.reload()}}>Play again</button>
                    </div>
                    <div className="content">
                        <Link className="Button" to={"/"}>Go to home</Link>
                    </div>
                </Modal>
            )
        }
        if(this.state.error){
            messages.push(
                <Message
                    key="error-message"
                    message={this.state.error}
                    className="danger"
                    fadeAway={() => this.setState({error: null})}            
                ></Message>
            )
        }
        if(this.state.message){
            messages.push(
                <Message
                    key="message"
                    message={this.state.message}
                    fadeAway={() => this.setState({message: null})}            
                ></Message>
            )
        }
        return (
            <div className="">
                    
                    {
                        messages
                    }
                    {
                        modal
                    }
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
                                    <div className="empty-card" key={i}></div>
                                )
                            }
                               
                        })
                    }
                </div>
                <div className="messages">
                    Sets possible: {this.state.solutions.length}
                </div>
                <div className="messages">
                    Total cards left: {this.state.deck.length}
                </div>
            </div>
        )
    }

}

export default Board