// Define elements
//const levelButtons = document.getElementById('levelButtons'); // parent div
const begBtn = document.getElementById('begBtn');
const intBtn = document.getElementById('intBtn');
const advBtn = document.getElementById('advBtn');
const btnsObj = [begBtn, intBtn, advBtn];

const startBtn = document.getElementById('startBtn');
const wordsField = document.getElementById('wordsField');
const inputBox = document.getElementById('inputBox');
let textHere = document.getElementById('textHere');

let level;
let currentIndex = 0;
let wordIndex = 0;
startBtn.disabled = true;

// for comparison purposes
let ogString;
let chosenArr;

// Will be manipulated during the game
let testStr;
let newStr = '';
let testVals;
let lenArr = [];
let typedWords = [];


// Define Events
startBtn.addEventListener('click', clickStart);
document.addEventListener('keyup', colorText);


// Level Values

let begLevel = 'my name is junie b. jones. The B stands for Beatrice. Mary had a little lamb. The young girl hurried from the house. They are making for the forest. Everybody knows we hate Tom. Tom held his cup out for Mary to refill it. Take care to not miss the train. WE will not allow you to bring your pet cat along. Let me help you with your baggage. A dead duck doesn\'t fly backward. He strives to keep the best lawn in the neighborhood'.toLowerCase();
let intLevel = 'Python\'s name is derived from the British comedy group Monty Python. Python is an interpreted, high-level, general-purpose programming language. Python is used extensively in the information security industry, including in exploit development. Swift, a programming language developed by Apple, has some Python-inspired syntax. JavaScript supports event-driven, functional, and imperative programming styles. JavaScript engines were originally used only in web browsers, but they are now embedded in some servers. A common misconception is that JavaScript is similar or closely related to Java. The murder hornet was disappointed by the preconceived ideas people had of him. I purchased a baby clown from the Russian terrorist black market. During the period of Internet Explorer dominance in the early 2000s, client-side scripting was stagnant. The Angular framework was created by Google for its web services; it is now open source and used by other websites.'.toLowerCase();
let advLevel = 'After winning re-election by defeating Republican opponent Mitt Romney, Obama was sworn in for a second term in 2013. During this term, he promoted inclusion for LGBT Americans. Disney Channel\'s programming consists of original first-run television series, theatrically released and original made-for-TV movies and select other third-party programming. A developed country, New Zealand ranks highly in international comparisons of national performance, such as quality of life, education, protection of civil liberties, government transparency, and economic freedom. During her grandfather\'s reign, Elizabeth was third in the line of succession to the British throne, behind her uncle Edward and her father. The west of Scotland is usually warmer than the east, owing to the influence of Atlantic ocean currents and the colder surface temperatures of the North Sea. A highly developed country, the United States is the world\'s largest economy and accounts for approximately a quarter of global gross domestic product. Python uses dynamic typing and a combination of reference counting and a cycle-detecting garbage collector for memory management. The broad consensus among economists is that Brexit will likely harm the UK\'s economy and reduce its real per capita income in the long term, and that the referendum itself damaged the economy. Brexit is likely to reduce immigration from European Economic Area countries to the UK, and poses challenges for UK higher education, academic research and security. UK membership of EU ended on 31 January 2020, beginning a period of transitional arrangements set to end on 31 December 2020. Opinion polling overall showed an initial fall in support for Brexit from the referendum to late 2016, when responses were split evenly between support and opposition.'.toLowerCase();


function getGameString() {
    startBtn.disabled = false;
    level = this.innerText;
    switch(level) {
        case 'Beginner':
            ogString = begLevel;
            testStr = begLevel;
            break;
        case 'Intermediate':
            ogString = intLevel;
            testStr = intLevel;
            break;
        case 'Advanced':
            ogString = advLevel;
            testStr = advLevel;
    }
    chosenArr = testStr.split('');
    testVals = testStr.split('');
}

btnsObj.forEach((btn) => {
    btn.addEventListener('click', getGameString);
});

function clickStart() {
    const timer = document.getElementById('timer');
    hideElements([levelButtons, startBtn]);
    showElements([timer, wordsField, inputBox]);

    textHere.innerHTML = testStr;
    activeWord();
}

function activeWord() {
    let eachWordArr = testStr.split(' '); // each word
    wordsField.innerHTML = eachWordArr[wordIndex];
}
function colorText(e) {
    let keyPressed = `${e.key}`;
    textHere.innerHTML = '';

    const keysToIgnore = ['Shift', 'Enter', 'Tab', 'CapsLock', 'Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', '`'];

    if (keysToIgnore.includes(keyPressed)) {
        // do nothing
    } else if (keyPressed == chosenArr[currentIndex]) {
        testVals.shift();
        let correctLetter = '<span style="color: green">' + ogString[currentIndex] + "</span>";
        let correctLength = correctLetter.length;
        lenArr.push(correctLength);
        //console.log(typeof(keyNumber));
        newStr = newStr + correctLetter;
        textHere.innerHTML += newStr + testVals.join('');
        currentIndex++;
    } else if (keyPressed == 'Backspace') {
        console.log('you hit backspace');
        currentIndex = currentIndex - 1;
        let lastLetter = ogString[currentIndex];
        testVals.unshift(lastLetter);

        let lastLength = lenArr.pop();
        newStr = newStr.slice(0, newStr.length - lastLength);
        textHere.innerHTML += newStr + testVals.join('');
    } else {
        testVals.shift();
        let incorrectLetter =
        '<span style="color: red">' + ogString[currentIndex] + "</span>";
        let incorrectLength = incorrectLetter.length;
        lenArr.push(incorrectLength);

        newStr = newStr + incorrectLetter;
        textHere.innerHTML += newStr + testVals.join('');
        currentIndex++;
    }
}

function hideElements(arr) {
    arr.forEach((elem) => {
        elem.setAttribute('class', 'hide');
    });
}
function showElements(arr) {
    arr.forEach((elem) => {
        elem.removeAttribute('class', 'hide');
    });
}
/*
function logKeys(e) {
    let keyPressed = `${e.key}`;
    const keysToIgnore = ['Shift', 'Enter', 'Tab', 'Shift', 'CapsLock', 'Control', 'Alt', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', '`'];

    if (keysToIgnore.includes(keyPressed)) {
        // does nothing here.
    }
    else {
        //checkLetter(keyPressed);
        if (correctLetter) {
            currentIndex++;       
            currentLetter = valueObj[currentIndex];
            console.log('good');
        }
        else if (!correctLetter) {
            console.log('try again');
        }
    }
} */

/*
function checkLetter(keyPressed) {  
    if (keyPressed == currentLetter) {
        console.log('good');
        currentIndex++;       
        currentLetter = valueObj[currentIndex];
    }
    else if (keyPressed != currentLetter) {
        console.log('try again');
    }
}
*/









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