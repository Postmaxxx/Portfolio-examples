const hover = document.querySelector('.hover-container');
const score = document.querySelector('.score');
const recordScore = document.querySelector('.record-score');

const raws = 15 ;
const cols = 20;
let elements = [];
const colors = ['#9F4682', '#F364D2', '#F1B9C4', '#f799FF', '#20FF20', '#ff2020', '#2020ff', '#50DD30', '#38FF97', '#6960ff'];
const panelWidth = 5;
let mouseXlast = 0;
let panelX = 0;

let ballX = 1;
let ballY = 1;
let ballDx = 1;
let ballDy = 1;
let totalScore = 0;
let bestScore = 0;
let speed = 100; //less is faster
let tail = '1s'


const startBall = () => {
    setInterval(() => setNewBallPosition(), speed)
}


const setNewBallPosition = () => {
    drawBall(ballX, ballY, '#1d1d1d', tail)
    ballX += ballDx;
    ballY += ballDy;
    let panelXrounded = Math.floor(panelX)
    if (ballX >= cols-1 || ballX <= 0) { //боковые  стенки
        ballDx = -ballDx;
    }
    if (ballY <= 0) { //верх
        ballDy = -ballDy;
    }
    if (ballY >= raws-1) { //низ
        if (ballX-ballDx >= panelXrounded && ballX-ballDx < panelXrounded + panelWidth) { //попал в панель
            ballDy = -ballDy;
            ballY += 2* ballDy;
        } else { //мимо панели
            drawBall(ballX, ballY, getRandomColor(), '0s')
            restartGame()
        }
    }
    drawBall(ballX, ballY, getRandomColor(), '0s');
    totalScore += 1;
    score.innerHTML = `Your score: ${totalScore}`
}



const restartGame = () => {
    if (totalScore > bestScore) {
        bestScore = totalScore;
        recordScore.innerHTML = `Your best score: ${bestScore}`;
    }
    ballX = 1;
    ballY = 1;
    ballDx = 1;
    ballDy = 1;
    totalScore = 0;
}


const drawBall = (x, y, color, duration) => {
    const elPosition = y*cols + x;
    elements[elPosition].style.backgroundColor = color;
    elements[elPosition].style.transitionDuration = duration;
}



const createBoard = () => {
    for (el = 0; el < raws*cols; el++) {
        let newElement = document.createElement('div');
        newElement.className = 'board-element';
        hover.append(newElement);
    }
    elements = document.querySelectorAll('.board-element');
    hover.style.maxWidth = `${cols * 24}px`;
    document.addEventListener('mousemove', (e) => mouseMove(e))
}


const mouseMove = (e) => {
    const delta = e.pageX - mouseXlast;
    mouseXlast = e.pageX;
    panelX += delta / 35;
    if (panelX > cols - panelWidth) {
        panelX = cols - panelWidth
    }
    if (panelX < 0) {
        panelX = 0
    }
    drawPanel();
}



const drawPanel = () => {
    const firstEl = (raws-1)*(cols) + Math.floor(panelX);
    const lastEl = firstEl + panelWidth;
    
    for (el = (raws-1)*(cols); el < raws*cols; el++) {
        if (el >= firstEl && el < lastEl) {
            elements[el].style.backgroundColor = 'silver';
            elements[el].style.transitionDuration = '0s';

        } else {
            elements[el].style.backgroundColor = '#1d1d1d';
            elements[el].style.transitionDuration = '0.05s';
        }
    }
}



const createListeners = () => {
    elements.forEach(element => {
        element.addEventListener('mouseover', (e) => addColor(e))
        element.addEventListener('mouseout', (e) => removeColor(e))
    })
}


const getRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * colors.length)
    return colors[colorIndex]
}


const addColor = e => {
    currentColor = getRandomColor();
    e.target.style.transitionDuration = '0s';
    e.target.style.backgroundColor = currentColor;
    e.target.style.boxShadow = `0 0 2px ${currentColor}, 0 0 10px ${currentColor}`;
}

const removeColor = e => {
    e.target.style.backgroundColor = '#1d1d1d'
    e.target.style.transitionDuration = tail;
    e.target.style.boxShadow = `0 0 2px #000`;
}



createBoard();
createListeners();
startBall();