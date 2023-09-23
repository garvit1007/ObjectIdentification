img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture();
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded );
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotresult);

}

function draw() {
    image(video, 0, 0, 380, 380);
    if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresult);

        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Staus: Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of objects detected are: " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
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