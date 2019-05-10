/**
 * Created by Administrator on 2017/9/13.
 */

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
function getStyle(el, property) {
    if (getComputedStyle) {
        return getComputedStyle(el)[property];
    } else {
        return el.currentStyle[property];
    }
}
var person = {}

function animate(el, properties, fn) {
    clearInterval(el.timerId);
    //console.log(el.timerId);

    el.timerId = setInterval(function () {
        var isAllDone = true;
        var current;
        for (var property in properties) {
            //console.log(property);                  //key
            //console.log(properties[property])       //target
            if (property === 'opacity') {
                current = Math.round(parseFloat(getStyle(el, 'opacity')) * 100);
            } else {
                current = parseInt(getStyle(el, property));
            }

            var target = properties[property];
            var speed = (target - current) / 30;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (speed !== 0) {
                isAllDone = false;
            }

            if (property === 'opacity') {
                el.style.opacity = (current + speed) / 100;
            } else {
                el.style[property] = current + speed + 'px';
            }

        }

        if (isAllDone) {
            clearInterval(el.timerId);
            if (typeof fn === 'function') {
                fn();
            }
        }
    }, 20)
}
