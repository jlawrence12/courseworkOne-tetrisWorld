/*

Author: Jovanie Lawrence 
Project: Coursework one
Date: 14 Decemeber 2017

Description: The is code that is programming tetris for the coursework one. 
*/

//The declaration of all global variables that will be used throughout the game
var context,
    pause,
    canvas,
    level = 1,
    nextCanvas,
    xPos = 0,
    yPos = 0,
    gameover = false,
    themeMusic,
    gameOverMusic,
    arrayOfBlocks,
    matrix,
    dropCounter = 0,
    dropSpeed = 1000,
    lastTime = 0,
    gameArena,
    nextContext,
    piece,
    tBlock,
    iBlock,
    jBlock,
    zBlock,
    sBlock,
    oBlock,
    lBlock,
    playing,
    swap,
    timeInterval,
    gamePlay = false,
    start = null,
    stopWatch,
    currentPiece,
    stopMainGameLoop,
    nextPiece;

if (sessionStorage.loggedIn == true) {
    initialGame();
}


//This object enable key preess to be managed by the function 'hanldeKeyPress'.
window.onkeydown = handleKeyPress;

//Declare and import background music.
themeMusic = new Audio("tetris.mp3");
gameOverMusic = new Audio("gameOver.mp3")

function gameFrame() {
    pause = false;

    //Access the canvas as defined in the html document 
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    nextCanvas = document.getElementById('preview');

    //Access an object that provides various mathods and properties for canvas manipulation 
    nextContext = nextCanvas.getContext('2d');

    /*The below is canvas styling where I draw a rectangle, colour it and placed text and position it on the canvas
    styles tje main context and the 'nextContext' */

    nextContext.fillStyle = "#000";
    nextContext.fillRect(0, 0, canvas.width, canvas.height);
    nextContext.font = "20px arial";
    nextContext.fillStyle = "#3877FF";
    nextContext.fillText("Next", 20, 20);

    //Call the function 
    tetrominoPieces();

    //Play the background music 
    themeMusic.play();
}

//Call the function 
gameFrame();

//Scale the drawings of the tetromino pieces by increasing width and height
context.scale(30, 10);
nextContext.scale(20, 10);


function initialGame() {
    getRandomPiece();
    dropSpeed = 1000;
    gameover = false;
    pause = false;
    gameFrame();
    updateScore();
    createGameMatrix();
    themeMusic.play();
    requestAnimationFrame(mainGameLoop);
    gameTimer();
    draw();

}


//Establish all the layout property of each piece.
function tetrominoPieces() {

    /*This array will provide the properties of the 'tBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    tBlock = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];

    /*This array will provide the properties of the 'iBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    iBlock = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
    ];

    /*This array will provide the properties of the 'jBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    jBlock = [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
    ];

    /*This array will provide the properties of the 'zBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    zBlock = [
        [4, 4, 0],
        [0, 4, 4],
        [0, 0, 0],
    ];

    /*This array will provide the properties of the 'sBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    sBlock = [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ];

    /*This array will provide the properties of the 'oBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    oBlock = [
        [6, 6],
        [6, 6],
    ];

    /*This array will provide the properties of the 'lBlock' piece
    what is not 0 will be coloured and drawn on the canvas */
    lBlock = [
        [7, 0, 0],
        [7, 0, 0],
        [7, 7, 0],
    ];
}

/* This function will compare the yAxis and the current piece on the canvas to check whether if it possible 
for the piece to continue moving down. Remember, the height of the matrix is 15m therefore if the piece's 
position equals this amount then it will stopMainGameLoop. Otherwise, it will stopMainGameLoop if it encounters another piece on the
canvas, otherwise i will continue.   */

function PieceCollision(gameArena, piece) {
    var [randomPiece, location] = [piece.currentPiece, piece.pos];
    for (var y = 0; y < randomPiece.length; ++y) {
        for (var x = 0; x < randomPiece[y].length; ++x) {
            if (randomPiece[y][x] !== 0 &&
                (gameArena[y + location.yPos] &&
                    gameArena[y + location.yPos][x + location.xPos]) !== 0) {
                return true;

            }
        }
    }
    return false;
}



/* The function 'createMatrix' creates columns and rows as for the piece to trsavel on. 15 columns on the yAxis 
to represent the height and 10 rows on the xAxis to represent the width of the matrix. I stored the elemenents 
in an array and initialised them to 0. */
function createGameMatrix() {
    gameArena = new Array();
    for (var h = 0; h < 15; h++) {
        gameArena[h] = new Array();
        for (var w = 0; w < 10; w++) {
            gameArena[h][w] = 0;

        }
    }
}

