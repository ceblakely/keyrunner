let randomSentence;
let completedWords = []; // array
let currentWord = "";
let currentIndex = 0;
let wordIndex = 0;
let time = 60;
let totalKeystrokes = 0;
let wordsField = document.getElementById("wordsField");

let userInfo = {};
const sentences = [
  "how was dog mail cat ear drink home glass cake water car textbook baseboards lackhack whichever yellow stargaze snow day school park anteater blue television selling astonishing indoor reasonable embryo gasp background systematic functional final case behavior replacement resource needle marketing novel west structure fang redundant snail grouchy tendency badge legs bloody grubby imagine nappy sedate murmur lumpy good sleep fall existence knit connotesting melodic die request push kid sour disease houses drain dinosaurs mislead legrail violent flock minetray forgive drunk",
  "website pen paper agenda toy baby dinner music circle team interview influence ring cleaner fluffy charger planner cup mouse sticker tree nature edge fan mosquito soar prevalence state instinct snow utter spit preoccupation window key height invasion ostracize mean contradiction category hypothesis routine ghostwriter pat stress happen image fierce religion toe thin blush illustrious inhabit apparel amount event ooze recondite escape beneficial insect jewel thumbs way shut board splendid burn burly prove illumine pet womanly degree imply canvass",
  "shoe book ring plug garden draw mailbox mouse charge food assist author became flight editor eating doctor engine empire dollar winner tennis ticket window writer yellow concert color-blind watch sour positive sentence disposition common do overeat hell colon plagiarize knot wire orgy research credibility hunter appearance veteran steep fight mile shake list glance obsolete branch neat string groovy boiling thirsty violates link satiated i gestion amazing reply ring tree enchanted rend restrain chain kind hug attract detailed cease rude worship ant lumber daffy suffer combative numerous deadpan giants snails aunt appear",
  "tree bird movie heel dog truck soccer game polish color share sports shopping travel money weather computer average inject meadow quote ruin dark lesson team problem crude body concert contrast wool leap hypnotize creature survive help horses mouth fancy breathe stop typical wet zoom gabby blowhuge perfect suggestions alty successful help less married consign wary applegarden blow lively chance cheap sour legal taste part suggest allow outrageous compel giant crabby game word respect race stage modify jittery wave few secretary disillusioned perpetual verify press watch join consult bat feeble curly joyous  cry milky lavish colossal apathetic migrate fish",
];

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
    "`",
  ];

  if (keysToIgnore.includes(keyPressed)) {
    console.log("Ignore key");
  } else if (keyPressed == "Backspace") {
    if (userInfo.lastKeys.length == 0) {
      console.log("Press a key to start.");
    } else {
      backspaceKey();
    }
  } else if (e.keyCode == 32) {
    addSpace(" ");
    //colorText(" ");
  } else {
    if (userInfo.newStringArr == userInfo.gameString) {
      console.log("You have completed this round");
    } else {
      colorText(keyPressed);
    }
  }
}

function addSpace(spaceKey) {
  if (spaceKey == userInfo.gameString[currentIndex]) {
    let val = document.getElementById("inputField").value.slice(0, -1);
    userInfo.lastWords.push(val);
    userInfo.colorLastWords.push(userInfo.newStringArr);
    //userInfo.newStringArr = "";
    document.getElementById("inputField").value = "";
    wordIndex++;
    colorText(" ");
  }
}

function colorText(key) {
  let currentLetter = userInfo.valArr.shift();
  let coloredLetter = isCorrect(key, currentLetter);
  userInfo.lastKeys.push(coloredLetter);
  userInfo.newStringArr += coloredLetter;
  currentWord += coloredLetter;

  currentIndex++;
  if (key != " ") {
    completedWords += currentWord;
    insertNew(userInfo.newStringArr, userInfo.valArr);
  } else {
    insertNew(currentWord, userInfo.valArr, true);
  }
}
function backspaceKey() {
  if (
    userInfo.lastKeys.pop() ==
    '<span style="background-color: #1b998b" class="newLetter"> </span>'
  ) {
    let lastWord = userInfo.lastWords.pop();
    currentIndex = currentIndex - 2;
    document.getElementById("inputField").value = lastWord;
    document.getElementById("wordsField").innerHTML =
      lastWord + userInfo.valArr.join("");
    userInfo.valArr.unshift(userInfo.gameString[currentIndex]);
  } else {
    let backspacedKey = userInfo.lastKeys.pop();
    backspacedKey.remove("span");
    userInfo.valArr.unshift(backspacedKey);
    currentIndex -= currentIndex;
    document.getElementById("wordsField").innerHTML = userInfo.valArr.join("");
  }
  //let lastKey = userInfo.lastKeys.pop();
  //console.log(lastKey);
  //currentIndex = currentIndex - 1;

  //userInfo.newStringArr = userInfo.colorLastWords.pop();

  //userInfo.newStringArr = userInfo.newStringArr.slice(
  //-1
  //userInfo.newStringArr.length - lastLen
  /*
  if (lastKey == " ") {
    let lastWord = userInfo.lastWords.pop();
    console.log(lastWord);
    currentIndex = currentIndex - 2;
    document.getElementById("inputField").value = lastWord;
  } else {
    currentIndex -= currentIndex;
    document.getElementById("wordsField").innerHTML =
      currentWord + valArr.join("");
  } */
  //insertNew(userInfo.newStringArr, userInfo.valArr);
}

