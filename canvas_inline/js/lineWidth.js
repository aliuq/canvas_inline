// ——————线宽模块——————
this.canvas = new Canvas();
var lineWidthUl = document.getElementById("line_width");
var lineWidthLi = lineWidthUl.getElementsByTagName('li');

// 初始化线宽
lineDef('line_1px', 1);

lineWidthUl.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || window.event.srcElement;
    // 清空全部
    for( var i = 0; i < lineWidthLi.length; i++ ){
        lineWidthLi[i].style.background = "";
    }
    if(target.nodeName.toLowerCase() === 'li' || target.nodeName.toLowerCase() === 'img'){
        var lineWidth = target.className.substr(5, 1);
        lineDef(target.className, lineWidth);
    }
},false)
function lineDef(className, px){
    var oli = document.getElementsByClassName(className);
    this.canvas.cxt.lineWidth = px;
    oli[0].style.background = "yellow";
}