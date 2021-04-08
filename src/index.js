import React, {useState} from 'react';
import ReactDOM from 'react-dom';



import './index.css';

const Square = (props) => {
  
  return (
    <button 
    className="square"
    onClick={props.onClicktEvent}
    >
      
      {props.value}
    </button>
  );
};


const Board = () => {

  const initialSqueres= Array(9).fill(null);
const [squares, setSquare] = useState(initialSqueres);
const [xIsNext, setXIsNext]= useState(initialSqueres);

const handleClickEvent = (index) => {
  const newSquare = [...squares];
  const winnerDeclared = Boolean(calcularGanador(newSquare));
  const squareFilled = Boolean(newSquare[index]);
  if (winnerDeclared || squareFilled){
    return ;
  }
  newSquare[index]=xIsNext ? 'X' : 'O';
  setSquare(newSquare);
  setXIsNext(!xIsNext);
};

  const rederSquare = (index) =>{
    return(
      <Square
       value={squares[index]}
      onClicktEvent={() => {handleClickEvent(index)}}
      />
    );

    };
    const winner = calcularGanador(squares);
    const status = winner ?
    `Ganador: ${winner}` :
    `siguiente jugador: ${xIsNext ? 'X' : 'O'}`; 
  return (
    <div>
    <div>
    <div className="status">{status}</div>
      <div className="board-row">
        {rederSquare(0)}{rederSquare(1)}{rederSquare(2)}
      </div>
      <div className="board-row">
        {rederSquare(3)}{rederSquare(4)}{rederSquare(5)}
      </div>
      <div className="board-row">
        {rederSquare(6)}{rederSquare(7)}{rederSquare(8)}
      </div>

    </div>
    

    </div>
  );

};




const Game = () => {
  return (
    <div className="game">
      EL Gato
      <Board />
      
    </div>
    
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calcularGanador(squares){
  const lineas = [
[0,1,2],[3,4,5],[6,7,8], /*columnas*/
[0,3,6],[1,4,7],[2,5,8], /*filas*/
[0,4,8],[6,4,2], //diagonales

  ];
  for(let line of lineas){
    const [a,b,c]=line;

    if(squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}