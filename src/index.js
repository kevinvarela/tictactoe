import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.bubblyClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <div className="tablero square" onClick={props.bubblyClick}>
      <div className="square_content--centered square_content unselectable">{props.value}</div>
    </div>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    if(calculateWinner(this.state.squares) == null){
      const squares = this.state.squares.slice();
      if(squares[i] === null){
      squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }
    }
  }

  resetGame(){
    this.setState({
      squares: Array(9).fill(null)
    })
  }

  renderWinnerInformation(squares){
    let winner = calculateWinner(squares);
    if(winner != null){
      return(
        <div> JUEGO TERMINADO EL GANADOR ES ==> "{winner}" </div>
      )
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        bubblyClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const ties = tie(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(ties && !winner) {
      status = 'Tie :('
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (

      <div className="container mt-2 text-center">
      <NewGameButton resetGame={() => this.resetGame()}/>
        <div className="row">
          <div className="col-10 offset-1">
            <div className="filas">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="filas">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="filas">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        </div>
        <div className="status h1 unselectable">{status}</div>
      </div>
    );
  }
}

function tie(squares){
  return squares.every(square => square !== null);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class NewGameButton extends React.Component{
  render(){
    return(
      <div className="new-game unselectable col-5 h3 font-weight-bold" onClick={this.props.resetGame}>
      New Game
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Board/>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />, document.getElementById('root')
);
