img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded );
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotresult);

}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != "") {
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Staus: Object Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotresult(error, results) {
    if(error) {
        console.error(error);
    }

    console.log(results);
    objects = results;
}