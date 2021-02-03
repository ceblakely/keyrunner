let usedSentences = [];
let currentIndex;
let currentRound = 0;

let userInfo = {
    1: {},
    2: {},
    3: {},
};

document.getElementById('startBtn').addEventListener('click', () => {
    startNewRound();
    showElements([document.getElementById('inputField')]);
    hideElements([document.getElementById('startBtn'), document.getElementById('introUl')]);
});

document.addEventListener('keyup', (e) => {
    getKey(e);
});

const sentences = [
    "Nice to meet you. Where you been? I could show you incredible things. Magic, madness, heaven, sin. Saw you there and I thought oh my god. Look at that face, you look like my next mistake. Love\'s a game, wanna play?",
    "Gotta keep my head held high. There's always gonna be another mountain. I'm always gonna wanna make it move. Always gonna be an uphill battle. Sometimes I'm gonna have to lose. Ain't about how fast I get there. Ain't about what's waiting on the other side. It's the climb.",
    "A thousand miles seems pretty far. But they've got planes and trains and cars. I'd walk to you if I had no other way. Our friends would all make fun of us. And we'll just laugh along because we know. That none of them have felt this way. Delilah, I can promise you. That by the time we get through. The world will never ever be the same. And you're to blame",
    "Backbeat, the word is on the street. That the fire in your heart is out. I'm sure you've heard it all before. But you never really had a doubt. I don't believe that anybody. Feels the way I do about you now. And all the roads we have to walk are winding. And all the lights that lead us there are blinding. There are many things that I would like to say to you but I don't know how.",
    "Well, the plane landed and when I came out. There was a dude who looked like a cop standing there with my name out. I ain't trying to get arrested yet I just got here. I sprang with the quickness like lightning, disappeared. I whistled for a cab and when it came near The license plate said fresh and it had dice in the mirror, If anything I could say that this cab was rare. But I thought 'Nah, forget it' - 'Yo, home to Bel Air'"
];

function getSentence(randomIndex) {
    let randomSen = sentences[randomIndex];
    usedSentences.push(sentences.splice(randomIndex, randomIndex + 1));
    return randomSen;
}

function getKey(e) {
    let keyPressed = `${e.key}`;
    const keysToIgnore = [
      "Shift",
      "Enter",
      "Tab",
      "CapsLock",
      "Control",
      "Alt",
      "Meta",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
      "ArrowRight",
      "`"
    ];

    if (keysToIgnore.includes(keyPressed)) {
        console.log('Ignore key');
    } else if (keyPressed == 'Backspace') {
        if (userInfo[currentRound].lastKeys.length == 0) {
            console.log('Press a key to start.');
        } else {
            backspaceKey();
        }
    } else if (e.keyCode == 32) {
        addSpace(' ');
        colorText(' ');
    } else {
        if (userInfo[currentRound].newStringArr == userInfo[currentRound].gameString) {
            console.log('You have completed this round');
        } else {
            colorText(keyPressed);
        }    
    }
}

function addSpace(spaceKey) {
    if (spaceKey == userInfo[currentRound].gameString[currentIndex]) {
        let val = document.getElementById('inputField').value.slice(0, -1);
        userInfo[currentRound].lastWords.push(val);
        document.getElementById('inputField').value = '';
    }
}

function colorText(key) {
    let currentLetter = userInfo[currentRound].valArr.shift();
    let coloredLetter = isCorrect(key, currentLetter);
    userInfo[currentRound].lastKeys.push(key); 
    userInfo[currentRound].lenArr.push(coloredLetter.length);
    userInfo[currentRound].newStringArr += coloredLetter;
    currentIndex++;

    insertNew(userInfo[currentRound].newStringArr, userInfo[currentRound].valArr);
}
    
function isCorrect(key, currentLetter) {
    if (key == currentLetter) {
        return '<span style="background-color: #15DB95" class="newLetter">' + currentLetter + '</span>';
    } else {
        userInfo[currentRound].errors++;
        return'<span style="background-color: #f24236" class="newLetter">' + currentLetter + '</span>';
    }
}

