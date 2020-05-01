const instructions = document.getElementById('instructions')
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const submitResults = document.getElementById('results-btn')
const questionContainerElement = document.getElementById ('question-container')
const getScoreEl = document.getElementById('scoreboard')
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = .1; 
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
    pointsFunc(correct)
    timePenalty(time, correct)
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

function timePenalty(time, correct) {
    if (correct) {
        time = time
    } else {
        // timerEl.innerText = (timerEl.innerText - 10)
        time = time - 10
    }
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
    },
    {
        question: 'Which of the following is NOT one of the three common languages used to create web pages?', 
        answers: [
            {text: 'Python', correct: true}, 
            {text: 'CSS', correct: false},
            {text: 'HTML', correct: false},
            {text: 'JavaScript', correct: false},
        ]
    },
    {
        question: 'What is the proper tag used to comment out HTML code?', 
        answers: [
            {text: '/* /', correct: false}, 
            {text: '<!-- -->', correct: true},
            {text: '**== ==**', correct: false},
            {text: '^^_ _^^', correct: false},
        ]
    },
]

function timerCounter() {
    setInterval(function() {
        if (time <= 0) {
            clearInterval(time = 0)
            timerExpire()
        }
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerEl.innerHTML = `${minutes}: ${seconds}`;
        time-=1;
    }, 1000)
}

function timerExpire() {
    answerButtonsElement.classList.add('hide')
    questionElement.classList.add('hide')
    submitResults.classList.remove('hide')
}

function enterScore() {
    var playerName = prompt ("Enter your name to record your score.")
    localStorage.setItem('User', playerName)
    console.log(playerName)
    getScoreEl.classList.remove('hide')
    $('#scoreboard').append('<br> Congratulations, ' + playerName + '!' + ' You have earned ' + points + ' points!')
    // startButton.classList.remove('hide')
    // submitResults.classList.add('hide')
    timerCounter()
}

//I want to have submit results disappear after user enters name but it won't because if statement in "timerCounter" function. How do I fix this? Should I do a "Do" loop so it Also, I want to maintain a high-score list so as the user plays they can see their progress. Last, I want to allow the user to play again after they are done entering their name and reviewing their score. 


// function shareScores(playerName) {
//     getScoreEl.classList.remove('hide')
//     $('#scoreboard').append('Congratulations,' + playerName + '!')
// }
