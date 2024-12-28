


  let  timerId  ;
  let  saved_time_in_seconds  ;


  function on_load_function()
  {
      toggleElements('confirmation');

      saved_time_in_seconds =localStorage.getItem("time_left_in_seconds")
      
      console.log(saved_time_in_seconds)

    if (saved_time_in_seconds != undefined)
    {
        console.log(saved_time_in_seconds)
        //convert seconds to string 
        updated_time = seconds_to_time_string(saved_time_in_seconds);

        console.log(updated_time)
       document.getElementById('time').innerHTML = updated_time;
        
    }

  }
  
  function seconds_to_time_string(ts){
    var mm = Math.floor((ts % 3600) / 60);
    var hh = Math.floor(ts / 3600);
    var ss = ts % 60;
   
    updated_time = `${hh}:${mm}:${ss}`;
    return updated_time ;
  }


  function timer_process(){

    //get current text 
    time_text = document.getElementById('time').innerHTML;
   
   
    // convert to seconds 
   
    split_time = time_text.split(":");
    split_time_int = []
   
    for (i=0 ;i<split_time.length;i++)
    {
        split_time_int[i] = parseInt(split_time[i])
    }
    split_time_int[0] = split_time_int[0] *60 * 60
    split_time_int[1] = split_time_int[1] *60
    total_seconds = split_time_int[0] + split_time_int[1] + split_time_int[2]
   
    // decrement value 
   
    total_seconds = total_seconds -1 
    localStorage.setItem("time_left_in_seconds",total_seconds)
   
    //convert to text 
    if (total_seconds <= 0){
        total_seconds=0
        clearInterval(timerId);
    }

    updated_time = seconds_to_time_string(total_seconds)
   
    // var mm = Math.floor((total_seconds % 3600) / 60);
    // var hh = Math.floor(total_seconds / 3600);
    // var ss = total_seconds % 60;
   
    // updated_time = `${hh}:${mm}:${ss}`;
   
    //up date p tag 
    document.getElementById('time').innerHTML = updated_time;
   
   }
   
function toggleElements(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        if(element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
}









document.getElementById('close-button').addEventListener('click', function() {
    // console.log("ffuuu")
    // time_text = document.getElementById('time').innerHTML;
   
    // timer_array = time_text.split(":");

    // document.getElementById("hour-input").value=timer_array[0];
    // document.getElementById("minute-input").value=timer_array[1];
    // document.getElementById("seconds-input").value=timer_array[2];

    document.getElementById('settings_box').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';


});




document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('settings_box').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});






// on click of the save button 

document.getElementById('save-button').addEventListener('click', function() 
{
    // current_actual_time = document.getElementById('time').innerHTML;

    toggleElements('confirmation');

});


// on click of the  cancel button 
document.getElementById("confirm-not_ok").addEventListener('click',function()
{
    toggleElements('confirmation')

});


//on click save
document.getElementById("confirm-ok").addEventListener('click',function(){

    // update the text
    //close the confirmation window

    toggleElements('confirmation')

    // save the new timer 
    var hh =document.getElementById("hour-input").value;
    var mm =document.getElementById("minute-input").value;
    var ss =document.getElementById("seconds-input").value;

    
    updated_string_timer = `${hh}:${mm}:${ss}`
    document.getElementById('time').innerHTML = updated_string_timer;

});



document.getElementById("close-button-confirmation").addEventListener('click',
        function() {
            // toggleElements('confirmation');
            document.getElementById('settings_box').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
)




document.getElementById("start-button").addEventListener('click',function(){
    // console.log("toer started")

  
    clearInterval(timerId);
    timerId = setInterval(timer_process, 1000);
    // console.log(timerId)



})


document.getElementById("pause-button").addEventListener('click',function(){
    clearInterval(timerId);
    console.log("timer stopped")
})
