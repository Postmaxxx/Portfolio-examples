const screens = document.querySelectorAll('.screen');
const start = document.querySelector('.start');
const buttons = document.querySelectorAll('.time-btn')
const time = document.querySelector('#time')
const board = document.querySelector('#board')



const maxDiameter = 10;
const minDiameter = 30;
let timer = 0;
let score = 0;
let miss = 0;
const bangTime = 100; //in ms


const startGame = (e) => {
    //timer = +e.target.dataset.time === 0 ? getRandomNumber(3,30) : +e.target.dataset.time
    timer = +e.target.dataset.time || getRandomNumber(5, 40);
    showTime(timer);
    setInterval(() => {
        timer--;
        showTime(timer);
        if (timer <= 0) {endGame()}
    }, 1000)
    screens[1].classList.add('up')
    beginGame();
}



const showTime = (timeLeft) => {
    time.innerHTML = timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`
}



const setTime = (e) => {
    e.preventDefault();
    screens[0].classList.add('up')
}



const beginGame = () => {
    createRandomCircle();
    board.addEventListener('click', boardShooted)
}



const boardShooted = (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        removeCircle(e)
    } else {
        miss++;
    }
}



const removeCircle = (e) => {
    e.target.style.transition = `all ${bangTime/1000}s cubic-bezier(.63,0,1,.17)`;
    e.target.style.backgroundColor = `rgb(196, 91, 30)`;/*
    e.target.style.height = `${e.target.offsetHeight * 2}px`;
    e.target.style.width = `${+e.target.offsetWidth * 2}px`;
    e.target.style.left = `${e.target.offsetLeft - e.target.offsetWidth / 2}px`
    e.target.style.top = `${e.target.offsetTop - e.target.offsetHeight / 2}px`*/
    e.target.style.height = `0px`;
    e.target.style.width = `0px`;
    e.target.style.left = `${e.target.offsetLeft + e.target.offsetWidth / 2}px`
    e.target.style.top = `${e.target.offsetTop + e.target.offsetHeight / 2}px`
    e.target.style.boxShadow = `0px 0px ${e.target.offsetWidth * 2}px ${e.target.offsetHeight * 2}px rgba(255, 247, 0, 0.7)`
    setTimeout(() => {
        e.target.remove()
    }, bangTime)
    createRandomCircle()
}



const getRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max-min)) + min)
}


const createRandomCircle = () => {
    const {width, height} = board.getBoundingClientRect();
    const size = getRandomNumber(minDiameter, maxDiameter);
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size)
    color = `rgb(${getRandomNumber(50, 255)}, ${getRandomNumber(50, 255)}, ${getRandomNumber(50, 255)})`
    const circle = document.createElement('div')
    circle.classList.add('circle')
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.backgroundColor = color;
    board.append(circle);
}


 
const endGame = () => {
    time.parentNode.classList.add('hide');
    board.removeEventListener('click', boardShooted)
    buttons.forEach(btn => {btn.removeEventListener('click', startGame)})
    const accuracy = Math.floor((score)/(score+miss)*100);
    board.innerHTML = `
        <h1>Hits: <span class="primary">${score}</span></h1>
        <br>
        <h2>Misses: <span class="primary ${miss === 0 ? 'no-missed' : 'missed'}">${miss}</span></h2>
        <h2>Accuracy: <span class="primary ${accuracy > 70 ? 'no-missed' : 'missed'}">${accuracy}%</span></h2>`;
}





start.addEventListener('click', (e) => setTime(e))
buttons.forEach(btn => {btn.addEventListener('click', startGame)})
