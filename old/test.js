

function timer_process(){

  //get current text 
  time_text = document.getElementById('time').innerHTML;
 
  // convert to seconds 
  total_seconds = time_string_to_seconds(time_text)
 
  // decrement value 
 
  total_seconds = total_seconds -1 
  localStorage.setItem("time_left_in_seconds",total_seconds)
 
  //convert to text 
  if (total_seconds <= 0){
      total_seconds=0
      clearInterval(timerId);
  }

  updated_time = seconds_to_time_string(total_seconds)
 

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




document.getElementById("start-button").addEventListener('click',function(){
    // console.log("toer started")

    
    clearInterval(timerId);
    timerId = setInterval(timer_process, 1000);
    is_timer_running = true ;
    audio_toggle();
    logTImestart();

    // console.log(timerId)



})









//////////

let dec_val ;
function timer_process(){

    // start_time_in_seconds =  start_time_in_seconds - Math.floor(Date.now() / 1000);

    // decrement value 
    dec_val  = Math.floor(Date.now() / 1000 - start_time_in_seconds) ;

    // localStorage.setItem("time_left_in_seconds",total_seconds)
   
    console.log(dec_val)

    if (dec_val % 10 == 0 )
        {
            console.log("60 sec gone")
            localStorage.setItem("time_left_in_seconds",saved_time_in_seconds - dec_val)
 
        }
    //get current text 
    time_text = document.getElementById('time').innerHTML;
    // convert to seconds 
    total_seconds_left = time_string_to_seconds(time_text)
    updated_time = seconds_to_time_string(saved_time_in_seconds - dec_val)
    //up date p tag 
    document.getElementById('time').innerHTML = updated_time;

    if (total_seconds_left <= 0){
        start_time_in_seconds=0;
        clearInterval(timerId);
    }
   
   }