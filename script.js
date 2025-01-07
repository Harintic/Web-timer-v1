


  let  timerId  ;
  let  saved_time_in_seconds  ;
  let is_timer_running = false ;
  let is_audio_enabled;

  let start_time_in_seconds;

  let updated_time ;
  audio = new Audio('sounds/ticking-clock_1-27477.mp3');  
  audio.loop = true; 


    let last_li;

let logs ;
  
////////////////////////////////////////////////////////////
  function on_load_function()
  {
      toggleElements('confirmation');

      
      let data = localStorage.getItem("lc_data");
    
      if  (data != null)
      {
        document.getElementById("list_container").innerHTML = data;
      }
      

      logs = localStorage.getItem("logs");

      if  (logs != null)
        {
          document.getElementById("cc2").innerHTML = logs;
        }


      saved_time_in_seconds =localStorage.getItem("time_left_in_seconds");

      if (saved_time_in_seconds == null)
        {
          saved_time_in_seconds = 0;
          localStorage.setItem("time_left_in_seconds",0)
        }

      console.log(saved_time_in_seconds)



      

      // store play audio
      is_audio_enabled =localStorage.getItem("audio_bool");
        
      if (is_audio_enabled == "true")
      {
        document.getElementById('audioCheckbox').checked = true;
        audio_toggle();
      }
        

    if (saved_time_in_seconds != undefined)
    {
        //convert seconds to string 
        updated_time = seconds_to_time_string(saved_time_in_seconds);

        document.getElementById('time').innerHTML = updated_time;
    }

      // var used to save the last appened li 
    last_li = localStorage.getItem("last_li")
    if (last_li == null)
    {
        last_li ="p" ;
    }
  }

  //////////////////////////////////////////////////////////
  
  function seconds_to_time_string(ts){
    var mm = Math.floor((ts % 3600) / 60);
    var hh = Math.floor(ts / 3600);
    var ss = ts % 60;
   
    updated_time = `${hh}:${mm}:${ss}`;
    return updated_time ;
  }


function  time_string_to_seconds (text) {

    let split_time = text.split(":");
    let split_time_int = []
   
    for (i=0 ;i<split_time.length;i++)
    {
        split_time_int[i] = parseInt(split_time[i])
    }
    split_time_int[0] = split_time_int[0] *60 * 60
    split_time_int[1] = split_time_int[1] *60
    ts = split_time_int[0] + split_time_int[1] + split_time_int[2]  // total seconds 

    return ts
}
///////////////////////////////////////////////////////////////////////////////


let time_passed;

function timer_process(){


     // saved_time_in_seconds 
    current_time = Math.floor(Date.now() / 1000);

    time_passed = current_time - start_time_in_seconds  ;

    console.log(time_passed);

    // saved_time_in_seconds = saved_time_in_seconds  - time_passed;


    if (saved_time_in_seconds <=0 )
    {
        saved_time_in_seconds = 0 ;
        clearInterval(timerId);

    }

    if (time_passed % 10 == 0 )
    {
        localStorage.setItem("time_left_in_seconds" , saved_time_in_seconds - time_passed);
        console.log("10 sec passed ")
    }


    //up date p tag 
    document.getElementById('time').innerHTML = seconds_to_time_string(saved_time_in_seconds - time_passed  ) ;
   
   }
   


///////////////////////////////////////////////////////////////////////////////////////////////////




document.getElementById("start-button").addEventListener('click',function(){
  
    
    start_time_in_seconds =  Math.floor(Date.now() / 1000);
    saved_time_in_seconds = localStorage.getItem("time_left_in_seconds")

    clearInterval(timerId);
    timerId = setInterval(timer_process, 1000);
    is_timer_running = true ;
    audio_toggle();
    logTImestart();

    // console.log(timerId)

})


document.getElementById("pause-button").addEventListener('click',function(){
    clearInterval(timerId);
    localStorage.setItem("time_left_in_seconds",saved_time_in_seconds - time_passed);
    saved_time_in_seconds = saved_time_in_seconds - time_passed;
    time_passed =0;
    is_timer_running = false;

    audio_toggle();
    logTimepause();
})



//////////////////////////////////////////
   
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
    
    document.getElementById('settings_box').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';

    heading = document.getElementById('main-heading').textContent;

    console.log(heading);


});




document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('settings_box').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
});




// handle all the save button in the srtiing box 
// add event listener to all the save button wih he same class 

// on click of any of the buttons wiuth this class , a function called haldleSave is called 
// the deets of the event is passed as arguement for that function 

var current_button_function =""   // var used to know which button is clicked 

document.querySelectorAll('.button-save-confirmation').forEach(button => {
    button.addEventListener('click', handleSave);
    
});

function handleSave(event){

    //deets of the button that was clicked 
    current_button_function =  event.target.getAttribute('data-custom-func_name');
    // display the confirmation dialogue box 
    toggleElements('confirmation');

}
    
//on click save
document.getElementById("confirm-ok").addEventListener('click',function(){

    // update the text
    //close the confirmation window
    toggleElements('confirmation')
    if (current_button_function == "save_time")
    // save the new timer 
        {
            var hh =document.getElementById("hour-input").value;
            var mm =document.getElementById("minute-input").value;
            var ss =document.getElementById("seconds-input").value;
    
            
            updated_string_timer = `${hh}:${mm}:${ss}`
            document.getElementById('time').innerHTML = updated_string_timer;

            localStorage.setItem("time_left_in_seconds",time_string_to_seconds(updated_string_timer))

        }
     if (current_button_function == "save_heading")
        {
            document.getElementById('main-heading').innerHTML = document.getElementById("heading-input").value;

        }
});


