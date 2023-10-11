car = null
timer = null
danger =  null

function init(){
    car = document.getElementById('b1');
    car.style.position='relative';
    car.style.left='2px';
    car.style.top='2px';
}

function move(){
    car.style.left = parseInt(car.style.left)+2+"px";
    timer = setTimeout(move,10);
    if(parseInt(car.style.left)>='1000'){
        clearTimeout(timer)
        danger = document.getElementById('b3');
        document.getElementById('b3').innerHTML='Danger';
    }
}


function stop(){
    clearTimeout(timer)
}

function reset(){
    car.style.left='2px';
    danger.style.background = 'none';
    document.getElementById('b3').innerHTML='';
}
