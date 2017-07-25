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
    //this.run();
    setTimeout(function() {

		evt()

	}, 2000)
}

