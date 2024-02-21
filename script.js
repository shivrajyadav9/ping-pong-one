const rod = document.getElementById('bar-2');
const gameZone = document.getElementById('game-zone');
const scoreSection = document.getElementById('score');
const MaxScoreSection = document.getElementById('maxScore');
const ball = document.getElementById("ball");

const width = gameZone.offsetWidth;
const rodWidth = rod.offsetWidth;
let left = (width - rodWidth) / 2;

// let winner = "Player 2";
// let highestWinner = null;

let x = 0;
let y = 40;
let speed = 10;
let xSpeed = speed;
let ySpeed = speed;
let score = 0;
let isGameOver = false;

rod.style.marginLeft = left + "px";
// rods[1].style.marginLeft = left + "px";

localStorage.setItem("maxScore", 0);

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        start();
    }
})

function start() {
    // if (highestWinner == null) {
    //     alert('This is your first time');
    // }
    if (localStorage.getItem("maxScore") > 0) {
        alert('Highest Score: ' + localStorage.getItem("maxScore") );
    }
    isGameOver = false;
    // if (winner === 'Player 2') {
        x = 0;
        y = 40;
        ySpeed = speed;
    // }
    // if (winner === 'Player 1') {
    //     x = 0;
    //     y = window.innerHeight - 60;
    //     ySpeed = -speed;
    // }
    xSpeed = speed;

    score = 0;
    scoreSection.innerText = score;
    MaxScoreSection.innerText = localStorage.getItem("maxScore");
    left = (width - rodWidth) / 2;
    rod.style.marginLeft = left + "px";
    // rods[1].style.marginLeft = left + "px";
    document.addEventListener('keydown', moveBars);
    moveBall();
    if (isGameOver) {
        return;
    }
}

function moveBall() {
    x += xSpeed;
    y += ySpeed;
    if (x + 50 > window.innerWidth || x < 0) {
        xSpeed = -xSpeed;
    }
    if(y<10){
        ySpeed = -ySpeed;
    }
    if (y + 50 > window.innerHeight) {
        if (x < rod.offsetLeft - 10 || x > rod.offsetLeft + rodWidth + 10) {
            gameOver();
            return;
        }
        ySpeed = -ySpeed;
        score += 2 * speed;
        if (score > localStorage.getItem("maxScore")) {
            localStorage.setItem("maxScore", score);
            // highestWinner = winner;
        }
        scoreSection.innerText = score;
        MaxScoreSection.innerText = localStorage.getItem("maxScore");
    }
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    requestAnimationFrame(moveBall);
}

function gameOver() {
    // if (y <= 40) {
    //     winner = 'Player 2';
    // }
    // if (y > 40) {
    //     winner = 'Player 1';
    // }
    if (score > localStorage.getItem("maxScore")) {
        localStorage.setItem("maxScore", score);
        // highestWinner = winner;
    }
    let text ="Game over!! Score: " + score + "\nHighest Score: " + localStorage.getItem("maxScore");
    alert(text);
    isGameOver = true;
    return;
}

function moveBars(event) {
    var name = event.key;
    var d = rodWidth * speed / 1500;
    for (var i = 0; i < 100; i++) {
        if ((name === 'a' || name === 'ArrowLeft') && left > 0) {
            left = left - d;
        }
        if ((name === 'd' || name === 'ArrowRight') && left < width - rodWidth) {
            left = left + d;
        }
        rod.style.marginLeft = left + "px";
        // rods[1].style.marginLeft = left + "px";
    }
}