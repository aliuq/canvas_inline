(function(window){
    'use strict';

    //获取CanvasID
    var cvs = document.getElementById("canvas");
    //获取2d对象
    var cxt = cvs.getContext("2d");
    // console.log(cvs);
    // console.log(cxt);
    function Func(){
        var photo = document.getElementById('photo');
        var flag = document.getElementById('flag');
    }

    Func.prototype = {
        constructor : Func,
        //画笔函数
        drawBrush : function(){
            // ——————设置标志位——————
            var flag = 0;
            //鼠标按下事件，获取开始点坐标
            cvs.onmousedown = function(evt){
                //兼容IE和火狐……等浏览器
                evt = window.event ? window.event : evt;
                // evt.pageX 为页面上X坐标; cvs.offsetLeft 为画布相对于左上角的X坐标
                var startX = evt.pageX - this.offsetLeft;
                // evt.pageY 为页面上Y坐标; cvs.offsetTop 为画布相对于左上角的Y坐标
                var startY = evt.pageY - this.offsetTop;
                //开始路径
                cxt.beginPath();
                cxt.moveTo( startX, startY );
                //标志位=1，已触发点击事件
                flag = 1;
            }

            // 鼠标移动事件，获取lineTo坐标
            cvs.onmousemove = function(evt){
                //兼容IE和火狐……等浏览器
                evt = window.event ? window.event : evt;
                // evt.pageX 为页面上X坐标; cvs.offsetLeft 为画布相对于左上角的X坐标
                var endX = evt.pageX - this.offsetLeft;
                // evt.pageY 为页面上Y坐标; cvs.offsetTop 为画布相对于左上角的Y坐标
                var endY = evt.pageY - this.offsetTop;
                //判断是否触发了点击事件
                if(flag){
                    //画路径
                    cxt.lineTo( endX, endY );
                    cxt.stroke();
                }
                
            }

            // 鼠标松开事件，关闭路径
            cvs.onmouseup = function(){
                flag = 0;
            }

            //鼠标移出事件
            cvs.onmouseout = function(){
                flag = 0;
            }
        },
        //橡皮擦函数
        drawEraser : function(){
            var eraserFlag = 0;
            //鼠标按下事件，开始擦除
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                var startX = evt.pageX - this.offsetLeft;
                var startY = evt.pageY - this.offsetTop;
                //擦除函数
                cxt.clearRect( startX-cxt.lineWidth, startY-cxt.lineWidth, cxt.lineWidth*2, cxt.lineWidth*2 );
                eraserFlag = 1;
                
            }
            //鼠标移动事件，擦除
            cvs.onmousemove = function(evt){
                evt = window.event ? window.event : evt;
                var startX = evt.pageX - this.offsetLeft;
                var startY = evt.pageY - this.offsetTop;
                //判断是否触发了鼠标点击事件
                if( eraserFlag ){
                    //擦除函数
                    cxt.clearRect( startX-cxt.lineWidth, startY-cxt.lineWidth, cxt.lineWidth*2, cxt.lineWidth*2 );
                }
            }
            //鼠标抬起，结束擦除
            cvs.onmouseup = function(){
                eraserFlag = 0;
            }
            //鼠标移开事件
            cvs.onmouseout = function(){
                eraserFlag = 0;
            }
        },
        //油漆桶函数
        drawPaint : function(){
            //鼠标按下事件
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                cxt.fillRect( 0, 0, cvs.width, cvs.height );
                cxt.fill();
            }
            //注销鼠标抬起，鼠标移动，鼠标移开事件
            cxt.onmouseup = null;
            cxt.onmousemove = null;
            cxt.onmouseout = null;
        },
        //吸管函数
        drawDropper : function (){
            var that = this;
            //鼠标按下事件
            cvs.onmousedown = function(evt){
                var toolUl = document.getElementById('tool_ul');
                var toolLi = toolUl.getElementsByTagName('li');
                evt = window.event ? window.event : evt;
                var startX = evt.pageX - this.offsetLeft;
                var startY = evt.pageY - this.offsetTop;
                // 获取按下的位置的图像信息,是一个对象
                var obj = cxt.getImageData( startX, startY, 1, 1 );
                // 获取Data，在data数组中，每四个元素表示一个像素点,这四个取值范围都为0~255
                // obj.data = [
                //      红, 绿, 蓝色, 透明度,
                //      红, 绿, 蓝色, 透明度,
                //      红, 绿, 蓝色, 透明度
                // ];
                // 将获取到的rgb值赋给color
                var color = "rgb( "+obj.data[0]+", "+obj.data[1]+", "+obj.data[2]+" )";
                cxt.strokeStyle = color;
                cxt.fillStyle = color;
                for( var i = 0; i < toolLi.length; i++ ){
                    toolLi[i].style.background = "";
                }
                toolShapeDef(toolLi[0].className);
                that.drawBrush();
            }
            //注销其他事件
            cxt.onmouseup = null;
            cxt.onmousemove = null;
            cxt.onmouseout = null;
        },
        //文本函数
        drawWord : function(){
            var startX = 0;
            var startY = 0;
            //鼠标按下事件
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
                // prompt window自有函数，弹窗函数，可接受字符串的输入。
                var txt = prompt( "请输入文字？", "" );
                // 设置文本样式
                cxt.font = "30px 楷体";
                //文本填充函数
                if( txt != null ){
                    cxt.fillText( txt, startX, startY );
                }
            }
            //注销其他鼠标事件
            cvs.onmouseup = null;
            cvs.onmousemove = null;
            cvs.onmouseout = null;
        },
        //放大镜函数
        drawMagnifier : function(){
            var reg = "^[0-9]{1,3}$";
            var value = prompt( "请输入需要调整的缩放比例", "100" );
            var newW = cvs.width * value / 100;
            var newH = cvs.height * value / 100;
            if( value.match(reg) ){
                cvs.style.width = parseInt( newW );
                cvs.style.height = parseInt( newH );
            }else{
                alert("请输入正确的数值！！！");
            } 
        },
        //画线
        drawLine : function(){
            //鼠标按下事件，获取开始点坐标
            cvs.onmousedown = function(evt){
                //兼容IE和火狐……等浏览器
                evt = window.event ? window.event : evt;
                // evt.pageX 为页面上X坐标; cvs.offsetLeft 为画布相对于左上角的X坐标
                var startX = evt.pageX - this.offsetLeft;
                // evt.pageY 为页面上Y坐标; cvs.offsetTop 为画布相对于左上角的Y坐标
                var startY = evt.pageY - this.offsetTop;
                //开始路径
                cxt.beginPath();
                cxt.moveTo( startX, startY );
            }
            // 鼠标松开事件，关闭路径
            cvs.onmouseup = function(evt){
                //兼容IE和火狐……等浏览器
                evt = window.event ? window.event : evt;
                // evt.pageX 为页面上X坐标; cvs.offsetLeft 为画布相对于左上角的X坐标
                var endX = evt.pageX - this.offsetLeft;
                // evt.pageY 为页面上Y坐标; cvs.offsetTop 为画布相对于左上角的Y坐标
                var endY = evt.pageY - this.offsetTop;
                //画路径
                cxt.lineTo( endX, endY );
                cxt.closePath();
                cxt.stroke();
            }
            // 注销鼠标移动事件
            cvs.onmousemove = null;

            //注销鼠标移出事件
            cvs.onmouseout = null;
        },
        //画圆
        drawArc : function (){
            //获取圆心,鼠标按下事件
            var startX = 0;
            var startY = 0;
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
            }
            //获取半径,鼠标松开事件
            cvs.onmouseup = function(evt){
                evt = window.event ? window.event : evt;
                var endX = evt.pageX - this.offsetLeft;
                var endY = evt.pageY - this.offsetTop;
                //求半径，利用c*c = a*a + b*b，
                var r = Math.sqrt( (endX-startX)*(endX-startX) + (endY-startY)*(endY-startY) );
                //画圆
                cxt.beginPath();
                cxt.arc( startX, startY, r, 0, 360, false );
                cxt.closePath();
                cxt.stroke();
            }
            //注销鼠标移开和鼠标移动事件
            cvs.onmousemove = null;
            cvs.onmouseout = null;
        },
        //画方框
        drawScreen : function (){
            //获取起始点坐标，鼠标点击事件
            var startX = 0;
            var startY = 0;
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
            }
            //获取长宽,鼠标松开事件
            cvs.onmouseup = function(evt){
                evt = window.event ? window.event : evt;
                var endX = evt.pageX - this.offsetLeft;
                var endY = evt.pageY - this.offsetTop;
                //画方框
                cxt.beginPath();
                cxt.rect( startX, startY, endX-startX, endY-startY );
                cxt.closePath();
                cxt.stroke();
            }
            //注销鼠标移出和鼠标移动事件
            cxt.onmousemove = null;
            cxt.onmouseout = null;
        },
        //画三角形
        drawPoly : function (){
            //三角形中心坐标，鼠标按下事件
            var startX = 0;
            var startY = 0;
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
            }
            //鼠标松开事件，求得三个点的坐标
            cvs.onmouseup = function(evt){
                evt = window.event ? window.event : evt;
                var endX = evt.pageX - this.offsetLeft;
                var endY = evt.pageY - this.offsetTop;
                //画三角形
                cxt.beginPath();
                //顶点坐标A ( startX, 2*startY-endY )
                cxt.moveTo( startX, 2*startY-endY );
                //左下角坐标C ( endX, endY )
                cxt.lineTo( endX, endY );
                //右下角坐标B ( 2*startX-endX, endY )
                cxt.lineTo( 2*startX-endX, endY );
                cxt.closePath();
                cxt.stroke();
            }
            //注销事件
            cvs.onmouseout = null;
            cvs.onmousemove = null;
        },
        //画圆形(填充)
        drawArcFill : function(){
            //获取圆心,鼠标按下事件
            var startX = 0;
            var startY = 0;
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
            }
            //获取半径,鼠标松开事件
            cvs.onmouseup = function(evt){
                evt = window.event ? window.event : evt;
                var endX = evt.pageX - this.offsetLeft;
                var endY = evt.pageY - this.offsetTop;
                //求半径，利用c*c = a*a + b*b，
                var r = Math.sqrt( (endX-startX)*(endX-startX) + (endY-startY)*(endY-startY) );
                //画圆
                cxt.beginPath();
                cxt.arc( startX, startY, r, 0, 360, false );
                cxt.closePath();
                cxt.fill();
            }
            //注销鼠标移开和鼠标移动事件
            cvs.onmousemove = null;
            cvs.onmouseout = null;
        },
        //画方形(填充)
        drawRectFill : function (){
            //获取起始点坐标，鼠标点击事件
            var startX = 0;
            var startY = 0;
            cvs.onmousedown = function(evt){
                evt = window.event ? window.event : evt;
                startX = evt.pageX - this.offsetLeft;
                startY = evt.pageY - this.offsetTop;
            }
            //获取长宽,鼠标松开事件
            cvs.onmouseup = function(evt){
                evt = window.event ? window.event : evt;
                var endX = evt.pageX - this.offsetLeft;
                var endY = evt.pageY - this.offsetTop;
                //画方框
                cxt.beginPath();
                cxt.rect( startX, startY, endX-startX, endY-startY );
                cxt.closePath();
                cxt.fill();
            }
            //注销鼠标移出和鼠标移动事件
            cxt.onmousemove = null;
            cxt.onmouseout = null;
        },
        // 清空画布
        clearPainting : function(){
            cxt.clearRect( 0, 0, cvs.width, cvs.height );
        },
        // 保存图片
        saveImg : function(){
            var imgSave = document.getElementById('img_save');
            var imgData = cvs.toDataURL();
            imgSave.src = imgData;

            photo.style.display = 'block';
            flag.style.display = 'block';
        },
        // 关闭保存图片
        closeSaveImg : function(){
            photo.style.display = 'none';
            flag.style.display = 'none';
        }
    }

    window.Func  = Func;
})(window);