//Call the function 
createGameMatrix();


/* The below function copies all properties of the object of peices and store them in the 
'gameArena' at the current x and y aXis    */
function mergePieceArena(gameArena, pc) {
    for (var i = 0; i < pc.currentPiece.length; i++) {
        for (var j = 0; j < pc.currentPiece[i].length; j++) {
            if (pc.currentPiece[i][j] !== 0)
                gameArena[pc.pos.yPos + i][pc.pos.xPos + j] = pc.currentPiece[i][j];
        }
    }
}


/* I stored all the seven pieces in an array and I applied a random function 
and stored the result after being randomised into an array     */
arrayOfPieces = [tBlock, iBlock, jBlock, zBlock, sBlock, oBlock, lBlock, ];
currentPiece = arrayOfPieces[Math.floor(Math.random() * arrayOfPieces.length)];


/* This function takes the randomised pieces and store them in an array. It randommises the next
piece firstly, then it produce the next piece as the current piece.     */
function getRandomPiece() {

    piece.currentPiece = piece.nextPiece;
    piece.nextPiece = arrayOfPieces[Math.floor(Math.random() * arrayOfPieces.length)];
    arrayOfPieces[piece.nextPiece];

    piece.pos.yPos = 0;
    piece.pos.xPos = (gameArena[0].length / 2 | 0) -
        (piece.currentPiece[0].length / 2 | 0);

}

/* The 'drawTetrominoes' function loops through the array of random peices, colomns and rows and 
then whatever elenent in the array if not 0 then it will apply colours to it. THE function takes in the currentpiece, 
the position oon the canvas and I names the specific canvas which in this case is 'context'.
*/
function drawTetrominos(currentPiece, position, context) {
    for (var y = 0; y < currentPiece.length; y++) {
        for (var x = 0; x < currentPiece[y].length; x++) {
            if (currentPiece[y][x] !== 0) {
                switch (currentPiece[y][x]) {
                    case 1:
                        context.fillStyle = '#FF0D72'; //Colour of the tBlock
                        break;
                    case 2:
                        context.fillStyle = '#0DC2FF'; //Colour of the iBlock
                        break;
                    case 3:
                        context.fillStyle = '#0DFF72'; //Colour of the jBlock
                        break;
                    case 4:
                        context.fillStyle = '#F538FF'; // Colour of the zBlock
                        break;
                    case 5:
                        context.fillStyle = '#FF8E0D'; //Colour of the sBlock
                        break;
                    case 6:
                        context.fillStyle = '#FFE138'; //Colour of the oBlock
                        break;
                    case 7:
                        context.fillStyle = '#3877FF'; //Colour of the lBlock
                        break;
                }
                context.shadowBlur = 20;
                context.shadowColor = '#000';
                context.fillRect(x + position.xPos, y +
                    position.yPos, 1, 1);

            }
        }
    }

}

//Call this function to draw the next piece on the 'nextContext' which previews the upcoming piece.
function drawNextTetrominos() {
    drawTetrominos(piece.nextPiece, {
        xPos: 6,
        yPos: 6
    }, nextContext);

}

/* The 'draw' is a very important function because it redraws the pieces and rectangles repeatedly,
therefore the colours do not smudge. I drew rectagles repeatedly for both canvases */
function draw() {

    //LogInStatus();
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    nextContext.fillStyle = "#000";
    nextContext.fillRect(0, 0, canvas.width, canvas.height);
    nextContext.font = "20px arial";
    nextContext.fillStyle = "#3877FF";
    nextContext.fillText("Next", 20, 20);

    drawTetrominos(gameArena, {
        xPos: 0,
        yPos: 0
    }, context);
    drawTetrominos(piece.currentPiece, piece.pos, context);
    drawNextTetrominos();

    // If a peice cilldes with the game arena then call the game over function and stop the game.
    if (PieceCollision(gameArena, piece)) {
        gameOver();
    }
}


/* 'mainGameLoop' controls the timing and intervals that the peices going down the canvas */
function mainGameLoop(timeStamp = 0) {
    gamePlay = true;
    var progress = timeStamp - start;
    start = timeStamp;

    dropCounter += progress;
    if (dropCounter > dropSpeed) {
        movePieceDown();
    }
    draw();

    /*I used requestAnimationFrame becuase it gave a more swift movement for the peices. I also stored it 
    a variable so it could be reused.*/
    stopMainGameLoop = requestAnimationFrame(mainGameLoop);

}

