let timer;
let timeLeft = 600; // 10 minutes
let wordCount = 0;
let isTestRunning = false;

const textToType = document.getElementById("textToType").innerText.split(" ");
const userInput = document.getElementById("userInput");
const errorDisplay = document.getElementById("errorDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const speedDisplay = document.createElement("div");
speedDisplay.id = "speedDisplay";
document.querySelector(".container").appendChild(speedDisplay);

userInput.addEventListener("input", updateInput);
userInput.disabled = true; // Initially disabled

function updateInput() {
    // Auto start when the user begins typing
    if (!isTestRunning) {
        startTest();
    }

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
    const totalWords = textToType.length;

    // Check if the user has completed the test
    if (wordCount === totalWords) {
        endTest();
    }

    // Calculate and display speed in WPM
    const elapsedTime = 600 - timeLeft; // Total elapsed time in seconds
    const speed = ((wordCount / elapsedTime) * 60).toFixed(2); // Words Per Minute
    speedDisplay.innerHTML = `Speed: ${speed} WPM`;
}

function startTest() {
    isTestRunning = true;
    userInput.disabled = false;
    userInput.focus();
    userInput.value = '';
    wordCount = 0;
    errorDisplay.innerHTML = '';
    resultDisplay.classList.add('hidden');
    speedDisplay.innerHTML = "Speed: 0 WPM";

    timer = setInterval(updateTimer, 1000);
}

function endTest() {
    clearInterval(timer);
    userInput.disabled = true;
    isTestRunning = false;

    const speed = (wordCount / (600 - timeLeft) * 60).toFixed(2);
    resultDisplay.innerHTML = `Test Completed! You typed ${wordCount} words. Speed: ${speed} WPM.`;
    resultDisplay.classList.remove('hidden');
}

function updateTimer() {
    if (timeLeft <= 0) {
        endTest();
    } else {
        timeLeft--;
    }
}
