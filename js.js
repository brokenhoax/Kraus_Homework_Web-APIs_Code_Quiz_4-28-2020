const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById ('question-container')
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const startingMinutes = 2; 
let time = startingMinutes * 60;
let timerEl = document.getElementById("tick-tock")



startButton.addEventListener('click', startGame)

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    setInterval(timerCounter,1000)
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
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }

}

function selectAnswer() {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
}

const questions = [
    {
        question: 'The "object model" has all but the following:', 
        answers: [
            {text: 'Properties', correct: true}, 
            {text: 'Methods', correct: false},
            {text: 'Signals', correct: false},
            {text: 'Events', correct: false},
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






// =========================================================================

//     var toDoItems = []
//     //function to write out list items to DOM
//     // for loop
//     // pass the value of the loop into your write out function
//     $('#readyButton').on('click', function(event) {
//         var toDo = $("#userInput").val();
//         writeToDo(toDo);
//         submitUserInput();
//     });


//     // $('#userInput').keydown(function(event){
//     //     var keycode = (event.keycode ? event.keycode : event.which);
//     //     if(keycode == '13'){
//     //         var toDo = $("#userInput").val();
//     //         writeToDo(toDo);  
//     //     }
//     // });

//     function writeToDo(toDo) {
//         if (toDo) {
//             $('#toDoList').append(`
//                 <div class="alert alert-secondary taskList" id="toDoItem" role="toDoItem">
//                     <div class="row">
//                         <div class="col-10">
//                             <p id="toDoText">
//                                 ${toDo}
//                             </p>
//                         </div>
//                         <div class="col-2 ">
//                             <button type="button" class="btn deletebtn btn-success float-right" id="${toDo}">Complete</button>
//                         </div>
//                     </div>
//                 </div>`
//             );
//     }
//     }

//     function submitUserInput(){
//         toDoItems.push($('#userInput').val());
//         console.log(toDoItems);

//     }

//     $(document).on('click', 'button.deletebtn', function (toDo) {
//         $(this).closest('.taskList').remove();
//         return false;

//     });

//     // function deleteToDo(){
//     //     $('#toDO').on('click', function(event) {

//     // });