const questions = [
    { 
        question: "How much is 3+3?",
        answers: [
            { text: "3", correct: false},
            { text: "6", correct: true},
            { text: "1", correct: false},
            { text: "2", correct: false},
        ]
    },
    {
        question: "How much is 2+2?",
        answers: [
            { text: "3", correct: false},
            { text: "4", correct: true},
            { text: "2", correct: false},
            { text: "8", correct: false},
        ]
    },
    {
        question: "How much is 3+2?", 
        answers: [
            { text: "3", correct: false},
            { text: "3", correct: false},
            { text: "5", correct: true},
            { text: "1", correct: false},
        ]
    },
    {
        question: "How much is 7+3?", 
        answers: [
            { text: "10", correct: true},
            { text: "2", correct: false},
            { text: "6", correct: false},
            { text: "3", correct: false},
        ]
    },
    ];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions [currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "."+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("button");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
        });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
    }
    }

    function selectAnswer(e){
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        if(isCorrect) {
            selectedButton.classList.add("correct");
            score++;
        }else{
            selectedButton.classList.add("incorrect");
        }
        Array.from(answerButton.children).forEach(button => {
            if(button.dataset.correct === "true") {
            button.classList.add("correct");
            }
            button.disabled = true;
            });
            nextButton.style.display = "block";

    }
    
    function showScore() {
        resetState();
            questionElement.innerHTML = `You scored ${score} out of ${questions.
            length}!`;
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
    }

    function handleNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
           showQuestion();
        }else{
            showScore();
        }
    }

    nextButton.addEventListener("click", ()=>{
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        }else{
            startQuiz();
        }
    });
startQuiz();