/* 'xCollision' create a border for the piece not to cross. I compared the gameArena to the piece direction.
If the gameArena and piece collide then the xPos of the piece will decrement. */
function xCollision(dir) {
    piece.pos.xPos += dir;
    if (PieceCollision(gameArena, piece)) {
        piece.pos.xPos -= dir;
        draw();
    }
}

//This function enables the peice to travel right and it call the 'xCollision' function to check collision and give a positive movement (right turn).
function movePieceRight() {
    xCollision(1);
    draw();
}

//This function enables the peice to travel right and it call the 'xCollision' function to check collision and give a negative movement (left turn).
function movePieceLeft() {
    xCollision(-1);
    draw();
}

/* This function increases the yPos threrefore it continues to move down the canvas. It is checking for collision, 
if there is any then the piece will stop. It also calls the methods 'cleatBottomLines' that checks if there is a full
line at the bottom and clears it from the canvas. */
function movePieceDown() {

    piece.pos.yPos++;
    if (PieceCollision(gameArena, piece)) {
        piece.pos.yPos--;

        //This is object deep cloning, it mimics the properties of an object to re-use all element of the original object. 
        var pc = Object.assign({}, piece);
        mergePieceArena(gameArena, pc);
        clearFullHorizontalLines();
        updateScore();
        piece.pos.yPos = -1;
        getRandomPiece();
    }
    dropCounter = 0;
    draw();
}


//This function provides convinience for the user. It allows them to drop a piece immediately  
function instantPieceDrop() {
    while (!PieceCollision(gameArena, piece)) {
        piece.pos.yPos++;
    }
    dropCounter = 0;
    if (PieceCollision(gameArena, piece)) {
        piece.pos.yPos--;
    }
}



/* This function all the rotation function and chooses a direction while when the piece colides in the arena x axis   */
function rotatePiece(dir) {
    var p = piece.pos.xPos;
    var rotate = 1;
    rotation(piece.currentPiece, dir);
    while (PieceCollision(gameArena, piece)) {
        piece.pos.xPos += rotate;
        rotate = -(rotate + (rotate > 0 ? 1 : -1));
        if (rotate > piece.currentPiece[0].length) {
            rotation(piece.currentPiece, -dir);
            piece.pos.xPos = p;
            return;
        }
    }
}

/* This function allow a piece to change its x and y axis. I applied the reverse function to swap these values 
Which will allow the peice to rotate.  */
function rotation(currentPiece, dir) {
    for (var y = 0; y < currentPiece.length; ++y) {
        for (var x = 0; x < y; ++x) {
            [
                currentPiece[x][y],
                currentPiece[y][x]

            ] = [

                currentPiece[y][x],
                currentPiece[x][y]
            ];
        }
    }

    if (dir > 0) {
        currentPiece.forEach(row => row.reverse());
    } else {
        currentPiece.reverse();
    }

}

/* The below function checks to see if a line at the bottom of the canvas if full and it clears it. 
I use the splice method to remove the lines from the gameArena array and unshift method to add new items 
to the gameArena array. For exmnple, the row above the full row at the bottom wil become the bottom row 
once this method comes into effect. */
function clearFullHorizontalLines() {

    var rowCount = 1;
    var clearFullHorizontalLines;

    loop: for (var y = gameArena.length - 1; y > 0; --y) {
        for (var x = 0; x < gameArena[y].length; ++x) {
            if (gameArena[y][x] === 0) {
                continue loop;
            }
        }

        clearFullHorizontalLines = gameArena.splice(y, 1)[0].fill(0);
        gameArena.unshift(clearFullHorizontalLines);
        ++y;

        piece.score += rowCount * 10;
        rowCount *= 2;

        increaseLevel();
    }
}



/* This function checks if the user is logged in. Ih that is the case then depending on the users' score
the level will increase, thus the drop speed will become faster for a more challenging game. Otherwise,
the level does not change the piece will drop at one second.   */
function increaseLevel() {
    if (sessionStorage.loggedIn == 'true') {
        if (piece.score == 10) {
            dropSpeed = 500;
            level++;
        } else if (piece.score >= 30) {
            dropSpeed = 250;
            level++;
        } else if (piece.score == 60) {
            dropSpeed = 100;
            level++;
        } else if (piece.score >= 80) {
            dropSpeed = 50;
            level++;
        }
    } else
        dropSpeed = 1000;

}


