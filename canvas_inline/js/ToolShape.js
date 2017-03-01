//——————工具模块——————
// ——————形状模块——————
this.canvas = new Canvas();
this.Func = new Func();
var toolUl = document.getElementById('tool_ul');
var toolLi = toolUl.getElementsByTagName('li');
var shapeUl = document.getElementById('shape_ul');
var shapeLi = shapeUl.getElementsByTagName('li');

// 初始化
toolShapeDef(toolLi[0].className);
this.Func.drawBrush();
var that = this;

toolUl.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || window.event.srcElement;
    if(target.nodeName.toLowerCase() === 'li' || target.nodeName.toLowerCase() === 'img'){
        switch(target.className){
            case 'tool_brush':
                toolShapeDef(target.className);
                that.Func.drawBrush();
                break;
            case 'tool_eraser':
                toolShapeDef(target.className);
                that.Func.drawEraser();
                break;
            case 'tool_paint':
                toolShapeDef(target.className);
                that.Func.drawPaint();
                break;
            case 'tool_dropper':
                toolShapeDef(target.className);
                that.Func.drawDropper();
                break;
            case 'tool_text':
                toolShapeDef(target.className);
                that.Func.drawWord();
                break;
            case 'tool_magnifier':
                toolShapeDef(target.className);
                that.Func.drawMagnifier();
                break;
        }
    }
},false);

shapeUl.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || window.event.srcElement;
    if(target.nodeName.toLowerCase() === 'li' || target.nodeName.toLowerCase() === 'img'){
        switch(target.className){
            case 'shape_line':
                toolShapeDef(target.className);
                that.Func.drawLine();
                break;
            case 'shape_arc':
                toolShapeDef(target.className);
                that.Func.drawArc();
                break;
            case 'shape_screen':
                toolShapeDef(target.className);
                that.Func.drawScreen();
                break;
            case 'shape_poly':
                toolShapeDef(target.className);
                that.Func.drawPoly();
                break;
            case 'shape_arcfill':
                toolShapeDef(target.className);
                that.Func.drawArcFill();
                break;
            case 'shape_rectangle':
                toolShapeDef(target.className);
                that.Func.drawRectFill();
                break;
        }
    }
},false);

function toolShapeDef(className){
    var oli = document.getElementsByClassName(className);
    for( var i = 0; i < toolLi.length; i++ ){
        toolLi[i].style.background = "";
    }
    for( var i = 0; i < shapeLi.length; i++ ){
        shapeLi[i].style.background = "";
    }
    oli[0].style.background = "yellow";
}

// 清空画布
var clear = document.getElementById('clear');
clear.onclick = function(){
    // 清除画布方法
    that.Func.clearPainting();
}

var save = document.getElementById('save');
save.onclick = function(){
    that.Func.saveImg();
}

var close = document.getElementById('close');
close.onclick = function(){
    that.Func.closeSaveImg();
}

