(function(){
	
	//lx-slider插件
	//$('.slider').lxslider();
	$('#slider').lxslider({
		boxHeight:500,
		imgRatio:(5/7),
		pre_button:'.pre_button',
		next_button:'.next_button',
		stop_button:'.stop_button',
		changeType:'animate',
		animateTime:1000,
		autoFlag:false,
		changeEnd:function(){
			console.log("yoyoyo");
		}
	});

	//fullpage插件
	$('#wrap').fullpage();
})();