/* Here in this function it checks again if the user id logged in if so, then it display the first name of the 
user and it displays score.   */
function updateScore() {

    sessionStorage.highScore = piece.score;

    if (sessionStorage.loggedIn == 'true') {
        document.getElementById("score").innerHTML = "Name: " + sessionStorage.currentFirstName + " <br> " + "Score: " + " " + sessionStorage.highScore + 
        " <br> " + "High score: " + " "+ sessionStorage.highScore;

        document.getElementById("level").innerHTML = "Level: " + " " + level;
    } else {
        document.getElementById("LoginResult").innerHTML = "Please login to save score" + " <br>" + " Score: " + " " + piece.score;
    }
}

// This function uses the set interval function to create a timer displayed on the canvas.
function gameTimer() {

    var stopMainGameLoopWatch = document.getElementById("time");
    var time = 0;

    timeInterval = setInterval(function() {
        time++;
        stopMainGameLoopWatch.innerHTML = "Time: " + " " + time;
    }, 1000);
}

//Call the timer function
gameTimer();


/* The 'gameOver' function comes into effect when all the pieces of on the gameArea has collided therefore
the game if finished. I reset the gameover boolean variable to true and cancels the animation which will in 
turn holt all animation in the game thus the piece will cease to move.    */
function gameOver() {

    themeMusic.pause();
    gameOverMusic.play();

scoresObj = JSON.parse(localStorage.scores);

    if (sessionStorage.loggedIn == true) {

        if (sessionStorage.currentScore == true && piece.score > 0){
            saveScoresToTable(piece.score);
            if (piece.score > sessionStorage.highScore) {
                sessionStorage.highScore = piece.score;

                usersObj = JSON.parse(localStorage.users);
                sessionStorage.highScore = piece.score;
                localStorage.users = JSON.stringify(usersObj);
            }
        }
        
    }

    gameover = true;

    context.font = "30px arial";
    context.fillStyle = "#3877FF";
    context.fillText("Game Over", 10, 50);
    context.font = "20px arial";
    context.fillText("Press esc to play new game", 10, 90);

    nextContext.fillStyle = "#000";
    nextContext.fillRect(0, 0, canvas.width, canvas.height);

    document.getElementById("gameOver").innerHTML = "Game Over " + " <br> " + " Score: " + piece.score + " <br>" +
        "Highscore: " + " " + sessionStorage.highScore;

    clearInterval(timeInterval);
    cancelAnimationFrame(stopMainGameLoop);


}


/* This 'pauseGame' function stops all animation on the canvas with the aid of a key press and styles the
canvas according to my preferences. */
function pauseGame() {
    pause = true

    themeMusic.pause();
    context.fillStyle = "#C5C0BF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = "30px san-serif";
    context.fillStyle = "#fff";
    context.fillText("Game Paused", 10, 90);
    cancelAnimationFrame(stopMainGameLoop);
    clearInterval(timeInterval);

    draw();
}

/* 'resumeGame' function is the opposite of the 'pauseGame' function. It resumes all animation of the frame
and by calling the draw function will ensure a smooth process in terms of colours.   */
function resumeGame() {

    pause = false;

    themeMusic.play();
    requestAnimationFrame(mainGameLoop);
    gameTimer();
    //context.clearRect(0, 0, canvas.width, canvas.height);
    gameFrame();
    draw();

}

/* This function handles key presses that will ultimately control fundamental parts of the game. 
Depending on the case, it calls the relevant function that performs an action.  */

function handleKeyPress(event) {

    switch (event.keyCode) {
        case 37: // Left arrow key
            movePieceLeft();
            break;
        case 39: // Right arrow key
            movePieceRight();
            break;
        case 40: // Down arrow key
            movePieceDown();
            break;
        case 38: // Up arrow key
            rotatePiece(-1);
            break;
        case 32: //Space bar key
            instantPieceDrop();
            break;
        case 13: //Enter key 
            pauseGame();
            break;
        case 27: // esc key 
            resumeGame();
            break;
        case 91: // command key 
            // initialGame();
            break;
    }
}

//This is an object that represents the pieces in the game. In particular, the current and next pieces.
piece = {
    pos: {
        xPos: 3,
        yPos: -1
    },
    currentPiece: currentPiece,
    nextPiece: currentPiece,
    score: 0,

};

getRandomPiece();
updateScore();
mainGameLoop();