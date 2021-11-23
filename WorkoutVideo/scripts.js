var video= document.querySelector('.video');
var play= document.getElementById('play-pause');
var next = document.getElementById('next-video')
var restart = document.getElementById('restart-video')
var back = document.getElementById('back')
// var head = document.getElementById('time');
var done = document.getElementById('done');
var desc = document.getElementById('description');
var counter = 0;
var videos = ["./Videos/Exercise1.mp4","10.mp4","./Videos/Exercise2.mp4","10.mp4","./Videos/Exercise3.mp4","10.mp4","./Videos/Exercise4.mp4","10.mp4","./Videos/Exercise5.mp4","10.mp4","./Videos/Exercise6.mp4","10.mp4"];
var counter_change =[0,-1,1,-1,0,-1,1,-1,0,-1,0,-1];
// var counter_change_next =[2,1,2,1,2,1,2,1,2,1,2,1];
var duration = [-1, -1, 45,-1, -1, -1, 45,-1,-1,-1,-1,-1];
var description = [
    "(1/6) W Raises x 5 reps (lower abs)",
    "Rest",
    "(2/6) Black Widow Knee Slides x 45 seconds (bottom up rotation)",
    "Rest",
    "(3/6) Butterfly Sit-ups x 10 reps (midrange)",
    "Rest",
    "(4/6) Seated Corkscrews x 45 seconds (obliques)",
    "Rest",
    "(5/6) Levitation Crunches x 10 reps (upper abs)",
    "Rest",
    "(6/6) Sit-Up Elbow Thrusts x 5 reps each side (top down rotation)",
    "Rest"
]



playVideo();
togglePlayPause();
function togglePlayPause(){
    if(video.paused){
        video.play();
        paused = false;
    }else{
        video.pause();
        paused = true;
    }
}

function playVideo(){
    if(counter >= 0 && counter <videos.length){
        desc.innerText = description[counter];
        video.src = videos[counter];
        video.load();
        video.play();
        const time = duration[counter];
        if(time > 0){
            TIME_LIMIT = time;
            paused = false;
            resetTimer();
            document.getElementById('app').style.display = "flex";
        }else{
            paused = true;
            document.getElementById('app').style.display = "none";
        }
        
    }else{
        if(counter >= videos.length){
            counter = videos.length-1;
        }
        alert('out of bounds')
    }
}
function nextExercise(){
    if(counter <videos.length-1){
        for(var i = counter+1; i < videos.length; i++){
            if(counter_change[i]>=0){
                counter=i;
                playVideo();
                break;
            }
        }
        
    }
}
function nextVideo(){
    if(counter<videos.length-1){
        counter+=1;
        playVideo();
    } 
}
video.onended = function(){
    if(duration[counter]<0){
        if(counter_change[counter] == 1){
            nextVideo();
        }else if(counter_change[counter] == -1){
            previousVideo();
        }else{
            video.currentTime = 0;
            video.play();
            
        }
    }else{
        video.currentTime = 0;
        video.play();
    }
    
}
done.onclick = function(){
    nextVideo();
}

play.onclick = function() {
    togglePlayPause();
};
restart.onclick = function(){
    video.currentTime = 0;
};
next.onclick = function(){
    nextExercise();
    video.play();
}
previousVideo = function(){
    if(counter > 0){

        for(var i = counter-1; i >=0; i--){
            if(counter_change[i]>=0){
                counter=i;
                playVideo();
                video.play();
                break;
            }
        }
    }
}
back.onclick = function(){
    previousVideo();
}




// setInterval(function() {
//     updateTimer();
// }, 50);
    