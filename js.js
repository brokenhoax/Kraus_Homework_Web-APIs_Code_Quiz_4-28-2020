const instructions = document.getElementById('instructions')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitResults = document.getElementById('results-btn')
const questionContainerElement = document.getElementById ('question-container')
const getScoreEl = document.getElementById('scoreboard')
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = 2; 
let time = startingMinutes * 60;
let timerEl = document.getElementById("tick-tock")
let points = 0;
// var player;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click',() => {
    answerButtonsElement.classList.remove('hide')
    questionElement.classList.remove('hide')
    currentQuestionIndex++
    setNextQuestion()
})

submitResults.addEventListener('click', enterScore)


function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    instructions.classList.add('hide')
    setInterval(timerCounter,1000)
    setTimeout(timerExpire,120000)
    timerCounter()
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer =>  {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
        button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    pointsFunc(document.body, correct)
    timePenalty(document.body, correct)
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        answerButtonsElement.classList.add('hide')
        questionElement.classList.add('hide')
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }       else {
        answerButtonsElement.classList.add('hide')
        questionElement.classList.add('hide')
        submitResults.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

function pointsFunc(correct) {
    if (correct) {
        points = points + 10
    } else {
        points = points - 10
    }
    console.log(points)
}

function timePenalty(correct) {
    if (correct) {
        time = time
    } else {
        time = time - 20
        timerCounter(time);
    }
    console.log(time)
}

const questions = [
    {
        question: 'The "object model" has all but the following:', 
        answers: [
            {text: 'Properties', correct: false}, 
            {text: 'Methods', correct: false},
            {text: 'Signals', correct: true},
            {text: 'Events', correct: false},
        ]
    }, 
    {
        question: 'What is my favorite color?', 
        answers: [
            {text: 'Red', correct: false}, 
            {text: 'Green', correct: false},
            {text: 'Blue', correct: true},
            {text: 'Yellow', correct: false},
        ]
    }
]

function timerCounter() {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timerEl.innerHTML = `${minutes}: ${seconds}`;
    time--;
}

function timerExpire() {
    answerButtonsElement.classList.add('hide')
    questionElement.classList.add('hide')
    submitResults.classList.remove('hide')
    timerEl.classList.add('hide')
}

function enterScore() {
    var playerName = prompt ("Enter your name to record your score.")
    localStorage.setItem('User', playerName)
    console.log(playerName)
    submitResults.classList.add('hide')
    getScoreEl.classList.remove('hide')
    $('#scoreboard').append('Congratulations, ' + playerName + '!' + ' You have earned ' + points + ' points!') 
}
// function shareScores(playerName) {
//     getScoreEl.classList.remove('hide')
//     $('#scoreboard').append('Congratulations,' + playerName + '!')
// }
