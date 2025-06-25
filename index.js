//timer
const timerElement=document.getElementById('timer')
let seconds=0;
function updateTimer() {
    //math.floor rounds numbers up
    let mins=Math.floor(seconds /60);
    //whatever remains after dividing 60 is the seconds
    let sec=seconds %60;

    //converting mins and sec into strings and adding the 0 for string less than  making them look mm:ss
    let timeString=
    minsString;
    if(mins<10){
        minsString = '0' +mins;
    }
    else {
        minsString='' + mins;
    }

    secString;
    if(sec<10) {
        secString= '0' + sec;
    }
    else{
        secString = '' +sec
    }
    timerElement.textContent=timeString; //shows time on page
}