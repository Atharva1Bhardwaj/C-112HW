prediction="";
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AaddGlI2L/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 );
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_e_n").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Best")
        {
         document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Amazing")
        {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Rock and Roll")
        {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
    }
}