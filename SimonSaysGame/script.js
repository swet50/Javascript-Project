let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let started = false;
let level = 0;
let btns = ["red", "yellow", "blue", "purple"]

let h2 = document.querySelector("#level-title");


document.addEventListener('keypress', () => {
    if (started == false) {
        console.log("Game is  started")
        started = true;
        levelUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash")
    setTimeout(() => {
        btn.classList.remove("flash")
    }, 600)
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtns = document.querySelector(`.${randColor}`)

    gameSeq.push(randColor);
    console.log(gameSeq);

    btnFlash(randBtns);
}


let hScore = document.createElement("h3");
hScore.style.display = "none";

document.body.appendChild(hScore);



function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);

            if (highestScore < level) {
                highestScore = level;
                hScore.innerText = `🔥 You broke the Highest Score! New Highest Score: ${highestScore}`
                hScore.style.display = "block";
                setTimeout(() => {
                    hScore.style.display = "none";
                }, 2000);
            }
        }
    } else {
        h2.innerHTML = `Game Over! your score was : <b>${level}</b> <br> press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white"
        }, 100)
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor)
    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
    btn.addEventListener('click', btnPress)
}


function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    hScore.style.display = "none";

}
