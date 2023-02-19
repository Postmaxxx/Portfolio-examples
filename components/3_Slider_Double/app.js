const sliderContainer = document.querySelector('.container')
const sidebar = document.querySelector('.sidebar')
const mainSlide = document.querySelector('.main-slide')
const btnUp = document.querySelector('.up-button')
const btnDwn = document.querySelector('.down-button')

const slides = [ //should be imported from file or DB
    {
        slideUrl: `background-image: url('https://images.unsplash.com/photo-1521913626209-0fbf68f4c4b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');`,
        sidebarBg: `background: linear-gradient(220.16deg, #FFE101 -8%, #F39102 138%)`,
        header: 'Baloons',
        text: 'Breathtaking'
    },
    {
        slideUrl: `background-image: url('https://images.unsplash.com/photo-1526500141527-9e9b0ae48227?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');`,
        sidebarBg: `background: linear-gradient(221.87deg, #8308EA 1%, #5305AF 128%)`,
        header: 'Smoke',
        text: 'Wonderful'
    },
    {
        slideUrl: `background-image: url('https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');`,
        sidebarBg: `background: linear-gradient(215.32deg, #F90306 -1%, #9E0706 124%)`,
        header: 'Lanterns',
        text: 'Amasing'
    },
    {
        slideUrl: `background-image: url('https://images.unsplash.com/photo-1582809620589-e9748fd04437?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80');`,
        sidebarBg: `background: linear-gradient(229.99deg, #11DEE9 -26%, #017E8B 145%)`,
        header: 'Heart',
        text: 'Awesome'
    },
    {
        slideUrl: `background-image: url('https://images.unsplash.com/photo-1558979142-19e920d27587?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80');`,
        sidebarBg: `background: linear-gradient(221.87deg, #63384A 1%, #5305AF 108%)`,
        header: 'Nature',
        text: 'Charmed'
    },
    {
        slideUrl: `background: linear-gradient(221.87deg, #1998FA 1%, #3375AF 108%)`,
        sidebarBg: `background-image: url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');`,
        header: 'Expromt',
        text: 'Overwhelming'
    },
]

let currentSlide = 0;
const sliderHeight = sliderContainer.clientHeight;
const totalSlides = slides.length;
sidebar.style.top = `-${(totalSlides-1) * 100}vh`


const createSlider = () => {
    slides.forEach(slide => {
        sidebar.innerHTML = `
            <div style="${slide.sidebarBg}">
                <h1>${slide.header}</h1>
                <p>${slide.text}</p>
            </div>
        `.concat(sidebar.innerHTML);
        mainSlide.innerHTML += `       
            <div style="${slide.slideUrl}">
            </div>
        `
    })
}



const changeSlide = (direction) => {
    switch (direction) {
        case 'up':
            currentSlide++
            currentSlide > (totalSlides-1) && (currentSlide = 0)
        break;
        case 'down':
            currentSlide--
            currentSlide < 0 && (currentSlide = totalSlides - 1)
        break;
    }
    mainSlide.style.transform = `translateY(-${currentSlide * sliderHeight}px)`
    sidebar.style.transform = `translateY(${currentSlide * sliderHeight}px)`
}


btnUp.addEventListener('click', changeSlide.bind(null,'up'));
btnDwn.addEventListener('click', changeSlide.bind(null,'down'));


createSlider();