function insertNew(newStringArr, valArr, space = false) {
  if (space === true) {
    console.log("current index: " + currentIndex);
    document.getElementById("wordsField").innerHTML = valArr.join("");
    currentWord = "";
    userInfo.newStringArr = "";
  } else {
    document.getElementById("wordsField").innerHTML =
      currentWord + valArr.join("");
  }
}
function isCorrect(key, currentLetter) {
  if (key == currentLetter) {
    return (
      '<span style="background-color: #1b998b" class="newLetter">' +
      currentLetter +
      "</span>"
    );
  } else {
    userInfo.errors++;
    return (
      '<span style="background-color: #a31621" class="newLetter">' +
      currentLetter +
      "</span>"
    );
  }
}
/*
function displayRoundResults() {
  let scores = getScore();
  userInfo[currentRound].wpm = scores[0];
  userInfo[currentRound].accuracy = Math.round(scores[1]);

  document.getElementById("mainP").setAttribute("class", "roundInfoStyle");
  document.getElementById("mainP").innerHTML =
    "<h4>Round " +
    currentRound +
    " Complete</h4><hr><p>Errors: " +
    userInfo[currentRound].errors +
    "<p> WPM: " +
    userInfo[currentRound].wpm +
    "</p><p> Accuracy: " +
    userInfo[currentRound].accuracy +
    "%</p>";
}
/*
  if (currentRound < 3) {
    document.getElementById("startBtn").innerText = "Next Round";
  } else {
    document.getElementById("startBtn").innerText = "See Final Score";
    document.getElementById("startBtn").addEventListener("click", finalScore);
  }
  showElements([document.getElementById("startBtn")]);
}

function getScore() {
  let seconds =
    (userInfo[currentRound].endTime - userInfo[currentRound].startTime) / 1000;
  let minutes = seconds / 60;
  console.log(Math.round(seconds) + " seconds");
  let wpm = Math.floor(userInfo[currentRound].gameString.length / 5 / minutes);
  let accuracy =
    ((userInfo[currentRound].gameString.length -
      userInfo[currentRound].errors) /
      userInfo[currentRound].gameString.length) *
    100;
  console.log(wpm, accuracy);

  return [wpm, accuracy];
}
function finalScore() {
  let totalErrors =
    userInfo[1].errors + userInfo[2].errors + userInfo[3].errors;
  let averageWpm = Math.round(
    (userInfo[1].wpm + userInfo[2].wpm + userInfo[3].wpm) / 3
  );
  let averageAcc = Math.round(
    (userInfo[1].accuracy + userInfo[2].accuracy + userInfo[3].accuracy) / 3
  );

  document.getElementById("mainP").setAttribute("class", "roundInfoStyle");
  document.getElementById("mainP").innerHTML =
    "<h4>Final Score</h4><hr><p>Total Errors: " +
    totalErrors +
    "<p> Average WPM: " +
    averageWpm +
    "</p><p> Average Accuracy: " +
    averageAcc +
    "%</p>";
}


function startNewRound() {
  document.getElementById("inputField").value = "";
}
*/
/* Below this is good */
window.onload = function () {
  randomSentence = getSentence(Math.floor(Math.random() * sentences.length));
  wordsField.innerHTML = randomSentence;
  userInfo.gameString = randomSentence;
  userInfo.valArr = randomSentence.split("");
  userInfo.eachWordArr = randomSentence.split(" ");
  userInfo.newStringArr = "";
  userInfo.errors = 0;
  //userInfo.lenArr = [];
  userInfo.lengthVal = 66;
  userInfo.lastKeys = [];
  userInfo.lastWords = [];
  userInfo.colorLastWords = [];
};
function getSentence(randomIndex) {
  let randomSen = sentences[randomIndex];
  return randomSen;
}

document.addEventListener("keyup", (e) => {
  if (totalKeystrokes == 0) {
    let countdownInterval = setInterval(countdown_timer, 1000);
    totalKeystrokes++;
    document.getElementById("instructions").setAttribute("class", "hide");
    e.preventDefault();
  }
  getKey(e);
});

function countdown_timer() {
  if (time != 0) {
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);
    document.getElementById("countdownClock").innerHTML =
      minutes + ":" + seconds;
    time--;
    if (seconds < 10) {
      document.getElementById("countdownClock").innerHTML =
        minutes + ":0" + seconds;
    }
  } else {
    document.getElementById("countdownClock").innerHTML = "0:00";
    clearInterval(countdown_timer);
  }
}
