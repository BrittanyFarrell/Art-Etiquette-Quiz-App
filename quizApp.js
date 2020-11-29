/* eslint-disable indent */
/* eslint-disable strict */
  
import * as Store from "./store.js"
const store = Store.store;




/*
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material, consult your instructor, and reference the slides for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates

  function generateMainPage() {
    return `<Section>
    <h2>A quiz on artistic techniques and practices.</h2>
    <p>Click the button below to begin.</p><br>
    <button type="submit" id="start-quiz" class="btn">Start Quiz</button>
</Section>`
}

function generateIncorrectAnswerFeedback() {
    return `
    <section>
        <h3>Incorrect</h3>
        <p>Sorry, but the correct answer was option ${correctAnswerName}, “${correctAnswer}”</p><br><br>
        <button type="button" id="next-question" class="btn">Next Question</button>
    </section>`
}

function generateCorrectAnswerFeedback() {
    return `
    <section>
        <h3>Correct</h3>
        <p>That's right! The answer was “${correctAnswer}” Well done.</p><br><br>
        <button type="button" id="next-question" class="btn">Next Question</button>
    </section>`
}

let correctAnswer = '';
let correctAnswerName = '';
let givingFeedback = false
let submission = '';
let feedback = '';

function findCorrectAnswerName(array) {
    switch(correctAnswer) {
        case array[0]:
            return 'one';
        case array[1]:
            return 'two';
        case array[2]:
            return 'three';
        case array[3]:
            return 'four';
        default:
            throw Error('No match found. correct answer name unknown')
    }
}

function generateQuestion() {
    let currentQuestion = store.questions[store.questionNumber];
    correctAnswer = currentQuestion.correctAnswer
    correctAnswerName = findCorrectAnswerName(currentQuestion.answers);
   console.log('correctAnswer: ' + correctAnswer)
   console.log('correctAnswerName: ' + correctAnswerName)

    if (submission === 'correct') {
       feedback = generateCorrectAnswerFeedback();
    } if (submission === 'incorrect') {
       feedback = generateIncorrectAnswerFeedback();
    } 

   console.log('submission: ' + submission)
   console.log('feedback: ' +  feedback)

    if (!givingFeedback) {
        return `
    <section>

        <div class="side-by-side">
            <p class="space-below">Question Number: ${store.questionNumber + 1}</p> <p>Score: ${store.score}</p>
        </div>

        <form id="question">
            <h3>${currentQuestion.question}</h3>

            <input type="radio" name="answer" id="one" required value="${currentQuestion.answers[0]}">
            <label for="one">${currentQuestion.answers[0]}</label><br>

            <input type="radio" name="answer" id="two" value="${currentQuestion.answers[1]}">
            <label for="two">${currentQuestion.answers[1]}</label><br>

            <input type="radio" name="answer" id="three" value="${currentQuestion.answers[2]}">
            <label for="three">${currentQuestion.answers[2]}</label><br>

            <input type="radio" name="answer" id="four" value="${currentQuestion.answers[3]}">
            <label for="four">${currentQuestion.answers[3]}</label><br>

            <button type="submit" id="submit-answer"  class="btn">Submit Answer</button>
        </form>
    </section>`
    } if (givingFeedback) {
        return `
    <section>

        <div class="side-by-side">
            <p class="space-below">Question Number: ${store.questionNumber + 1}</p> <p>Score: ${store.score}</p>
        </div>

        <form id="question">
            <h3>${currentQuestion.question}</h3>

            <input type="radio" name="answer" id="one" required value="${currentQuestion.answers[0]}">
            <label for="one">${currentQuestion.answers[0]}</label><br>

            <input type="radio" name="answer" id="two" value="${currentQuestion.answers[1]}">
            <label for="two">${currentQuestion.answers[1]}</label><br>

            <input type="radio" name="answer" id="three" value="${currentQuestion.answers[2]}">
            <label for="three">${currentQuestion.answers[2]}</label><br>

            <input type="radio" name="answer" id="four" value="${currentQuestion.answers[3]}">
            <label for="four">${currentQuestion.answers[3]}</label><br>
        </form>
    </section>
    ${feedback}`
    }
    
}

function generateFinalPage() {
    return `
    <section>
        <h3>Quiz Complete</h3>
        <p>You got "${store.score}" questions right and "${5 - store.score}" questions wrong, completing the quiz with a score of:</p><br>
        <h4>${store.score * 20}%</h4>
        <p>Click the button below to take the quiz again.</p><br>
        <button type="button" id="restart" class="btn">Restart Quiz</button>
    </section>`
}
  
  /********** RENDER FUNCTION(S) **********/
  
  function render() {
    let HTML ='';
    if (!store.quizStarted) {
        HTML = generateMainPage();
        
    } if (store.quizStarted) {
        if (store.questionNumber < store.questions.length){
            HTML = generateQuestion();
        } else {
            HTML = generateFinalPage();
        }
        
    }

    $('main').html(HTML);
}
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)

function startQuiz() {
    $('main').on('click', '#start-quiz',  function(e) {
        e.preventDefault();
        store.quizStarted = true;
        render();
    });
}

// function submitAnswer() {
//     $('#submit-answer').on('click',  function(e) {
//         e.preventDefault;
//         console.log('button clicked')
//     });
// }

function submitAnswer() {
    $('main').on('submit', '#question',  function(e) {
        e.preventDefault();
        if (givingFeedback === false) {
            givingFeedback = true
            let selected = $(this).find('input:checked').val();

            console.log('selected: ' + selected)

            if (selected === correctAnswer) {
                store.score++
                submission = 'correct'
            } else {
                submission = 'incorrect'
            }

            render();
        }
        
    });
}

function nextQuestion() {
    $('main').on('click', '#next-question',  function(e) {
        e.preventDefault();
        if (store.questionNumber < store.questions.length){
            givingFeedback = false;
            store.questionNumber++;
            render();
        }
        
    });
}

function restartQuiz() {
    $('main').on('click', '#restart',  function(e) {
        e.preventDefault();
        if (store.questionNumber >= store.questions.length){
            store.quizStarted = false;
            store.questionNumber = 0;
            store.score = 0;
            render();
        }
        
    });
}

function main() {
    render();
    startQuiz();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}

$(main)