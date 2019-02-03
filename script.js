//To do:
//Add a menu
//Add powers(6^2 = 36)
//Add a timer


//Inputs
let question = document.getElementById('question');
let input = document.getElementById('input');
let scoreNode = document.getElementById('score');

//Radio buttons
let radioMulti = document.getElementById('multiplication');
let radioPowers = document.getElementById('powers');
let multi = false, powers = false;

//Variables
let score = 0;
let streak = 1;
let lastNumber;
let answer;
let playedChords = [];

//Range
let min = 3;
let max = 13;
let inputMin = document.getElementById('min');
let inputMax = document.getElementById('max');
inputMin.value = min;
inputMax.value = max;
inputMin.addEventListener('input', onMinMaxChanged);
inputMax.addEventListener('input', onMinMaxChanged);

//Input min max event listener
function onMinMaxChanged(e){
    //If the value of the input is empty or not a number, ignore it
    if (isNaN(e.target.value) || e.target.value == "" || e.target.value == undefined){
        return;
    }

    switch(e.target){
        case inputMin:
        min = inputMin.value;
        break;

        case inputMax:
        max = inputMax.value;
        break;
    }
    
    //if min > max so absoulte value
    start();
}

//Listen for 'Enter' keypress to accept answer
document.addEventListener('keypress', function(event){
    if (event.keyCode == 13){
        checkAnswer();
    }
});

radioMulti.addEventListener('change', onRadioChanged);
radioPowers.addEventListener('change', onRadioChanged);

//Change mode
function onRadioChanged(e){
    switch(e.target){
        case radioMulti:
        multi = true;
        powers = false;
        break;
        case radioPowers:
        multi = false;
        powers = true;
        break;
    }
    
    input.focus();
    start();
}

//Get a new exercise
function getExercise(){
    input.value = "";
    let n1 = 0, n2 = 0;
    while(true){
        n1 = Math.round(Math.random() * Number((max - min)) + Number(min));
        
        if (n1 != lastNumber){
            lastNumber = n1;
            break;
        }
    }

    //Multiplication
    if(multi){
        n2 = Math.round(Math.random() * Number((max - min)) + Number(min));
        answer = n1 * n2;
        question.innerHTML = `${n1.toString()} X ${n2.toString()}`;
    }

    //n1 to the power of itself(maybe others soon)
    else if(powers){
        answer = n1 * n1;
        question.innerHTML = `${n1.toString()}²`;
    }
}

//Check if the answer is correct
function checkAnswer(){
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

//Pause execution for (ms) seconds
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Put some major and minor chords inside arrays
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
function start(){
    input.value = "";
    score = 0;
    scoreNode.innerHTML = score;
    streak = 1;
    initializeChords();
    getExercise();
}

radioMulti.checked = false;
radioPowers.checked = false;
radioMulti.click();