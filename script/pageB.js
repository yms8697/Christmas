function pageB (callback,ele) {
    $("html,body").animate({'scrollTop':$('.container').height()},10000);
    var _this=this;
    //男孩
    var $boy=ele.find('.christmas-boy');
    //女孩
    var $girl=ele.find('.girl');
    var animationEnd = "animationend webkitAnimationEnd";
    //猫
    var $cat=ele.find('.cat');
    /*男孩动作*/
    var boyAction={
        //行走
        walk:function(){
            var dfd=$.Deferred();
            $boy.addClass('boy-walk');
            $boy.transition({"right":"4.5rem"},4000,"linear",function(){
                dfd.resolve();
            })
            return dfd;
        },
        //停止走路
        stopWalk:function(){
            $boy.removeClass('boy-walk');
            $boy.addClass('boy-stand');
        },
        //继续走路
        runwalk:function(){
            $boy.addClass('walk-run');
        },
        //拆包裹
        unWrap:function(){
            var dfd=$.Deferred();
            $boy.addClass('boy-unwrapp');
            $boy.removeClass('boy-stand');
            $boy.one(animationEnd, function() {
                $('#carousel').show(1000)
                _this.rotate(0);
                dfd.resolve();
            })

            return dfd;
        },
        //脱衣
        strip:function(count){
            $boy.addClass('boy-strip-'+count).removeClass('boy-unwrapp');
        },
        //人物用拥抱
        //重叠问题处理
        hug: function() {
            $boy.addClass("boy-hug").one(animationEnd, function() {
                $(".christmas-boy-head").show()
            })
        }
    }
    //女孩动作
    var girlAction={
        //小女起立
        standUp: function() {
            var dfd = $.Deferred();
            //起立
            setTimeout(function(){
                $girl.addClass("girl-standUp");
            },200)
            //抛书
            setTimeout(function(){
                $girl.addClass("girl-throwBook");
                $cat.removeClass("cat-no-book")
                    .addClass("cat-has-book");
                dfd.resolve();
            },500)
            return dfd;
        },
        //走路
        walk: function() {
            var dfd=$.Deferred();
            $girl.addClass('girl-walk');
            $girl.transition({"left":"4.5rem"},4000,"linear",function(){
                dfd.resolve();
            })
            return dfd;
        },
        //停止走路
        stopWalk: function() {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand")
        },
        //站立
        removeChoose: function () {
            var dfd=$.Deferred();
            if($girl.hasClass("girl-choose-remove")){
                $girl.removeClass("girl-choose-remove")
                    .addClass("girl-choose-remove")
                console.log('has');
            }
            else{
                $girl.addClass("girl-choose-remove")
                .removeClass("girl-choose")
                console.log('nothas');
            }
            $girl.one(animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
        //选择3d
        choose: function() {
            console.log('choose');
            var dfd=$.Deferred();
            $girl.addClass("girl-choose")
                .removeClass("walk-stop")
                .removeClass("girl-choose-remove")
            $girl.one(animationEnd, function() {
                dfd.resolve();
            })
            return dfd;
        },
        //泪奔
        weepWalk: function(callback) {
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, 1000, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep")
                callback();
            })
        },
        //拥抱
        hug: function() {
            $girl.addClass("girl-hug").addClass("walk-run")
        },
        action: function (i) {
            return _this.rotate(i + 1)
                .then(function () {
                    //女孩选择礼物
                    return girlAction.choose();
                })
                .then(function () {
                    //播放视频
                    return _this.carousel(i)
                })
                .then(function () {
                    //女孩站立
                    return girlAction.removeChoose();
                })
        }
    }
    boyAction.walk()
        .then(function(){
            //停止走路
            boyAction.stopWalk();
        })
        .then(function () {
            return girlAction
                .standUp()
                .then(function () {
                    //女孩走路
                    return girlAction.walk();
                })
                .then(function () {
                    //女孩停止走路
                    return girlAction.stopWalk();
                })
        })
        .then(function(){
            //解开包裹
            return boyAction.unWrap();
        })
        .then(function () {
            return girlAction.action(0);
        })
        .then(function () {
            return girlAction.action(1);
        })
        .then(function () {
            return girlAction.action(2);
        })
        .then(function(){
            var dfd=$.Deferred();
            $('#carousel').hide(1000)
            //脱衣动作
            setTimeout(function(){
                boyAction.strip(1)
            },1000)
            setTimeout(function(){
                boyAction.strip(2)
            },2000)
            setTimeout(function(){
                boyAction.strip(3)
                dfd.resolve()
            },3000)
            //任务重叠问题
            setTimeout(function(){
                boyAction.hug();
            },4000)
            return dfd
        })
        .then(function () {
            var dfd=$.Deferred();
            //继续走路
            girlAction.weepWalk(function () {
                //拥抱
                girlAction.hug();
                dfd.resolve();
            })
            return dfd; 
        })
        .then(function () {
            setTimeout(function () {
                callback();
            }, 1500)

        })
    
    
   /* girlAction
        .standUp()
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function(){
            //选择
            girlAction.choose(function() {
                //继续走路
                girlAction.weepWalk(function() {
                    //拥抱
                    girlAction.hug();
                })
            })

        })*/
}
pageB.prototype.rotate=function(i){
    var dfd=$.Deferred();
    var rotate = 120
    var angle;
    angle =  i* rotate + 360
    $("#spinner")
        .css({
            "transform": "rotateY(-" + angle + "deg)",
            "transition": "2s"
        })
    /*$('#carousel')
        .css({
            "transform":"scale(1)",
            "transition": "2s"
        })*/
    setTimeout(function() {
		dfd.resolve();
	}, 2000)
    console.log('ddddd');
    return dfd;
    
}
pageB.prototype.carousel=function(index){
    console.log(index);
    var dfd=$.Deferred();
    var  videoUrls=['./images/carousel/1.mp4','./images/carousel/2.mp4','./images/carousel/3.mp4']
    var $carousel=$('#carousel');
    var $video = $('<video preload="auto"  class="bounceIn" style="width:50%;height:50%;position:absolute;left:30%;top:35%;"></video>');
    $video.css({
        "position": "absolute",
        "z-index": "999"
    })
    //地址
    $video.attr('src',videoUrls[index]);
    //播放
    $video.on("loadeddata", function () {
        $video[0].play()
    })
    //停止
    $video.on("ended", function () {
        $video[0].pause()
        //退出效果
        $video.addClass("bounceOut").one("animationend webkitAnimationEnd", function () {
            $video.remove();
            dfd.resolve();
        })
    })
    $carousel.after($video);
    return dfd;

}
