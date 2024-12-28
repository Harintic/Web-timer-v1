
var timer ;  // value null by default 
var seconds = 0 


function  startTimer() 
{
    console.log("timer started")
    if (timer == null)
    {
        timer = setInterval(updateTime, 1000); // setInteraval will run a function once every give ms 1000 in this case 
    }
} 



function secondsToTime(sec)
{
    seconds = sec%60
    minutes = (Math.floor(sec/60)) % 60
    hours =    Math.floor( (Math.floor(sec/60))/60)      
    // console.log("SEC : " + seconds )
    // console.log("MIN : " + minutes )
    // console.log("HRS : " + hours )
    string = `${hours}:${minutes}:${seconds}`;
    // console.log(string)
    return string;

}


// function to change the text in a html document 


function updateTime(){
    seconds ++;
    document.getElementById('time').textContent = secondsToTime(seconds);
}



// function to stop timer 
function stopTimer()
{
    clearInterval(timer);
    timer = null;
}
// function to reset timer 

function resetTimer(){
    clearInterval(timer);
    seconds = 0;
    timer = null;
    document.getElementById('time').textContent = secondsToTime(seconds);

}



// sleep function 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// function showsettings()
// {
//     // div to unhide 
//     var settings_menu = document.getElementsyClassName("settings_window")[0];

//     settings_menu.style.display ="block";

//     var modal = document.getElementById("myModal");


// }




settings_menu = document.getElementsByClassName("settings_window")[0];

function togglesettings()
{
    // div to unhide settings_window

    // settings_menu = document.getElementById("settings_window_id");
    
    // settings_menu.style.display ="block";
    
    
    if  (settings_menu.style.display == "")
    {
        settings_menu.style.display ="block";
    }
    else
    {
        settings_menu.style.display ="";
    }

    console.log(settings_menu.style.display )

    // var modal = document.getElementById("myModal");


}

// settings_window_id.onclick = function(){
//     settings_menu.style.display = "none";
// }


window.onclick = function(event) {
    if (event.target == settings_menu) {
        settings_menu.style.display = "none";
    }
}


// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }