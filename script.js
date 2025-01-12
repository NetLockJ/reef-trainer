const timeDisplay = document.getElementById("time");
const streak = document.getElementById("streak");
const random = document.getElementById("random");

const posts = "ABCDEFGHIJKL";

const phonetic = {
    "A": "Alfa",
    "B": "Bravo",
    "C": "Charlie",
    "D": "Delta",
    "E": "Echo",
    "F": "Foxtrot",
    "G": "Golf",
    "H": "Hotel",
    "I": "India",
    "J": "Juliett",
    "K": "Kilo",
    "L": "Lima",
    "M": "Mike",
    "N": "November",
    "O": "Oscar",
    "P": "Papa",
    "Q": "Quebec",
    "R": "Romeo",
    "S": "Sierra",
    "T": "Tango",
    "U": "Uniform",
    "V": "Victor",
    "W": "Whiskey",
    "X": "X-ray",
    "Y": "Yankee",
    "Z": "Zulu"
  }

var currentPost = null;
var randomPost = phonetic[getRandomPost()];
var correct = 0;
var guesses = 0;
timerInterval = null;
timePassed = 0;

random.innerHTML = randomPost;

posts.split("").forEach((ch) => {
  var post = document.getElementById(ch);
  var coral = document.getElementById(ch + "C");
  post.addEventListener("pointerdown", (event) => {
    guessCoral(event);
    console.log(`Clicked on: ${ch}`);
  });

  coral.addEventListener("pointerdown", (event) => {
    guessCoral(event);
    console.log(`Clicked on: ${ch}`);
  });
});

function getRandomPost() {
  rand = (Math.random() * 12) | 0;
  return posts.substring(rand, rand + 1);
}

function updateStreak() {
  streak.innerHTML = correct + "/" + guesses;
  if (correct / guesses < 0.5) {
    streak.classList = "red";
  } else if (correct / guesses < 0.8) {
    streak.classList = "orange";
  } else {
    streak.classList = "green";
  }
}

function startTimer() {
  if (timerInterval == null) {
    timeDisplay.innerHTML = formatDisplayTime(timePassed);
    timerInterval = setInterval(() => {
      timePassed += 0.02;

      timeDisplay.innerHTML = formatDisplayTime(timePassed);

      if (timePassed < 12) {
        timeDisplay.classList = "green";
        void timeDisplay.offsetWidth;
      } else if (timePassed < 25) {
        timeDisplay.classList = "orange";
      } else {
        timeDisplay.classList = "red";
      }
    }, 20);
  }
}

function formatDisplayTime(time) {
  return time.toFixed(2);
}

function guessCoral(event) {
  if (correct > 19) {
    clearInterval(timerInterval);
    timerInterval = null;
  } else {
    var post = event.target.id;

    console.log(post, randomPost)

    post += post.length == 2 ? "" : "C";

    guesses++;

    if (post.substring(0, 1) == randomPost.substring(0,1)) {
      correct++;
      randomPost = getRandomPost();
      random.innerHTML = phonetic[randomPost];
      random.classList = "green";
      setTimeout(() => {
        random.classList = "white";
      }, 500);
    } else {
      random.classList = "red";
      setTimeout(() => {
        random.classList = "white";
      }, 500);
    }

    updateStreak();

    if (currentPost != null) {
      currentPost.setAttribute("fill-opacity", "0");
    }

    currentPost = document.getElementById(post);
    currentPost.setAttribute("fill-opacity", "1");

    if (timerInterval == null) {
      startTimer();
    }
  }
}
