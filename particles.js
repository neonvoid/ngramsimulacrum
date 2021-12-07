class particles{
    constructor(x,y,symbol){
      this.x=x
      this.y=y
      this.symbol=symbol
      this.vx=random(-1,1)
      this.vy=random(-5,1)
      this.alpha=255
      
    }
    draw(){
      strokeWeight(random(3))
      noFill()
      switch(this.symbol){
           case 0:
                stroke(random(255),0,0,alpha)
                break
            case 1:
                stroke(0,0,random(255),alpha)
                break

        }
        ellipse(this.x,this.y,random(10))
    }
    update(){
        switch(this.symbol){
            case 0:
                this.x+=this.vy
                this.y+=this.vx
                 break
             case 1:
                this.x+=this.vx
                this.y+=this.vy
                 break
 
         }
      this.alpha-=10
    }
    
    isdead(){
      return this.alpha<0
      }
  }