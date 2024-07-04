import { useEffect, useState } from 'react'
import './App.css'
import Square from './square/square.jsx'


const renderFrom = new Array(7);
for (let i = 0; i < 7; i++) {
  renderFrom[i] = new Array(7);
}
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 7; j++) {
    renderFrom[i][j] = i * 7 + j + 1;
  }
}

let player1 = "harry";
let player2 = "rahul";
//let player = player1;
const App = () => {
  const [gameState, setGameState] = useState(renderFrom);
  const [player,setPlayer]=useState("player1");
  const [makealive,setmakealive]=useState(false);
  // const [childValue, setChildValue] = useState(0);
  useEffect(()=>{
       let p=document.querySelector('.player')
       if(player==="player1"){
          p.innerHTML=player1;
          //console.log({player1});
       }
       else{
         p.innerHTML=player2;
       }
  },[player]);

  const makelive=()=>{
    setmakealive(true);
  }
  const calldice = () => {
    //Fetch data from the server
    // Data to be sent to the server
    const dataToSend = {
      value1: 6,
      value2: 10
    };


    fetch('http://127.0.0.1:3000/calculate')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        // Log the response from the server
        // console.log('Processed Data:', data);
        data = JSON.parse(data);
        // Example of updating the DOM with the received data
        let num1 = document.querySelector('.leftdice img');
        let num2 = document.querySelector('.rightdice img');
        num1.setAttribute("src", "./images/dice" + data[0].first + ".svg");
        num2.setAttribute("src", "./images/dice" + data[0].second + ".svg");
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const handleChildValueChange = (value) => {
    console.log(`the value of the square ${value}`)
    // setChildValue(value);

    let x={
      position:value,
      makealive:false
    };
    x.makealive=makealive;
    // Send data to the server using a POST request
    fetch('http://127.0.0.1:3000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(x)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        data=JSON.parse(data);
        setPlayer(data.name);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  };
  return (
    <>
      <h1 className="heading">Indian Ludo</h1>
      <div className="arena">
        <div className="middlearena">
          <div className="top">
            <div className="player1name">{player1}</div>
          </div>

          <div className="box">
            {
              gameState.map((arr, rowindex) =>
                arr.map((val, colindex) => {
                  return <Square
                    onButtonClick={handleChildValueChange}
                    value={val}
                    key={rowindex * 7 + colindex + 1}
                  />
                })
              )
            }
          </div>

          <div className="below">
            <div className="player3name">{player2}</div>
            <button className="makealive" onClick={makelive}>Makealive</button>
          </div>

          {/* <div className="player">rama</div> */}
          <button className="player" onClick={calldice}></button>
          <div className="dice">
            <div className="leftdice">
              <img src="./images/dice1.svg" alt="" />
            </div>
            <div className="rightdice">
              <img src="./images/dice1.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
