var status = "";
var objects = [];
var alarm = "";

function preload(){
    alarm = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("Model is loaded")
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, getResults);

        for(var i = 0; i<objects.length; i++){
            fill(255, 0, 0);
            textSize(15);
            textFont('Arial');
            strokeWeight(2);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 10, objects[i].y + 30);
            noFill();
            strokeWeight(5);
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == 'person'){
                document.getElementById("baby_status").innerHTML = "Detected"; 
                alarm.stop();
            } else{
                document.getElementById("baby_status").innerHTML = "Not detected";
                alarm.play();
            }
        }
        if(objects.length<0){
            document.getElementById("baby_status").innerHTML = "Not detected";
            alarm.play();
        }
    }
}

function getResults(error, results){
    if(error){
console.log(error);
    } else {
console.log(results);
objects = results;
    }
}
