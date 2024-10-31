let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let int = null;
let opacity = .85;
let fadeout = false;

document.getElementById('startTimer').addEventListener('click', ()=>{
    if(int!==null){
        clearInterval(int);
        int = null;
        btn = document.getElementById('startTimer')
        btn.innerText = "Start"
        btn.style.background = "#20b380";
        
    } else {
        btn = document.getElementById('startTimer')
        btn.innerText = "Pause"
        btn.style.background = "#d23332";
        int = setInterval(displayTimer,10);
    }
});

document.getElementById('resetTimer').addEventListener('click', ()=>{
    clearInterval(int);
    int = null;
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerRef.innerHTML = '00 h 00 m 00 s 000 ';
    btn = document.getElementById('startTimer')
    btn.innerText = "Start"
    btn.style.background = "#20b380";


});

function displayTimer(){
    milliseconds+=10;
    if ((milliseconds % 50) === 0){
        if (opacity <= 0 || opacity >= .85){
            fadeout = !fadeout;
        }
        opacity -= fadeout ? .0425 : -.0425;
        timerRef.style.boxShadow = `0 0 20px rgba(253, 84, 0,${opacity})`
        
    }
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

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}
