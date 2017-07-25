/**
 * 切换页面
 */
function changePage(element,effect,callback){
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function() {
            callback && callback();
        })
}

/**
 * 中间调用
 */
var Christmas = function() {
    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");
    //观察者
    var observer=new Observer();
    //A场景
    new pageA(function() {
        observer.publish("completeA");
    },$pageA)
    //进入B场景
    observer.subscribe("pageB",function(){
        new pageB(function(){
            observer.publish("completeB")
        },$pageB)
    })
    //进入C场景
    observer.subscribe("pageC",function(){
        new pageC()
    })
    //A-B场景切换
    observer.subscribe("completeA",function(){
        changePage($pageA, "effect-out", function() {
            observer.publish("pageB");
        })
    })
    //B-C切换
    observer.subscribe("completeB",function(){
        changePage($pageB, "effect-out", function() {
            observer.publish("pageC");
        })
    })
};   
$(function() {
    Christmas();
})