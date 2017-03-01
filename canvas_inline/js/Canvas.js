(function(window){
    'use strict';

    function Canvas(){
        //获取CanvasID
        this.cvs = document.getElementById("canvas");
        //获取2d对象
        this.cxt = this.cvs.getContext("2d");

        // this.offsetLeft = this.cvs.offsetLeft;
        // this.offsetTop = this.cvs.offsetTop;
        // return {
        //     cvs : this.cvs,
        //     cxt : this.cxt
        // }
    }

    window.Canvas = Canvas;
})(window)