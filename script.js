var screens = document.getElementsByClassName("screen")//массив слайдов
var lastY = window.pageYOffset;//Получаем первоначальное положение экрана пи загрузке
var sausages = document.getElementById("sausages");
var shield = document.getElementById("shield");

var currentScreen = 0;//збрасываем положение экрана;
document.body.scrollTop = document.documentElement.scrollTop = 0;
document.getElementById("first_mr").style.fill = "#f78b1f";
window.onload = function() {
 setTimeout (function () {
  scrollTo(0,0);
 }, 100);
}



document.body.scrollTop = document.documentElement.scrollTop = 0;
var pos = [3]
for(var i = 0; i < screens.length; i++)
{
    pos[i] = screens[i].scrollTop + screens[i].getBoundingClientRect().top;    
}

//добавляем обработчик начала касания
document.body.addEventListener("touchstart", handleStart, false);

//добавляем обработчик конца касания
document.body.addEventListener("touchend", handleEnd, false);

document.body.addEventListener("scroll", paralaxScreen2);

sausages.addEventListener("touchstart", dragStart, false);
sausages.addEventListener("touchend", dragEnd, false);
sausages.addEventListener("touchmove", drag, false);

var active = false;
var currX;
var initX;
var xOffset = 0;
var subscreens = document.getElementsByClassName("subscreen");

 function dragStart(e) {
      if (e.type === "touchstart") {
          console.log("initX = " + e.touches[0].clientX + " + " + shield.offsetLeft);
        initX = e.touches[0].clientX - (shield.offsetLeft - 143);
        console.log(initX);
      } 
      if (e.target === shield) {
        active = true;
      }
    }


function drag(e) {
        if(shield.offsetLeft >= 143 & shield.offsetLeft <= 863)
            {
                if (active) {
                    e.preventDefault();
                    if (e.type === "touchmove") {
                    currX = e.touches[0].clientX - initX;
                    currX;
                    }
                setMarg(currX, shield);
      }
    }
    }

    function setMarg(xPos, el) {
        el.style.marginLeft = xPos + "px";
        console.log("shield move to " +xPos + "px")
    }

function dragEnd(e) {

    if (shield.offsetLeft <= 321)
        {
            shield.style.marginLeft = "0px";
            subscreens[0].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
            
        }
    else 
        if (shield.offsetLeft > 321 & shield.offsetLeft < 677)
            {
                shield.style.marginLeft = "360px";
                subscreens[1].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                
            }
        else if (shield.offsetLeft >= 677)
            {
                shield.style.marginLeft = "720px";
                subscreens[2].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
            }
        active = false;
    }



function handleStart (){
    lastY = window.pageYOffset;
    console.log("Нажал");
    if (currentScreen == 0 & window.pageYOffset == 0)
        {
            document.getElementById("light").style.opacity = 0;
            document.getElementById("lets_scroll").style.opacity = 0;
        }
}

function handleEnd (){
    currentY = window.pageYOffset;// положение экрана в момент конца касания
    if (lastY != currentY){ //проверка на наличие движения в принципе. Необходимо на случай касания пальца без продвижения
        var screenIsMove = true; //флаг начала движения экрана
        
        var difference =  lastY - currentY;
        console.log("Отпустил. Разница:" + difference);
        
        var whereToMove = 0; //определяет направление движения
        
        if (lastY < currentY) {whereToMove = 1;}//движемся вверх  
        else {whereToMove = -1}//движемся вниз
        console.log("whereToMove = " + whereToMove);
        try{
                screens[currentScreen + whereToMove].scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                setTimeout(checkEndOfScroll,500,whereToMove);
        }
        catch (e){
            console.log("Ошибка при выборе слайда" + e)
    }
        }
    else{
        if (currentScreen == 0)
        {
            setTimeout (function () {
                document.getElementById("light").style.opacity = 1;               document.getElementById("lets_scroll").style.opacity = 1;
            }, 300);
            
        }
    }
}

function paralaxScreen2(){
    console.log("paralaxScreen2 is enabled")
    var subscreen = document.getElementById("screen2Sub");
    if(window.pageYOffset > 0 & window.pageYOffset < document.getElementById("screen2").offsetHeight)
        {
            subscreen.style.marginTop = subscreen.style.marginTop - window.pageYOffset;
        }
}

function checkEndOfScroll(wtm){
    console.log("page = " + window.pageYOffset);
    console.log("pos = " + pos[currentScreen + wtm]);
    if (window.pageYOffset == pos[currentScreen + wtm]){
        slideControllerSwitcher(currentScreen, wtm);
        currentScreen = currentScreen + wtm;
        }


    if (currentScreen == 0)
    {
        document.getElementById("light").style.opacity = 1;
        document.getElementById("lets_scroll").style.opacity = 1;
    }
    console.log("fun checkEndOfScroll complete");
    console.log("currentScreen = " + currentScreen);
}

function slideControllerSwitcher (cs,wtm){
    var markers = document.getElementsByClassName("circle_marker");
    console.log("scwitch marker" + cs + " to white");
    var sum = cs + wtm;
    console.log("scwitch marker" + sum + " to orange");
    markers[cs].style.fill = "#ffffff";
    markers[sum].style.fill = "#f78b1f";
} 

    
function searchActiveScreen(){
        var goal = window.pageYOffset;
        var closest = pos.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
        });
        for(var i = 0; i < pos.length; i++)
            {
                if (pos[i] == closest){return i}
            }
}

var svgNS = "http://www.w3.org/2000/svg";  
var svgContainers = document.getElementsByClassName("svgCircleContainer");
var circles = [];
var circlesCount = 0;

setInterval(circleGenerator,1000);

function circleGenerator(){
    
    for (let j = 0; j < svgContainers.length ; j++)
        {
            circles.push(document.createElementNS(svgNS,"circle"));
            circles[circlesCount].setAttributeNS(null,"class","shape");
            circles[circlesCount].setAttributeNS(null,"id","shape"+circlesCount);
            circles[circlesCount].setAttributeNS(null,"cx","100%");
            circles[circlesCount].setAttributeNS(null,"cy","100%");
            circles[circlesCount].setAttributeNS(null,"r","5%");
            circles[circlesCount].setAttributeNS(null,"fill","#e7821e");
            circles[circlesCount].setAttributeNS(null,"stroke","#f78b1f");
    

            svgContainers[j].appendChild(circles[circlesCount]);
    
            setTimeout(circleAnimate,100,circles[circlesCount]);
            circlesCount++;
        }
}


function circleAnimate(el){
    el.style.r = "50%";
    el.style.fillOpacity = "0";
    setTimeout(circleDeleter,1520,el);
} 

function circleDeleter(el){
    el.parentNode.removeChild(el);
    console.log("circle delete");
}











