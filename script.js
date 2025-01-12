const timeDisplay = document.getElementById("time");
const streak = document.getElementById("streak");
const random = document.getElementById("random");

const posts = "ABCDEFGHIJKL";
var currentPost = null;
var randomPost = getRandomPost();
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

      if (timePassed < 15) {
        timeDisplay.classList = "green";
        void timeDisplay.offsetWidth;
      } else if (timePassed < 35) {
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

    post += post.length == 2 ? "" : "C";

    guesses++;

    if (post.substring(0, 1) == randomPost) {
      correct++;
      randomPost = getRandomPost();
      random.innerHTML = randomPost;
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
