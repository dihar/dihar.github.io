
var SPEED=100;
var G=19.8/SPEED;
var KFS=0.96;
var KFB=0.55;
var CX=125;
var CY=175;
var KS=0.995;

 //инициализация клиентского окна
var WB;
var HB; 

var drawAll = new draw();


///////объекты элементов//////////
//объект шарика
function oneBlock(){
    
    this.x=50;
    this.y=100;
    this.dx=0;
    this.dy=0;
    this.width=50;
    this.height=50;
    this.obj=0;
    //опция шара
    this.param=1;
    var timer = 0;

  //проверка границ движения
    function bordCheck(x, y, dx, dy, width, height){
      if (x+dx<0) {
        if (x==0) {
          dx*=-KFB;
          dy*=KFS;
        }
        else { x=0;};
      };

      if (x+dx>WB-width) {
        if (x==WB-width) {
          dx*=-KFB;
          dy*=KFS;
        }
        else {x=WB-width;};
      };

      if (y+dy<0) {
        if (y==0) {
          dy*=-KFB;
          dx*=KFS;
        }
        else {y=0;};
      };
      if (y+dy>HB-height) {
        if (y==HB-height) {
          dy*=-KFB;
          dx*=KFS;
        }
        else { y=HB-height; };
      };
      var tempData={};
      tempData.x=x;
      tempData.y=y;
      tempData.dx=dx;
      tempData.dy=dy;
      return tempData;
    };



  //методы передвижения
  //гравитация снизу
    this.spanMove = function() {
      var temp = {};
      var x=this.x;
      var y=this.y;
      var dx=this.dx;
      var dy=this.dy;
      var width=this.width;
      var height=this.height;
      temp.x=x;
      temp.y=y;
      dy+=G;

      tempObj=bordCheck(x, y, dx, dy, width, height);
      x=tempObj.x;
      y=tempObj.y;
      dx=tempObj.dx;
      dy=tempObj.dy;
      
      temp.x==x ? x+=Math.round(dx) : temp.x=x ;
      temp.y==y ? y+=Math.round(dy) : temp.y=y ;

    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.draw();
  };



  //гравитация в точке
    this.spanMoveCenter = function() {
      var temp = {};
      var x=this.x;
      var y=this.y;
      var dx=this.dx;
      var dy=this.dy;
      var width=this.width;
      var height=this.height;
      temp.x=x;
      temp.y=y;
      
      tempObj=bordCheck(x, y, dx, dy, width, height);
      x=tempObj.x;
      y=tempObj.y;
      dx=tempObj.dx;
      dy=tempObj.dy;

      if (x>CX) {dx-=G;}
      else {dx+=G};
      if (y>CY) {dy-=G;}
      else {dy+=G};
      if ((x>=CX-5) & (x<=CX+5) & (Math.abs(dx)<SPEED*G/5) & (y>=CY-5) & (y<=CY+5) & (Math.abs(dy)<SPEED*G/5)) {
      dx=0;
      dy=0;
      x=CX;
      y=CY;
      };
      temp.x==x ? x+=Math.round(dx) : temp.x=x ;
      temp.y==y ? y+=Math.round(dy) : temp.y=y ;

    this.x=x;
    this.y=y;
    this.dx=dx*KS;
    this.dy=dy*KS;
    this.draw();
  };



  //смена положения блока
    this.draw = function(){
      this.obj.style.top=this.y+'px';
      this.obj.style.left=this.x+'px';
    };
    

  //включение таймера движения
    this.moveOn = function() {

      switch (this.param){
      case 1:
        timer=setInterval(function(){bl.spanMove();},Math.round(1000/SPEED));
        break;
      case 2: 
        timer=setInterval(function(){bl.spanMoveCenter();},Math.round(1000/SPEED));
        break;
      };
    };


    this.moveOff = function() {
      clearInterval(timer);
    };
    
};





var bl = new oneBlock;

var x=bl.x;
var y=bl.y;
var xt=0;
var yt=0;



//убрать скролл
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, false);






//объект отрисовки элементов
function draw() {

  //создание границ
  function createBorderAndParam(){

    borderBox = document.createElement('div');

    borderBox.style.cssText=resize().border;
    borderBox.style.width=WB+'px';
    borderBox.style.height=HB+'px';

    document.body.appendChild(borderBox);

  };


  //отрисовка границ
  var border = function(){

    borderBox.style.cssText=resize().border;
    borderBox.style.width=WB+'px';
    borderBox.style.height=HB+'px';


  };

  this.border = border;

  //метод рисования элемента
  var drawObj = function(obj, style){
    var elem = document.createElement('div');

  };


  //измененение размеров окна
  var resize = function(){
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    var style = {};

    style.bord='background: red; border: 2px solid black; position: relative;';

    style.param='background: gray; position: relative';

    if (ch-cw>60) {
      WB=cw*0.95;
      HB=WB;
      style.bord+='margin: 0 auto;';
      style.param+='margin: 0 auto;';
      return style;
    }
    else if (ch-cw>0){
      HB=ch-60+ch-cw;
      WB=HB;
      style.bord+='margin: 0 auto;';
      syle.param+='margin: 0 auto;';
      return style;
    }
    return style;

  };

  createBorderAndParam();

};


window.addEventListener('resize', function(event){


},false);

//далее события происходят после загрузки документа
window.addEventListener('load', function(event){
drawAll.border();

//шарик
var obj = document.getElementById('block1');

bl.obj=obj;

bl.draw();
//события с шаром
//касание одним пальцем
obj.addEventListener('touchstart', function(event){

if (event.targetTouches.length ==1) {

var touch = event.targetTouches[0];
xt=touch.pageX;
yt=touch.pageY;
bl.moveOff();
}
}, false);

//движение пальцем
obj.addEventListener('touchmove', function(event){ 

if (event.targetTouches.length ==1) {

var touch = event.targetTouches[0];
var dx=touch.pageX - xt;
var dy=touch.pageY - yt;
xt=touch.pageX;
yt=touch.pageY;
var x=bl.x;
var y=bl.y;

if ((x<= 250-dx)&(y<= 350-dy)&(x>=-dx)&(y>=-dy)){
x+=dx;
y+=dy;
};
bl.x=x;
bl.y=y;
bl.dx=dx*0.4;
bl.dy=dy*0.4;
bl.draw();

}
}, false);

//конец касания
obj.addEventListener('touchend', function(event){ 

bl.moveOn();


}, false);

//события чекбокса
var objCheck = document.getElementById('checkBlock');
//касание
objCheck.addEventListener('touchend', function(event){ 

//выбор параметра
var objCheckCirc = document.getElementById('checkCirc');
//гравитационная точка
objGravCenter = 
document.getElementById('gravCenter');

switch (bl.param){
case 1: 
  bl.param=2;
  objCheckCirc.style.left='30px';
  objGravCenter.style.display = 'block';
  break;

case 2: 
  bl.param=1;
  objCheckCirc.style.left='0px'
  objGravCenter.style.display = 'none';
  break;
};


bl.moveOff();
bl.moveOn();


},false);


}, false);
