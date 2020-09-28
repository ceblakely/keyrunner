// Define elements
const levelButtons = document.getElementById('levelButtons'); // parent div
const begBtn = document.getElementById('begBtn');
const intBtn = document.getElementById('intBtn');
const advBtn = document.getElementById('advBtn');
const btnsObj = [begBtn, intBtn, advBtn];
const nextBtn = document.getElementById('nextBtn');
const startBtn = document.getElementById('startBtn');
const inputBtn = document.getElementById('inputBtn');

let level;
let gameString = document.getElementById('gameString');
let levelString; // Is the string chosen based on level chosen
let valueObj; // Will come from levelString.split('') later
let currentIndex = 0;
let currentLetter;
//let currentWord;

// Define Events

document.addEventListener('keyup', logKeys);
nextBtn.addEventListener('click', showLevels);
startBtn.addEventListener('click', clickStart);

btnsObj.forEach((btn) => {
    btn.addEventListener('click', chosenLevel);
});

// Level Values

const begLevel = 'My name is Junie B. Jones. The B stands for Beatrice. Mary had a little lamb. The young girl hurried from the house. They are making for the forest. Everybody knows we hate Tom. Tom held his cup out for Mary to refill it. Take care to not miss the train. WE will not allow you to bring your pet cat along. Let me help you with your baggage. A dead duck doesn\'t fly backward. He strives to keep the best lawn in the neighborhood';

const intLevel = 'Python\'s name is derived from the British comedy group Monty Python. Python is an interpreted, high-level, general-purpose programming language. Python is used extensively in the information security industry, including in exploit development. Swift, a programming language developed by Apple, has some Python-inspired syntax. JavaScript supports event-driven, functional, and imperative programming styles. JavaScript engines were originally used only in web browsers, but they are now embedded in some servers. A common misconception is that JavaScript is similar or closely related to Java. The murder hornet was disappointed by the preconceived ideas people had of him. I purchased a baby clown from the Russian terrorist black market. During the period of Internet Explorer dominance in the early 2000s, client-side scripting was stagnant. The Angular framework was created by Google for its web services; it is now open source and used by other websites.';

const advLevel = 'After winning re-election by defeating Republican opponent Mitt Romney, Obama was sworn in for a second term in 2013. During this term, he promoted inclusion for LGBT Americans. Disney Channel\'s programming consists of original first-run television series, theatrically released and original made-for-TV movies and select other third-party programming. A developed country, New Zealand ranks highly in international comparisons of national performance, such as quality of life, education, protection of civil liberties, government transparency, and economic freedom. During her grandfather\'s reign, Elizabeth was third in the line of succession to the British throne, behind her uncle Edward and her father. The west of Scotland is usually warmer than the east, owing to the influence of Atlantic ocean currents and the colder surface temperatures of the North Sea. A highly developed country, the United States is the world\'s largest economy and accounts for approximately a quarter of global gross domestic product. Python uses dynamic typing and a combination of reference counting and a cycle-detecting garbage collector for memory management. The broad consensus among economists is that Brexit will likely harm the UK\'s economy and reduce its real per capita income in the long term, and that the referendum itself damaged the economy. Brexit is likely to reduce immigration from European Economic Area countries to the UK, and poses challenges for UK higher education, academic research and security. UK membership of EU ended on 31 January 2020, beginning a period of transitional arrangements set to end on 31 December 2020. Opinion polling overall showed an initial fall in support for Brexit from the referendum to late 2016, when responses were split evenly between support and opposition.';



function showLevels() {
    document.getElementById('introContent').setAttribute('class', 'hide');
    nextBtn.setAttribute('class', 'hide');
    levelButtons.setAttribute('class', 'btnStyle');

    levelButtons.removeAttribute('class', 'hide');
    startBtn.removeAttribute('class', 'hide');
    
}
function chosenLevel() {
    startBtn.removeAttribute('class', 'hide');
    level = this.innerText;
    switch(level) {
        case 'Beginner':
            levelString = begLevel;
            break;
        case 'Intermediate':
            levelString = intLevel;
            break;
        case 'Advanced':
            levelString = advLevel;
    }
}

function clickStart() {
    const timer = document.getElementById('timer');

    levelButtons.setAttribute('class', 'hide');
    startBtn.setAttribute('class', 'hide');
    timer.removeAttribute('class', 'hide');
    inputBtn.removeAttribute('class', 'hide');
    
    gameString.innerHTML = levelString;
    valueObj = levelString.split(''); // each letter in array to compare
    currentLetter = valueObj[currentIndex]; // each letter at currentIndex
}


function logKeys(e) {
    let keyPressed = `${e.key}`;
    const keysToIgnore = ['Shift', 'Enter', 'Tab', 'Shift', 'CapsLock', 'Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', '`'];

    if (keysToIgnore.includes(keyPressed)) {
        // does nothing here.
    }
    else {
        checkLetter(keyPressed);
    }
}

function checkLetter(keyPressed) {  
    
    if (keyPressed == currentLetter) {
        console.log('good');
        currentIndex++;       
        currentLetter = valueObj[currentIndex];
        return '<span class="green">' + valueObj[currentIndex - 1] + '</span';
    }
    else if (keyPressed != currentLetter) {
        console.log('try again');
        return '<span class="red">' + currentLetter + '</span';
    }
    
    valueArr = valueArr.join();
    gameString.innerHTML = valueArr;
}











/*
function startCount() {
    timer = document.getElementById('timer');
    let min = 0;
    let sec = 59;
    setInterval(() => {
        timer.innerHTML = min + ':' + sec + ' seconds';
        sec--;
    }, 1000);
    if (sec <= 10) {
        timer.style.backgroundColor = 'red';
    }
} */