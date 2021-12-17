let randomSentence;
let completedWords = [];
let currentWord = "";
let currentIndex = 0;
let wordIndex = 0;
let time = 60;
let totalKeystrokes = 0;
let wordsField = document.getElementById("wordsField");

let userInfo = {};
const sentences = [
  "christina blakely how was dog mail cat ear drink home glass cake water car textbook baseboards lackhack whichever yellow stargaze snow day school park anteater blue television selling astonishing indoor reasonable embryo gasp background systematic functional final case behavior replacement resource needle marketing novel west structure fang redundant snail grouchy tendency badge legs bloody grubby imagine nappy sedate murmur lumpy good sleep fall existence knit connotesting melodic die request push kid sour disease houses drain dinosaurs mislead legrail violent flock minetray forgive drunk",
  "christina blakely website pen paper agenda toy baby dinner music circle team interview influence ring cleaner fluffy charger planner cup mouse sticker tree nature edge fan mosquito soar prevalence state instinct snow utter spit preoccupation window key height invasion ostracize mean contradiction category hypothesis routine ghostwriter pat stress happen image fierce religion toe thin blush illustrious inhabit apparel amount event ooze recondite escape beneficial insect jewel thumbs way shut board splendid burn burly prove illumine pet womanly degree imply canvass",
  "christina blakely shoe book ring plug garden draw mailbox mouse charge food assist author became flight editor eating doctor engine empire dollar winner tennis ticket window writer yellow concert color-blind watch sour positive sentence disposition common do overeat hell colon plagiarize knot wire orgy research credibility hunter appearance veteran steep fight mile shake list glance obsolete branch neat string groovy boiling thirsty violates link satiated i gestion amazing reply ring tree enchanted rend restrain chain kind hug attract detailed cease rude worship ant lumber daffy suffer combative numerous deadpan giants snails aunt appear",
  "christina blakely tree bird movie heel dog truck soccer game polish color share sports shopping travel money weather computer average inject meadow quote ruin dark lesson team problem crude body concert contrast wool leap hypnotize creature survive help horses mouth fancy breathe stop typical wet zoom gabby blowhuge perfect suggestions alty successful help less married consign wary applegarden blow lively chance cheap sour legal taste part suggest allow outrageous compel giant crabby game word respect race stage modify jittery wave few secretary disillusioned perpetual verify press watch join consult bat feeble curly joyous  cry milky lavish colossal apathetic migrate fish",
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
    userInfo.lastKeys.at(-1) ==
    '<span style="background-color: #008F6B" class="newLetter"> </span>'
  ) {
    userInfo.lastKeys.pop();
    userInfo.valArr.unshift(" ");
    userInfo.newStringArr = userInfo.colorLastWords.pop();

    document.getElementById("inputField").value = userInfo.lastWords.pop();
    document.getElementById("wordsField").innerHTML =
      userInfo.newStringArr + " " + userInfo.valArr.join("");
    currentIndex = currentIndex - 1;
  } else {
    currentWord = currentWord.slice(0, currentWord.length - 66);
    userInfo.newStringArr = userInfo.newStringArr.slice(
      0,
      userInfo.newStringArr.length - 66
    );
    currentIndex = currentIndex - 1;
    userInfo.valArr.unshift(userInfo.gameString.at(currentIndex));
    document.getElementById("wordsField").innerHTML =
      userInfo.newStringArr + userInfo.valArr.join("");
    userInfo.lastKeys.pop(-1);
  }
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
      '<span style="background-color: #008F6B" class="newLetter">' +
      currentLetter +
      "</span>"
    );
  } else {
    userInfo.errors++;
    return (
      '<span style="background-color: #A44A3F" class="newLetter">' +
      currentLetter +
      "</span>"
    );
  }
}
function calcScore() {
  let wpm = userInfo.lastKeys.length / 5;
  let totalCorrect = 0;
  let accuracy;
  let rank;
  let saying;
  userInfo.lastKeys.forEach((element) => {
    if (element.includes("#008F6B")) {
      totalCorrect++;
    }
  });
  if (wpm <= 40) {
    rank = "Below Average";
    saying = "Keep practicing your skills!";
  } else if (wpm > 40 && wpm <= 70) {
    rank = "Above Average!";
    saying = "Not too shabby!";
  } else {
    rank = "Excellent!";
    saying = "You are a typing genius, congratulations!";
  }
  accuracy = Math.round((totalCorrect / userInfo.lastKeys.length) * 100);
  document.getElementById("wordsField").innerHTML =
    "<h2>Rank: " +
    rank +
    "</h2><br>" +
    "</h3><br><p>Words Per Minute: " +
    wpm +
    "<br> Accuracy: " +
    accuracy +
    "% <br> Total Errors: " +
    userInfo.errors +
    "</p>";
}

window.onload = function () {
  randomSentence = getSentence(Math.floor(Math.random() * sentences.length));
  wordsField.innerHTML = randomSentence;
  userInfo.gameString = randomSentence;
  userInfo.valArr = randomSentence.split("");
  userInfo.eachWordArr = randomSentence.split(" ");
  userInfo.newStringArr = "";
  userInfo.errors = 0;

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
    document.getElementById("inputField").setAttribute("class", "hide");
    document.getElementById("playAgain").removeAttribute("class", "hide");
    clearInterval(countdown_timer);
    calcScore();
  }
  document.getElementById("inputField").removeAttribute("placeholder");
}
