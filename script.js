//To do:
//Add a menu
//Add powers(6^2 = 36)
//Add a timer
let question = document.getElementById('question');
let input = document.getElementById('input');
let scoreNode = document.getElementById('score');
let score = 0;
let streak = 1;
let min = 3;
let max = 13;
let answer;
let notes = [0, 2, 3, 4, 5 ,6 ,1];
let playedNotes = [];

//Listen for 'Enter' keypress
document.addEventListener('keypress', function(event){
    if (event.keyCode == 13){
        checkAnswer();
    }
});

//Get a new exercise
function getExercise(){
    input.value = "";
    document.body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    input.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;

    //Multiply
    let n1 = Math.round(Math.random() * (max - min)) + min;
    let n2 = Math.round(Math.random() * (max - min)) + min;
    answer = n1 * n2;
    question.innerHTML = `${n1.toString()} X ${n2.toString()}`;
}

//Check if the answer is correct
async function checkAnswer(){
    //Correct
    if (answer == input.value){
        score += 1 * streak;
        if (score % 10 == 0){
            streak++;
        }
        
        scoreNode.innerHTML = score;
        getExercise();
        for (let i = 0; i < 7; i++) {
            playNote();
            await sleep(130);
        }
    }

    //Incorrect
    else{
        input.value = "";
        score = 0;
        streak = 1;
        scoreNode.innerHTML = score;
    }
}

//Randomly play a note
function playNote(){
    let audio;

    //If no notes left in the array, rebuild it
    if (notes.length == 0){
        notes = [0, 2, 3, 4, 5 ,6 ,1];
        playedNotes = [];
    }

    //If the note has already been played, stay in loop
    while (true){
        let n = notes[Math.round(Math.random() * (notes.length - 1))];
        
        //Note hasn't been played yet
        if (playedNotes.indexOf(n) == -1 && n != undefined){
            
            //Get the index of that note, and then remove it from the array, to not play it again
            let index = notes.indexOf(n);
            notes.splice(index, 1);
            playedNotes.push(n);
            //Play the note
            audio = new Audio(`sounds/majorc/${n}.wav`);
            audio.play();
            break;
        }
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

input.focus();
scoreNode.innerHTML = score;
getExercise();