let width = 600,
height = 400,
G = 1;
var pendulo1 = new Pendulo();
var pendulo2 = new Pendulo();
var num1, num2, num3, num4, den, i;
var rastroX = [];
var rastroY = [];


function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('sketch-holder');
    canvas.position(x=(windowWidth - width) / 2);
    background(220);

    pendulo1.len = 90;
    pendulo1.x_origem = width/2;
    pendulo1.y_origem = height/2;
    pendulo1.ang = random(0, 2*PI);
    pendulo1.m = 2;
    pendulo1.angAcc = 0;
    pendulo1.angVel = 0;
    pendulo1.x = pendulo1.x_origem + pendulo1.len * sin(pendulo1.ang);
    pendulo1.y = pendulo1.y_origem + pendulo1.len * cos(pendulo1.ang);

    pendulo2.len = 90;
    pendulo2.x_origem = pendulo1.x;
    pendulo2.y_origem = pendulo1.y;
    pendulo2.ang = random(0, 2*PI);
    pendulo2.m = 2;
    pendulo2.angAcc =0;
    pendulo1.angVel = 0;
    pendulo2.x = pendulo2.x_origem + pendulo2.len * sin(pendulo2.ang);
    pendulo2.y = pendulo2.y_origem + pendulo2.len * cos(pendulo2.ang);

    fill(0,0,255);
    stroke(0);
    line(pendulo1.x_origem, pendulo1.y_origem,pendulo1.x, pendulo1.y, 20);
    circle(pendulo1.x, pendulo1.y, 20);
    line(pendulo2.x_origem, pendulo2.y_origem,pendulo2.x, pendulo2.y, 20);
    circle(pendulo2.x, pendulo2.y, 20);
}


function draw() {
    background(220);
    fill(100, 100, 255);
    noStroke();
    for (let i = 0; i < rastroY.length; i++) {
        fill(0,0,255, i*255/rastroY.length);
        circle(rastroX[i], rastroY[i], 5);
    }

    fill(0,0,255);
    stroke(0);
    strokeWeight(2);
    line(pendulo1.x_origem, pendulo1.y_origem,pendulo1.x, pendulo1.y, 20);
    line(pendulo2.x_origem, pendulo2.y_origem,pendulo2.x, pendulo2.y, 20);
    circle(pendulo1.x, pendulo1.y, 15);
    circle(pendulo2.x, pendulo2.y, 15);
    Update();

    rastroX.push(pendulo2.x);
    rastroY.push(pendulo2.y);

    if(rastroX.length > 500) {
        rastroX.splice(0, 1);
        rastroY.splice(0, 1);        
    }


}


function Pendulo() {
    this.ang = 0;
    this.angVel = 0;
    this.angAcc = 0;
    this.x = 0;
    this.y = 0;
    this.x_origem = 0;
    this.y_origem = 0;
    this.m = 0;
    this.len = 0;
}

function Update() {

    pendulo1.angVel += pendulo1.angAcc;
    pendulo2.angVel += pendulo2.angAcc;

    pendulo1.ang += pendulo1.angVel;
    pendulo2.ang += pendulo2.angVel;

    num1 = -G * (2 * pendulo1.m + pendulo2.m) * sin(pendulo1.ang);
    num2 = -pendulo2.m * G * sin(pendulo1.ang - 2 * pendulo2.ang);
    num3 = -2 * sin(pendulo1.ang - pendulo2.ang) * pendulo2.m;
    num4 = pendulo2.angVel * pendulo2.angVel * pendulo2.len + pendulo1.angVel * pendulo1.angVel * pendulo1.len * cos(pendulo1.ang-pendulo2.ang);
    den = pendulo1.len * (2 * pendulo1.m + pendulo2.m - pendulo2.m * cos(2 * pendulo1.ang - 2 * pendulo2.ang));
    pendulo1.angAcc = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(pendulo1.ang-pendulo2.ang);
    num2 = pendulo1.angVel * pendulo1.angVel * pendulo1.len * (pendulo1.m + pendulo2.m);
    num3 = G * (pendulo1.m + pendulo2.m) * cos(pendulo1.ang);
    num4 = pendulo2.angVel * pendulo2.angVel * pendulo2.len * pendulo2.m * cos(pendulo1.ang - pendulo2.ang);
    den = pendulo2.len * (2 * pendulo1.m + pendulo2.m - pendulo2.m * cos(2 * pendulo1.ang - 2 * pendulo2.ang));
    pendulo2.angAcc = (num1 * (num2 + num3 + num4)) / den;

    pendulo1.x = pendulo1.x_origem + pendulo1.len * sin(pendulo1.ang);
    pendulo1.y = pendulo1.y_origem + pendulo1.len * cos(pendulo1.ang);
    pendulo2.x_origem = pendulo1.x;
    pendulo2.y_origem = pendulo1.y;
    pendulo2.x = pendulo2.x_origem + pendulo2.len * sin(pendulo2.ang);
    pendulo2.y = pendulo2.y_origem + pendulo2.len * cos(pendulo2.ang);
}

