//timer
const timerElement=document.getElementById('timer')
let seconds=0;
function updateTimer() {
    //math.floor rounds numbers up
    let mins=Math.floor(seconds /60);
    //whatever remains after dividing 60 is the seconds
    let sec=seconds %60;

    //converting mins and sec into strings and adding the 0 for string less than  making them look mm:ss
    let minsString;
    if(mins<10){
        minsString = '0' +mins;
    }
    else {
        minsString='' + mins;
    }

    let secString;
    if(sec<10) {
        secString= '0' + sec;
    }
    else{
        secString = '' +sec
    }
    let timeString=minsString+ ':' +secString;
    timerElement.textContent=timeString; //shows time on page
}
    //this function increments secs by 1
    function tick() {
        seconds=seconds+1;
        updateTimer()
    }

//start button
let timerInterval=null;
const startbtnElement=document.getElementById('startbtn');
startbtnElement.addEventListener('click',function (event){

    timerInterval=setInterval(tick, 1000);
    console.log('Timer start')
});
//Stop button

const stopbtnElement = document.getElementById('stopbtn');
stopbtnElement.addEventListener('click', (event) =>{
    //the if statement stops the timer

    if(timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    //reset timer
    // seconds=0;
    // updateTimer();

    console.log('stop');

});



