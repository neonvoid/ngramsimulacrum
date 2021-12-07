// Declare a "SerialPort" object
let serial;
// fill in the name of your serial port here:
let portName = "COM7";
let selectedSymbol;

let varMode = "none";
let startTime
let points,points2,points3;
let hex;
let bounds;
let amt;
let multiplier=.25
let hexArray=[]
let hexPointArray=[]
let pentArray=[]
let pentPointArray=[]
let myFont;
function preload(){
  myFont=loadFont('/assets/obarne.otf')
}


function setup() {
  angleMode(DEGREES)
  createCanvas(800, 800);
  

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  serial.list();

  // Assuming our Arduino is connected, open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on("list", gotList);

  // When you some data from the serial port
  serial.on("data", gotData);

  points = myFont.textToPoints("As Above So Below",50,100,60, {
    sampleFactor:.3,
    simplifyThreshold:0
  })

  points2 = myFont.textToPoints("Raise your sword in",50,100,50, {
    sampleFactor:.3,
    simplifyThreshold:0
  })
  points3 = myFont.textToPoints("revenge",250,160,50, {
    sampleFactor:.3,
    simplifyThreshold:0
  })
  //bounds= myFont.textBounds("As Above So Below", 50,50,50)

  //for the symbol arrays
  //hexagram
  for(let i=0;i<359;i+=360/6){
    let radius=100
    let x=radius*cos(i)
    let y=radius*sin(i)
    hexArray.push(createVector(x,y))  
  }
  //pentagram
  for(let i=0;i<359;i+=360/5){
    let radius=100
    let x=radius*cos(i)
    let y=radius*sin(i)
    pentArray.push(createVector(x,y))
  }

}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  // read the incoming data
  let currentString = serial.readLine();

  // trim off trailing whitespace
  trim(currentString);

  // if the incoming string is empty, do no more
  if (!currentString) return;

  console.log(currentString);
  if(currentString=="hex"){
    startTime=millis()  
    selectedSymbol=0;
  }
  if(currentString=="pent"){
    startTime=millis()
    selectedSymbol=1;
  }



}


function draw() {
  background(0);

  if(selectedSymbol==0){
    console.log("you have selected the hexagram")
    beginShape()
    for(let i =0;i<points.length;i++){
      let p=points[i]
      amt=random(10)
      let nx=noise(p.x*multiplier)
      let offsetX=map(nx,0,1,amt,amt)
      let ny=noise(p.y*multiplier)
      let offsetY=map(ny,0,1,amt,amt)
      fill(random(0,255),random(0),random(0))
      vertex(p.x+offsetX, p.y+offsetY)
     // ellipse(p.x+locX, p.y+locY, random(4))
    }
    endShape()
    textFont(myFont)
    textSize(100)
    stroke(255)
    text("Hexagram",50,750)
    //strokeWeig90ht(2)
    for(let i=0;i<hexArray.length;i++){
      hexPointArray.push(new particles(hexArray[i].x,hexArray[i].y,0))
  }

  drawHexagram()

  for(let i=0;i<hexPointArray.length;i++){
    hexPointArray[i].draw()
    hexPointArray[i].update()
    if(hexPointArray[i].isdead()){
      hexPointArray.splice(i,1)
    }
  }
    


  }
  if(selectedSymbol==1){
    console.log("you have selected the pentagram")
    beginShape()
    for(let i =0;i<points2.length;i++){
      let p=points2[i]
      amt=random(5)
      let nx=noise(p.x*multiplier)
      let offsetX=map(nx,0,1,amt,amt)
      let ny=noise(p.y*multiplier)
      let offsetY=map(ny,0,1,amt,amt)
      fill(random(0),random(0),random(random(255)))
      vertex(p.x+offsetX, p.y+offsetY)
     // ellipse(p.x+locX, p.y+locY, random(4))
    }
    endShape()
    for(let i =0;i<points3.length;i++){
      let p=points3[i]
      amt=random(5)
      let nx=noise(p.x*multiplier)
      let offsetX=map(nx,0,1,amt,amt)
      let ny=noise(p.y*multiplier)
      let offsetY=map(ny,0,1,amt,amt)
      strokeWeight(2)
      fill(random(0),random(0),random(random(255)))
      //stroke(random(0),random(0),random(random(255)))
      vertex(p.x+offsetX, p.y+offsetY)
     // ellipse(p.x+locX, p.y+locY, random(4))
    }
    endShape()
    textFont(myFont)
    textSize(100)
    stroke(255)
    text("Pentagram",50,750)

    for(let i=0;i<pentArray.length;i++){
      pentPointArray.push(new particles(pentArray[i].x,pentArray[i].y,1))
  }

    drawPentagram()

    for(let i=0;i<pentPointArray.length;i++){
      pentPointArray[i].draw()
      pentPointArray[i].update()
      if(pentPointArray[i].isdead()){
        pentPointArray.splice(i,1)
      }
    }

  }

  
}

function drawHexagram(){
  let timeOffset=0

  let span=5000
  translate(width/2,height/2)
  strokeWeight(5)
  stroke(255)
  rotate(90)
  strokeWeight(2)
  scale(2)
  // line(hexArray[0].x,hexArray[0].y,hexArray[2].x,hexArray[2].y)
  // let point1=p5.Vector.lerp(hexArray[0])
  let point1= p5.Vector.lerp(hexArray[0],hexArray[2],constrain((millis()-startTime-timeOffset)/span,0,1))
  line(hexArray[0].x,hexArray[0].y,point1.x,point1.y)
  
  let point2= p5.Vector.lerp(hexArray[2],hexArray[5],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(hexArray[2].x,hexArray[2].y,point2.x,point2.y)

  let point3= p5.Vector.lerp(hexArray[5],hexArray[3],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(hexArray[5].x,hexArray[5].y,point3.x,point3.y)


  let point4= p5.Vector.lerp(hexArray[3],hexArray[1],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(hexArray[3].x,hexArray[3].y,point4.x,point4.y)

  
  let point5= p5.Vector.lerp(hexArray[1],hexArray[4],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(hexArray[1].x,hexArray[1].y,point5.x,point5.y)
  
  let point6= p5.Vector.lerp(hexArray[4],hexArray[0],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(hexArray[4].x,hexArray[4].y,point6.x,point6.y)
  
}

function drawPentagram(){
  stroke(255)
  translate(width/2,height/2+50)
  rotate(-17)
  strokeWeight(3)
  scale(2)
  let timeOffset=0
  let span=5000
    let point1= p5.Vector.lerp(pentArray[2],pentArray[4],constrain((millis()-startTime-timeOffset)/span,0,1))
  line(pentArray[2].x,pentArray[2].y,point1.x,point1.y)
  
  let point2= p5.Vector.lerp(pentArray[4],pentArray[1],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(pentArray[4].x,pentArray[4].y,point2.x,point2.y)

  let point3= p5.Vector.lerp(pentArray[1],pentArray[3],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(pentArray[1].x,pentArray[1].y,point3.x,point3.y)


  let point4= p5.Vector.lerp(pentArray[3],pentArray[0],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(pentArray[3].x,pentArray[3].y,point4.x,point4.y)

  
  let point5= p5.Vector.lerp(pentArray[0],pentArray[2],constrain((millis()-startTime-timeOffset)/span,0,1))
   line(pentArray[0].x,pentArray[0].y,point5.x,point5.y)
}