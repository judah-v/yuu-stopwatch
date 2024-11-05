let timerRef = document.querySelector('.timerDisplay');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let countdownButton = document.getElementById('countdownButton');
let hrs_field = document.getElementById('hrs_field');
let mins_field = document.getElementById('mins_field');
let secs_field = document.getElementById('secs_field');
let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let int = null;
let opacity = .85;
let fadeout = false;
let isStopwatch = true;
let newRun = true;

hrs_field.addEventListener('blur', setTimer)
mins_field.addEventListener('blur', setTimer)
secs_field.addEventListener('blur', setTimer)
startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
countdownButton.addEventListener('click', toggleCountdown);

function start(){
    if(int!==null){
        clearInterval(int);
        int = null;
        startButton.innerText = "Start"
        startButton.style.background = "#20b380";
        newRun = false;
        
    } else {
        
        startButton.innerText = "Pause"
        startButton.style.background = "#007bff";
        int = setInterval(displayTimer,10);
        if(newRun){
            reset()
            newRun = false;
            start()
        }
    }
};

function toggleCountdown(){
    if (isStopwatch){
        countdownButton.innerText = "Stopwatch Mode"
        for (field of document.getElementsByClassName('timerOnly')){
            field.style.display = "initial";
        }
        isStopwatch = false;
    } else {
        countdownButton.innerText = "Countdown Mode";
        for (field of document.getElementsByClassName('timerOnly')){
            field.style.display = "none";
        }
        isStopwatch = true;
    }
    reset();
};

function reset(){
    clearInterval(int);
    int = null;
    startButton.innerText = "Start"
    startButton.style.background = "#20b380";
    if (isStopwatch){
        [milliseconds,seconds,minutes,hours] = [0,0,0,0];
        timerRef.innerHTML = '00 h 00 m 00 s 000';
    } else {
        [milliseconds,seconds,minutes,hours] = [0,0,0,0];
        setTimer();
    }
    newRun = true;

};

function displayTimer(){
    if ((milliseconds % 50) === 0){
        if (opacity <= 0 || opacity >= .85){
            fadeout = !fadeout;
        }
        opacity -= fadeout ? .0425 : -.0425;
        timerRef.style.boxShadow = `0 0 30px rgba(253, 84, 0,${opacity})`
    }
    if (isStopwatch){
        milliseconds+=10;
        if(milliseconds == 1000){
            milliseconds = 0;
            seconds++;
            if(seconds == 60){
                seconds = 0;
                minutes++;
                if(minutes == 60){
                    minutes = 0;
                    hours++;
                }
            }
        } 
    } else {
        milliseconds -= (milliseconds > 0) ? 10: 0;
        if (hours < 0 || minutes < 0 || seconds < 0){
            // alert(`${hours}:${minutes}:${seconds}`)
            reset()
            alert("Timer Done")

            return;
        }
        if(milliseconds === 0){// Still trying to correct timer going into negative values
            if(seconds <= 0 && (minutes > 0  || hours > 0)){
                if(!minutes && hours > 0){
                    minutes = 60;
                    hours--;
                }
                seconds = 60;
                minutes--;
            } else if ((!hours && !minutes && !seconds) || (!hours && !minutes && seconds <= 0)) { 
                reset();
                alert("Timer Done");
                // alert(`${hours}:${minutes}:${seconds}`)
                return;
            }
            milliseconds += 1000;
            seconds--;
        } 
    }
    milliseconds != 1000 ? updateTimer(): pass;
    
}

function updateTimer(){
    let h = hours < 10 ? hours === '' ? "00": "0" + hours : hours;
    let m = minutes < 10 ? minutes === '' ? "00": "0" + minutes : minutes;
    let s = seconds < 10 ? seconds === '' ? "00": "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}

function setTimer(){
    if (int === null && !isStopwatch && !(hours || minutes || seconds)){
        hours = hrs_field.value;
        minutes = mins_field.value;
        seconds = secs_field.value;
        milliseconds = 0;
        updateTimer();
    }
}
