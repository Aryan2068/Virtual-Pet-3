class Food{
    constructor(){
         this.foodStock = 0;
         this.lastFed;
         this.image = loadImage("images/Milk.png");

    }
    
    
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }


    updateFoodStock(foodStock){
        this.foodStock = foodStock
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock-=1;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    bedroom(){
        background(bedroom_img, 550, 500);
    }

    garden(){
        background(garden_img, 550, 500);
    }

    washroom(){
        background(washroom_img, 550, 500);
    }

    display(){
        var x = 80, y = 250;
        
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
    
        if(this.foodStock != 0){
            for(var i = 0;i<this.foodStock;i++){
                if(i % 10 === 0){
                    x = 80;
                    y += 50;
                }
                image(this.image, x, y, 50, 50);
                x += 30;
            }
        }
    
    
    }

    
}