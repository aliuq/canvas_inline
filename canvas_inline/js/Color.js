// ——————颜色模块——————
this.canvas = new Canvas();
var colorUl = document.getElementById("color_ul");
var colorLi = colorUl.getElementsByTagName('li');

// 初始化颜色
colorDef(colorLi[0]);

colorUl.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || window.event.srcElement;
    if(target.nodeName.toLowerCase() === 'li'){
        (function(){
            // 清空全部
            for( var i = 0; i < colorLi.length; i++ ){
                colorLi[i].style.border = "";
            }
            colorDef(target);
        })();
    }
})
function colorDef(obj){
    this.canvas.cxt.strokeStyle = obj.className;
    this.canvas.cxt.fillStyle = obj.className;
    obj.style.border= "2px solid #fff";
}