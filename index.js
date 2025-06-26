const BASE_URL='https://basketball-app-server-hirq.onrender.com/workouts'

let grindsList= [
    {
        grindName : "FREE THROWS",
        currentValue: 0
    },
    {
        grindName: "LAYUPS",
        currentValue: 0
    },
    {
        grindName: "3 POINT SHOOT OUT",
        currentValue: 0
    }
]

    const grindsListContainer = document.getElementById('grinds')


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
        minsString = mins;
    }

    let secString;
    if(sec<10) {
        secString= '0' + sec;
    }
    else{
        secString = sec;
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

    if(timerInterval) {// stops timer from counting
        clearInterval(timerInterval);
    }
    console.log('stop');

});


    //rest btn
    const resetbtnElement = document.getElementById('resetbtn');
    resetbtnElement.addEventListener('click', (event)=>{
            //reset the entire thing
            seconds=0
            updateTimer()
        
        console.log('rudisha 0')
    })


//exercise counter
//free throw counter.
    let freeThrows = 0;
        const freeThrowMakes= document.getElementById('freeThrowMakes')
    const freeThrowAdd = document.getElementById('freethrow-add');
    freeThrowAdd.addEventListener('click', (event)=>{
        freeThrows = freeThrows+1
        //this grabs the counter number by id and allows us to change its content as we press button.
        freeThrowMakes.textContent=freeThrows;
    })
 //minus button


    const freeThrowMinus=document.getElementById('freethrow-minus');
        freeThrowMinus.addEventListener('click' ,function(event){
            freeThrows= freeThrows-1;
            if(freeThrows < 0){// sets free throw back to 0 if less than 0
                freeThrows=0;
            }
                freeThrowMakes.textContent=freeThrows;
        })

    //layups counter
    //add button
    let layUps=0;
    const cleanLayUp=document.querySelector('#crispLays');
    const jellyLays=document.getElementById('layups-add');
    jellyLays.addEventListener('click', (event) =>{
        layUps=layUps+1;
        cleanLayUp.textContent=layUps;
    });

    //minus layup button
    const noJellys=document.getElementById('layups-minus');
    noJellys.addEventListener('click', function(event){
        layUps=layUps-1;
        if(layUps<0){
            layUps=0
        }
        cleanLayUp.textContent=layUps;
    });


    //3 point shoot-out
    //add button
    let threePoint=0;
    const splashNet=document.getElementById('swish');
    const splashAdd=document.getElementById('3point-add');
    splashAdd.addEventListener('click', (event) => {
        threePoint=threePoint+1;
        splashNet.textContent=threePoint;
        console.log('zidisha')
    });

    //3point minus button
    const airBall=document.getElementById('3point-minus');
    airBall.addEventListener('click', (event) => {
        threePoint = threePoint-1;
        if(threePoint < 0) {
            threePoint = 0
        }
        splashNet.textContent = threePoint;
        console.log('amerusha kidi')
    })
    

    //workout history  and finish button
    const historyListElement=document.getElementById('history-list');
    const finishButton=document.getElementById('youmadeit-btn');

    finishButton.addEventListener('click', (event) => {//this function collects data of all three activities
        let workSummary= "Free Throws:"  + freeThrows +  " | Jellys:" + layUps +  " | Splash:" +threePoint + " | Date:" + new Date().toLocaleDateString();//summary string

    //creating a new <li> 
    let newElement= document.createElement('li');
    newElement.className= "font-bold"
    newElement.textContent = workSummary;// updating the elements content into summary 

    //adding element to the history list
    historyListElement.appendChild(newElement);


//creating an object with data for server 
    let workout = {
        freeThrows: freeThrows,
        layUps:layUps,
        threePoint: threePoint, 
        time: new  Date().toLocaleDateString()
    };
//'POST'
    fetch(BASE_URL,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "applicatio/json",
        },
        body: JSON.stringify(workout)
        
    }) 
    .then(response => response.json()) //two thens are promises the first one converts returnes data into JS
        .then(response =>{
            // console.log('nimepata')
            return response
        })
        .catch (alert => { //prevents javascrip from failing slowly and gives and error that comes from this method.
            console.log('Anguka Nayo!')
        })
    
    });

    fetch(BASE_URL)
    .then(response => response.json())
    .then(data =>{
        data.forEach(workout => {
            let workSummary= "Free Throws:"  + workout.freeThrows +  " | Jellys:" + workout.layUps +  " | Splash:" +workout.threePoint + " | Date:" + workout.time;
            let newElement= document.createElement('li');
            newElement.className= "font-bold"
            newElement.textContent = workSummary
            historyListElement.appendChild(newElement);
        })
    })
