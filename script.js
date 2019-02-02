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
let playedChords = [];

//Listen for 'Enter' keypress
document.addEventListener('keypress', function(event){
    if (event.keyCode == 13){
        checkAnswer();
    }
});

//Get a new exercise
function getExercise(){
    input.value = "";

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
        playChord();
    }

    //Incorrect
    else{
        document.body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
        input.value = "";
        score = 0;
        streak = 1;
        scoreNode.innerHTML = score;
    }
}

//Randomly play a chord
function playChord(){
    //If no chords left in the array, rebuild it
    if (chords.length == 0){
        initializeChords();
    }

    //If the chord has already been played, stay in loop
    while (true){
        let n = chords[Math.round(Math.random() * (chords.length - 1))];
        
        //Chord hasn't been played yet
        if (playedChords.indexOf(n) == -1 && n != undefined){
            //Play the chord
            let note1 = new Audio(`sounds/${n[0]}.wav`);
            let note2 = new Audio(`sounds/${n[1]}.wav`);
            let note3 = new Audio(`sounds/${n[2]}.wav`);
            note1.play();
            note2.play();
            note3.play();

            //Remove it from the array, to not play it again
            let index = chords.indexOf(n);
            chords.splice(index, 1);
            playedChords.push(n);
            break;
        }
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initializeChords(){

    let Cmajor = ["C", "E", "G"];
    let Dmajor = ["D", "Fs", "A"];
    let Emajor = ["E", "Gs", "B"];
    let Fmajor = ["F", "A", "C"];
    let Gmajor = ["G", "B", "D"];
    let Amajor = ["A", "Cs", "E"];
    let Bmajor = ["B", "Eb", "Fs"];

    chords = [Amajor, Bmajor, Cmajor, Dmajor, Emajor, Fmajor, Gmajor];
    playedChords = [];
}

//Main method
document.body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
input.focus();
scoreNode.innerHTML = score;
initializeChords()
getExercise();