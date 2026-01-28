let question = document.querySelector('.question');
let option = document.querySelectorAll('.option');
let nextButton = document.querySelector('.next-button')

let resultBox = document.querySelector('.result');
let scoreText = document.querySelector('.score-text');
let restartBtn = document.querySelector('.restart-btn');


let questions = [];
let loading = document.querySelector('.loading');
let wrapper = document.querySelector('.wrapper');

wrapper.classList.add('hidden');
loading.classList.remove('hidden');

fetch("https://opentdb.com/api.php?amount=10&type=multiple")
    .then((res) => res.json())
    .then(data => {

        data.results.forEach((item) => {

            let options = [...item.incorrect_answers,
            item.correct_answer];
            options.sort(() => Math.random() - 0.5);

            questions.push({
                question: decodeHTML(item.question || ""),
                options: options.map(opt => decodeHTML(opt || "")),
                answer: decodeHTML(item.correct_answer || "")
            })
        })
        loading.classList.add('hidden');
        wrapper.classList.remove('hidden');
        loadQuestion();

    })

function decodeHTML(text) {
    if (!text) return "";
    let txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}





let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

//question loading
function loadQuestion() {
    hasAnswered = false;
    nextButton.disabled = true;
    question.innerText = questions[currentQuestion].question;
    option.forEach((opt, index) => {
        opt.innerText = questions[currentQuestion].options[index];
        opt.classList.remove('option-select', 'correct', 'wrong');
        opt.style.pointerEvents = 'auto';
    });

}


// result show 
function showResult() {
    document.querySelector('.wrapper').classList.add('hidden');
    loading.classList.add('hidden');
    resultBox.classList.remove('hidden');
    document.body.classList.add('result-bg');
    scoreText.innerText = `You scored ${score} / ${questions.length}`;
}


//next button

nextButton.addEventListener('click', (e) => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }




})


//option click

option.forEach((opt) => {
    opt.addEventListener('click', (e) => {

        if (hasAnswered) return;
        hasAnswered = true;
        option.forEach((o) => {
            o.classList.remove('option-select');
            o.style.pointerEvents = 'none';

        });

        let selectedOption = e.target;
        selectedOption.classList.add('option-select');

        let correctAnswer = questions[currentQuestion].answer


        if (selectedOption.innerText === correctAnswer) {
            selectedOption.classList.add('correct');
            score++;
        } else {
            selectedOption.classList.add('wrong');
        }

        nextButton.disabled = false;

    })
})


//restart button

restartBtn.addEventListener('click', () => {
    score = 0;
    currentQuestion = 0;

    resultBox.classList.add('hidden');
    document.querySelector('.wrapper').classList.remove('hidden');

    document.body.classList.remove('result-bg');
    loadQuestion();


})