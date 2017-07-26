//$("html,body").animate({'scrollTop':"0px"})
function pageA(evt,ele){
    this.$root=ele;
    //男孩
    this.$boy=ele.find('.chs-boy');
    //窗户
    this.$window = ele.find(".window");    
    this.$leftWin  = this.$window.find(".window-left");
    this.$rightWin = this.$window.find(".window-right");
    this.callback=evt;
    this.run();
}
/*开窗*/
pageA.prototype.openWindow=function(){
    var _this=this
    var count=1
    var complete=function(){
       ++count;
       if(count===2){
           console.log('完成')
       }
     }
    var bind = function(data) {
        data.one("transitionend webkitTransitionEnd", function(event) {
            data.removeClass("window-transition")
            complete()
        })
    }
    bind(this.$leftWin.addClass("window-transition").addClass("hover"))
    bind(this.$rightWin.addClass("window-transition").addClass("hover"))
    setTimeout(function() {
        _this.callback();
    },1000)
    
}
/*运行下一个动画*/
pageA.prototype.next=function(opt){
    var dfd=$.Deferred();
    this.$boy.transition(opt.style, opt.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
}
/*驯鹿停止奔跑*/
pageA.prototype.stopWalk=function(){
    this.$boy.removeClass('boy-walk');
}
/*路径*/
pageA.prototype.run=function(callback){
    console.log(this);
    var _this=this;
    var next = function() {
            return this.next.apply(this, arguments)
        }.bind(this);
    next({
        "time": 10000,
        "style": {
            "top": "4rem",
            "right": "16rem",
            "scale": "1.2"
        }
    })
    .then(function() {
        $("html,body").animate({'scrollTop':$('.container').height()},10000)
        return next({
            "time":500,
            "style": {
               "rotateY" : "-180",
               "scale": "1.5"
            }
        })
    })    
    .then(function(){
        return next({
            "time": 7000,
            "style": {
                "top": "7.8rem",
                "right": "1.2rem",
            }
        })
    })
    .then(function(){
        _this.stopWalk();
    })
    .then(function(){
        _this.openWindow();
    })  
}

