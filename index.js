let textHere = document.getElementById('textHere');
let usedSentences = []; // has sentences used previously
let currentIndex = 0;

// for comparison purposes
let gameString;
let newStringArr = [];
let valArr; 
let lenArr = [];
let lastKeys = [];
let currentRound = 1;


document.addEventListener('keyup', (e) => {
    getKey(e);
});


const sentences = [
    "Mary had a little lamb"
    /*
    "Nice to meet you. Where you been? I could show you incredible things. Magic, madness, heaven, sin. Saw you there and I thought oh my god. Look at that face, you look like my next mistake. Love\'s a game, wanna play?",
    "Gotta keep my head held high. There's always gonna be another mountain. I'm always gonna wanna make it move. Always gonna be an uphill battle. Sometimes I'm gonna have to lose. Ain't about how fast I get there. Ain't about what's waiting on the other side. It's the climb.",
    "A thousand miles seems pretty far. But they've got planes and trains and cars. I'd walk to you if I had no other way. Our friends would all make fun of us. And we'll just laugh along because we know. That none of them have felt this way. Delilah, I can promise you. That by the time we get through. The world will never ever be the same. And you're to blame",
    "Backbeat, the word is on the street. That the fire in your heart is out. I'm sure you've heard it all before. But you never really had a doubt. I don't believe that anybody. Feels the way I do about you now. And all the roads we have to walk are winding. And all the lights that lead us there are blinding. There are many things that I would like to say to you but I don't know how",
    "Well, the plane landed and when I came out. There was a dude who looked like a cop standing there with my name out. I ain't trying to get arrested yet I just got here. I sprang with the quickness like lightning, disappeared. I whistled for a cab and when it came near The license plate said fresh and it had dice in the mirror, If anything I could say that this cab was rare. But I thought 'Nah, forget it' - 'Yo, home to Bel Air'"
    */
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
        backspaceKey();
    } else if (newStringArr.length == gameString.length) {
        console.log('Sentence Complete');
    } else {
        colorText(keyPressed);
    }
}

function colorText(key) {
    let currentLetter = valArr.shift();
    lastKeys.push(currentLetter);
    let isCorrect =
        key == currentLetter ? '<span style="color: green">' + currentLetter + "</span>" : '<span style="color: red">' + currentLetter + "</span>";

    currentIndex++;
    lenArr.push(isCorrect.length);
    newStringArr.push(isCorrect);
    insertNew(valArr);
}

function backspaceKey() {
    currentIndex--;
    let lastLetter = newStringArr.pop();
    lastLetter = lastLetter.replace(/<\/?span[^>]*>/g, "");
    console.log(lastLetter);
    valArr.unshift(lastLetter);
    insertNew(valArr);
}
  
function insertNew(valArr) {
    document.getElementById("textHere").innerHTML = newStringArr.join("") + valArr.join("");
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


document.getElementById('startBtn').addEventListener('click', () => {
    gameString = getSentence(Math.floor(Math.random() * sentences.length)); // used for comparison
    textHere.innerHTML = gameString;
    valArr = gameString.split('');

    showElements([document.getElementById('inputField')]);
    hideElements([document.getElementById('startGameDiv')]);
});

console.log('idk');