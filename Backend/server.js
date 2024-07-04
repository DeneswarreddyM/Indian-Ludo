const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());


//initial elements in a game;
const firstplayerroute = [4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 13, 20, 27, 34, 41, 40, 39, 38, 37, 30, 23, 16, 9, 10, 11, 12, 19, 26, 33, 32, 31, 24, 17, 18, 25];
const secondplayerroute = [46, 47, 48, 49, 42, 35, 28, 21, 14, 7, 6, 5, 4, 3, 2, 1, 8, 15, 22, 29, 36, 43, 44, 45, 37, 30, 23, 16, 9, 10, 11, 12, 13, 20, 27, 34, 41, 40, 39, 38, 31, 24, 17, 18, 19, 26, 33, 32, 25];

let circledie = 6;
let squaredie = 6;
let temp;
let lifes = 0;
let kills = 0;
let pos = [];
for (let i = 0; i < 7; i++) {
    pos[i] = []
    for (let j = 0; j < 7; j++) {
        pos[i][j] = { circle: 0, square: 0 };
    }
}
const firstplayer = { name: 'player1' };
const secondplayer = { name: 'player2' };
let myplayer = firstplayer;

const calculatesteps = () => {
    let steps = 0;
    let x = parseInt(temp[0].first, 10);
    let y = parseInt(temp[0].second, 10);

    if (x === 0 && y === 0) {
        steps = 12;
    }
    else if ((x === 1 && y === 0) || (x === 0 && y === 1)) {
        steps = 1;
    }
    else {
        steps = x + y;
    }
    return steps;
}

const funcmakealive=(step)=>{
    if(step===1){
        if(myplayer===firstplayer){
          pos[0][3].circle+=1;
          circledie-=1;
        }
        else{
          pos[6][3].square+=1;
          squaredie-=1;
        }
    }
    else if(step===5){
        if(myplayer===firstplayer){
            if(circledie<=5){
                pos[0][3].circle+=circledie; 
                circledie=0;
            }
            else{
                pos[0][3].circle+=circledie;
                circledie=1;
            }
        }
        else{

        }
    }
    else if(step===6){
        if(myplayer===firstplayer){
            pos[0][3].circle+=circledie;
            circledie=0;
        }
        else{
            pos[6][3].square+=squaredie;
            circledie=0;
        }
    }

}
const finalmove = (destiny, currentbox) => {
    let x = destiny, y = currentbox;
    x = x - 1;
    y = y - 1;
    let row1 = Math.floor(x / 7);
    let col1 = Math.floor(x % 7);
    let row2 = Math.floor(y / 7);
    let col2 = Math.floor(y % 7);

    if (myplayer === firstplayer) {
        if (destiny === 4 || destiny === 9 || destiny === 13 || destiny === 18 || destiny === 22 || destiny === 24 || destiny === 25 || destiny === 26 || destiny === 28 || destiny === 32 || destiny === 37 || destiny === 41 || destiny === 46
        ) {
            pos[row1][col1].circle -= 1;
            pos[row2][col2].circle += 1;
        } else {
            if (pos[row2][col2].circle === 0 && pos[row2][col2].square === 0) {
                pos[row1][col1].circle -= 1;
                pos[row1][col1].circle += 1;
            }
            else if (pos[row2][col2].square === 1) {
                pos[row1][col1].circle -= 1;
                pos[row2][col2].circle += 1;
                pos[row2][col2].square -= 1;
                squaredie+=1;
                kills += 1;
            }
        }
    }
    else {
        if (destiny === 4 || destiny === 9 || destiny === 13 || destiny === 18 || destiny === 22 || destiny === 24 || destiny === 25 || destiny === 26 || destiny === 28 || destiny === 32 || destiny === 37 || destiny === 41 || destiny === 46
        ) {
            pos[row1][col1].square -= 1;
            pos[row2][col2].square += 1;
        } else {
            if (pos[row2][col2].circle === 0 && pos[row2][col2].square === 0) {
                pos[row1][col1].square -= 1;
                pos[row1][col1].square += 1;
            }
            else if (pos[row2][col2].circle === 1) {
                pos[row1][col1].square -= 1;
                pos[row2][col2].square += 1;
                pos[row2][col2].circle -= 1;
                circledie+=1;
                kills += 1;
            }
        }
    }
}


//next step from existing data
const updatenext = (obj, makealive) => {
    let currentbox = obj;
    obj = obj - 1;
    let row = Math.floor(obj / 7);
    let column = obj % 7;
    console.log(temp[0].first, "   ", temp[0].second);
    console.log(row, "   ", column, " = ", obj);
    const step = calculatesteps();
    console.log(step);


    if (step === 1 || step === 5 || step === 6 || step === 12) {
        lifes = lifes + 1;
    }

    if(makealive===true){
        funcmakealive(step);
    }
    if (myplayer === firstplayer) {
        let moves = step;
        let flag = false;
        let destiny = -1;
        for (let i = 0; i < firstplayerroute.length; i++) {
            if ((currentbox === firstplayerroute[i]) || flag === true) {
                moves = moves - 1;
            }
            if (moves === -1) {
                destiny = firstplayerroute[i];
                break;
            }
        }
        if (destiny != -1) {
            console.log(destiny);
            finalmove(destiny, currentbox);
        }
    }
    else {
        for (let i = 0; i < secondplayerroute.length; i++) {
            let moves = step;
            let flag = false;
            let destiny = -1;
            if ((currentbox === secondplayerroute[i]) || flag === true) {
                moves = moves - 1;
            }
            if (moves === -1) {
                destiny = secondplayerroute[i];
            }
        }
        if (destiny != -1) {
            console.log(destiny);
            finalmove(destiny, currentbox);
        }
    }
    if(lifes!=0){
        lifes=-1;
    }
    else if(kills!=0){
        kills-=1;
    }
    else{
        if(myplayer===firstplayer){
            myplayer=firstplayer;
        }
        else{
            myplayer=secondplayer;
        }
    }    
    return pos;
}



const dicefilePath = path.join(__dirname, 'files', 'product.json');
let dicefile;
try {
    dicefile = JSON.parse(fs.readFileSync(dicefilePath));
} catch (err) {
    console.error("Error reading or parsing the JSON file:", err);
    process.exit(1); // Exit the application with an error code
}

const calculate = () => {
    dicefile[0].first = Math.floor(Math.random() * 4).toString();
    dicefile[0].second = Math.floor(Math.random() * 4).toString();
    // console.log("Modified dicefile:", dicefile);
    return dicefile;
};

// Routes
app.get('/', (req, res) => {
    res.send("Hello Harry Bhayya");

});

app.get('/calculate', (req, res) => {
    temp = calculate();

    res.json(JSON.stringify(temp));
});

app.post('/process', (req, res) => {
    let makealive = req.body.makealive;
    updatenext(req.body.position, makealive);
    const combined = {
        array: pos,
        ...myplayer
    };

    const jsonString = JSON.stringify(combined, null, 2);
    res.json(jsonString);
});

// Handle 404
app.use((req, res) => {
    res.status(404).send("Not Found");
});

// Start the server
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server has started on port ${PORT}`);
});
