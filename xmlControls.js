function init(){
    initMq($("mq"));
    $("mq").start();
}
   
function initMq(obj){
    var objs;
    //定义跑马灯对象的自定义属性
    obj.currentItem = -1;
    obj.loopDelay = 50;
    obj.loopItems = new Array();
    obj.loopTimer = null;
    obj.speedX = 2;
    obj.speedY = 2;
    //定义跑马灯对象的自定义方法
    obj.loop = mq_loop;
    obj.start = mq_startLoop;
    obj.stop = mq_stopLoop;
    //定义跑马灯对象的事件
    obj.onmouseover = function(){ this.stop(); }
    obj.onmouseout = function(){ this.loop(); }
      
    //获取跑马灯对象的所有子元素
    objs = obj.getElementsByTagName("div");
    for(var i=0; i<objs.length; i++){
        //在loopItems属性中记录子元素
        obj.loopItems.push(objs[i]);
        //自定义子元素的属性和方法
        objs[i].index = i;
        objs[i].move = move;
        objs[i].reset = mq_reset;
        //初始化子元素的状态
        objs[i].reset();
    }
}
   
function move(x, y){
    this.style.left = x + "px";
    this.style.top = 0 + "px";
}
   
function mq_loop(){
    var obj;
    clearTimeout(this.loopTimer);
    if(this.currentItem >= this.loopItems.length)this.currentItem = 0;
    obj = this.loopItems[this.currentItem];
    // if(obj.offsetLeft!=this.offsetLeft){
    //     //向左卷动
    //     obj.move(obj.offsetLeft - this.speedX, obj.offsetTop);
    // }else if(obj.offsetTop + obj.offsetHeight > this.offsetTop){
    //     //向上卷动
    //     obj.move(obj.offsetLeft, obj.offsetTop - this.speedX);
    // }else{
    //     //重置该子元素
    //     obj.reset();
    //     this.currentItem++;
    // }
    if(obj.offsetLeft != 1){
        //向左卷动
        obj.move(obj.offsetLeft - this.speedX, obj.offsetTop);
    }else{
        // 重置该子元素
        obj.reset();
        this.currentItem++;
    }
    this.loopTimer = setTimeout("$(\""+this.id+"\").loop();", this.loopDelay);
}
   
function mq_reset(){
    var p = this.parentNode;
    this.move(p.offsetLeft + p.offsetWidth, p.offsetTop);
}
   
function mq_startLoop(){
    for(var i=0; i<this.loopItems.length; i++)this.loopItems[i].reset();
    this.currentItem = 0;
    this.loop();
}
   
function mq_stopLoop(){
    clearTimeout(this.loopTimer);
}
   
function $(str){ return(document.getElementById(str)); }
window.onload = init;