// sound 










// on click of the  cancel button 
document.getElementById("confirm-not_ok").addEventListener('click',function()
{
    toggleElements('confirmation')

});





document.getElementById("close-button-confirmation").addEventListener('click',
        function() {
            // toggleElements('confirmation');
            document.getElementById('settings_box').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        }
)







// play audio if checkbox is checked 

document.getElementById('audioCheckbox').addEventListener( "change" ,audio_toggle
);





function audio_toggle()
{

    checkbox_audio = document.getElementById('audioCheckbox');
    if (checkbox_audio.checked && is_timer_running) {
                localStorage.setItem("audio_bool",true);
                audio.play();
            } else {
                audio.pause();
                localStorage.setItem("audio_bool",false);
            }


}



// js for tabs 

//get all button 

var tabButtons= document.querySelectorAll(".tab-box .button-container button")
var tabPanels=document.querySelectorAll(".tab-box  .content-container");



function showPanel(panelIndex,colorCode) {

    tabButtons[panelIndex].style.backgroundColor=colorCode;


    tabPanels.forEach(function(node){
        node.style.display="none";
    });

    tabPanels[panelIndex].style.display="block";
    tabPanels[panelIndex].style.backgroundColor=colorCode;
}

showPanel(0,'#f5f5dc');



// js for to do list 

document.getElementById("add_button").addEventListener('click',function (){

    ul =  document.getElementById("to-dolist");
    x = document.getElementById("to-do-text").value;

    if(x !="")
    {

        
        let li = document.createElement("li");  // new li tag is created 
        
        // console.log(x)
        // console.log(li)

        li.appendChild(document.createTextNode(x)); // text to li tag is added 

       

        let closeButton = document.createElement("span");
        closeButton.textContent = "×";
        closeButton.style.marginLeft = "auto";
        closeButton.style.cursor = "pointer";
        closeButton.style.color = "red";
       
        li.style.display = "flex";
        li.style.alignItems = "center";
  
        li.appendChild(closeButton);
        // console.log("wtf")

        // console.log(ul)
        ul.appendChild(li);


        // saveTodolist();
        saveContainer("list_container","lc_data");
    }
    

})



//get the div with id 
list_container = document.getElementById("list_container")

// on click of any where in the div 
list_container.addEventListener("click" , function(e){

   // check if its the LI tag 
    if(e.target.tagName === "LI")
    {
		    // toggle the li tag 
        e.target.classList.toggle("checked");
        // saveTodolist();
        saveContainer("list_container","lc_data");
    }
    else if (e.target.tagName === "SPAN")
    {
        // e.target.classList.remove("")
        e.target.parentElement.remove();
        // saveTodolist();


        saveContainer("list_container","lc_data");
    }
 
},false);


// function to save the entire container 

// function saveTodolist(){

//   data =  document.getElementById("list_container").innerHTML;
//   localStorage.setItem("lc_data" , data)

// }



// function to save the entire container 

function saveContainer(list_name ,local_filename ){
    data =  document.getElementById(list_name).innerHTML;
    localStorage.setItem(local_filename , data)
  
  }




const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };



//function to append li
function  append_li( list_id , append_text )

{
    ul =  document.getElementById(list_id);
    let li = document.createElement("li");  // new li tag is created 
    li.appendChild(document.createTextNode(append_text));
    ul.appendChild(li);


}

//function to log time 

function logTImestart(){

    console.log(updated_time);
    
if (last_li =="p")
    {   

    localStorage.setItem("last_li" , "s")
    last_li ="s"    
    
    const formattedDateTime = now.toLocaleString('en-US', options);
    let s_time = ("TIMER STARTED:"+  formattedDateTime + "      "+ `[${seconds_to_time_string(saved_time_in_seconds)}]`);

    console.log(s_time);
    append_li("event_log",s_time);

    saveContainer("cc2","logs")
    
    }
        
}

function logTimepause(){

    if (last_li =="s")
        {   

            localStorage.setItem("last_li" , "p")
            last_li ="p"

            const formattedDateTime = now.toLocaleString('en-US', options);
            let p_time = ("TIMER PAUSED  :"+  formattedDateTime + "      "+ `[${seconds_to_time_string(saved_time_in_seconds)}]`     );

            let lastLi = document.querySelector('#event_log li:last-child').innerHTML;
            let extracted_time = lastLi.split("[")[1]?.split("]")[0] || null;
            let extracted_time_in_seconds = time_string_to_seconds(extracted_time)
            let difference = extracted_time_in_seconds - saved_time_in_seconds

            append_li("event_log",p_time );
            append_li("event_log",seconds_to_time_string(difference));

            logs = console.log(document.getElementById("cc2"))

            // save log container 
           saveContainer("cc2","logs")

            

        
      
        }


  

}



function removeFirstThree() {
    console.log("removed")
    const list = document.getElementById("event_log");
    for (let i = 0; i < 3; i++) {
      if (list.firstElementChild) {
        list.firstElementChild.remove(); // Remove the first child if it exists
      }
    }
  }