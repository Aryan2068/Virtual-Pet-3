var dog, happy_dog, sad_dog,  database, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

var changeState, readState;

var bedroom_img, garden_img, washroom_img;

function preload()
{
  sad_dog = loadImage("images/Dog.png");
  happy_dog = loadImage("images/happy dog.png");

  bedroom_img = loadImage("images/Bed Room.png");
  garden_img = loadImage("images/Garden.png");
  washroom_img = loadImage("images/Wash Room.png");

}

function setup() {
  database = firebase.database();

  gameState = database.ref('gameState');
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 300, 150, 150);
  dog.addImage(sad_dog);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });
}


function draw() {  
  background(1,129, 64);
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);

  if(lastFed >= 12){
    text("Last Feed :" + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last Feed : 12 AM", 350, 30);
  }
  else{
    text("Last Feed :" + lastFed + "AM", 350, 30);
  }

  if(gameState !== "Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show()
    addFood.show();
    dog.addImage(sad_dog);
  }

  currentTime = hour();
  if(currentTime === (lastFed + 1)){
    update("Playing");
    foodObj.garden();
  }
  else if(currentTime === (lastFed + 2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currentTime === (lastFed + 3)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  drawSprites();
  
}
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happy_dog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  }

  )  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}