function backspaceKey() {
    let lastLen =userInfo[currentRound].lenArr.pop();
    let lastKey = userInfo[currentRound].lastKeys.pop();
    currentIndex = currentIndex - 1;
    userInfo[currentRound].valArr.unshift(userInfo[currentRound].gameString[currentIndex]);

    userInfo[currentRound].newStringArr = userInfo[currentRound].newStringArr.slice(0, userInfo[currentRound].newStringArr.length - lastLen);

    if (lastKey == ' ' && lastKey == userInfo[currentRound].gameString[currentIndex]) {
        let lastWord = userInfo[currentRound].lastWords.pop();
        document.getElementById('inputField').value = lastWord;
    } 
    insertNew(userInfo[currentRound].newStringArr, userInfo[currentRound].valArr);
}
  
function insertNew(newStringArr, valArr) {
    document.getElementById("mainP").innerHTML = newStringArr + valArr.join('');
    
    if (userInfo[currentRound].lastKeys.join('') == userInfo[currentRound].gameString) {
        userInfo[currentRound].endTime = new Date();
        hideElements([document.getElementById('inputField')]);
        displayRoundResults();
    }
}

function displayRoundResults() {
    let scores = getScore();
    userInfo[currentRound].wpm = scores[0];
    userInfo[currentRound].accuracy = Math.round(scores[1]);
    
    document.getElementById('mainP').setAttribute('class', 'roundInfoStyle');
    document.getElementById('mainP').innerHTML = '<h4>Round ' + currentRound + ' Complete</h4><hr><p>Errors: ' + userInfo[currentRound].errors + '<p> WPM: ' + userInfo[currentRound].wpm + '</p><p> Accuracy: ' + userInfo[currentRound].accuracy + '%</p>';

    if (currentRound < 3) {
        document.getElementById('startBtn').innerText = 'Next Round';
    } else {
        document.getElementById('startBtn').innerText = 'See Final Score';
        document.getElementById('startBtn').addEventListener('click', finalScore);
    }
    showElements([document.getElementById('startBtn')]);
}

function getScore() {
    let seconds = (userInfo[currentRound].endTime - userInfo[currentRound].startTime) / 1000;
    let minutes = seconds / 60;
    console.log(Math.round(seconds) + ' seconds');
    let wpm = Math.floor(((userInfo[currentRound].gameString.length) / 5 ) / minutes);
    let accuracy = ((userInfo[currentRound].gameString.length - userInfo[currentRound].errors) / userInfo[currentRound].gameString.length) * 100;
    console.log(wpm, accuracy);
    
    return [wpm, accuracy];
}
function finalScore() {
    let totalErrors = userInfo[1].errors + userInfo[2].errors + userInfo[3].errors;
    let averageWpm = Math.round((userInfo[1].wpm + userInfo[2].wpm + userInfo[3].wpm) / 3);
    let averageAcc = Math.round((userInfo[1].accuracy + userInfo[2].accuracy + userInfo[3].accuracy) / 3);

    document.getElementById('mainP').setAttribute('class', 'roundInfoStyle');
    document.getElementById('mainP').innerHTML = '<h4>Final Score</h4><hr><p>Total Errors: ' + totalErrors + '<p> Average WPM: ' + averageWpm + '</p><p> Average Accuracy: ' + averageAcc + '%</p>';
    hideElements([document.getElementById('startBtn')]);
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

function startNewRound() {
    currentIndex = 0;
    currentRound++;
    
    userInfo[currentRound].gameString = getSentence(Math.floor(Math.random() * sentences.length));
    userInfo[currentRound].valArr = userInfo[currentRound].gameString.split('');
    userInfo[currentRound].newStringArr = '';
    userInfo[currentRound].errors = 0;
    userInfo[currentRound].lenArr = [];
    userInfo[currentRound].lastKeys = [];
    userInfo[currentRound].lastWords = [];
    userInfo[currentRound].startTime = new Date();

    document.getElementById('mainP').innerHTML = userInfo[currentRound].gameString;
    document.getElementById('inputField').value = '';
}
