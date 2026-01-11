let timer;
let isPaused = false;
let timeLeft = 600; // 10 minutes
let wordCount = 0;
let startTime = 0;
let isTestRunning = false;

const textToType = document.getElementById("textToType").innerText.split(" ");
const userInput = document.getElementById("userInput");
const errorDisplay = document.getElementById("errorDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const speedDisplay = document.createElement("div");
speedDisplay.id = "speedDisplay";
document.querySelector(".container").appendChild(speedDisplay);

document.getElementById("startButton").addEventListener("click", startTest);
document.getElementById("pauseButton").addEventListener("click", pauseTest);
document.getElementById("restartButton").addEventListener("click", restartTest);
document.getElementById("stopButton").addEventListener("click", stopTest);
userInput.addEventListener("input", updateInput);

function startTest() {
    if (!isTestRunning) {
        isTestRunning = true;
        userInput.disabled = false;
        userInput.focus();
        document.getElementById("pauseButton").disabled = false;
        document.getElementById("restartButton").disabled = false;
        document.getElementById("stopButton").disabled = false;
        userInput.value = '';
        wordCount = 0;
        errorDisplay.innerHTML = '';
        resultDisplay.classList.add('hidden');
        speedDisplay.innerHTML = "Speed: 0 WPM";

        timer = setInterval(updateTimer, 1000);
    }
}

function updateInput() {
    const userWords = userInput.value.split(" ");
    errorDisplay.innerHTML = '';

    for (let i = 0; i < userWords.length; i++) {
        const span = document.createElement("span");
        if (userWords[i] === textToType[i]) {
            span.className = 'green';
            span.innerText = userWords[i] + " ";
        } else {
            span.className = 'red';
            span.innerText = userWords[i] + " ";
        }
        errorDisplay.appendChild(span);
    }

    // Update word count for speed calculation
    wordCount = userWords.filter(word => word).length;

    // Calculate and display speed in WPM
    const elapsedTime = 600 - timeLeft; // Total elapsed time in seconds
    const speed = ((wordCount / elapsedTime) * 60).toFixed(2); // Words Per Minute
    speedDisplay.innerHTML = `Speed: ${speed} WPM`;
}

function pauseTest() {
    if (isTestRunning) {
        isPaused = !isPaused;
        if (isPaused) {
            clearInterval(timer);
            document.getElementById("pauseButton").innerText = "Unpause Test";
        } else {
            startTime = Math.floor(Date.now() / 1000) - (600 - timeLeft);
            timer = setInterval(updateTimer, 1000);
            document.getElementById("pauseButton").innerText = "Pause Test";
        }
    }
}

function restartTest() {
    clearInterval(timer);
    timeLeft = 600;
    startTest();
}

function stopTest() {
    clearInterval(timer);
    userInput.disabled = true;
    isTestRunning = false;

    const speed = (wordCount / (600 - timeLeft) * 60).toFixed(2);
    resultDisplay.innerHTML = `Test Completed! You typed ${wordCount} words. Speed: ${speed} WPM.`;
    resultDisplay.classList.remove('hidden');
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        userInput.disabled = true;
        isTestRunning = false;
        const speed = (wordCount / 10).toFixed(2);
        resultDisplay.innerHTML = `Time's up! You typed ${wordCount} words. Speed: ${speed} WPM.`;
        resultDisplay.classList.remove('hidden');
    } else {
        timeLeft--;
    }
}
