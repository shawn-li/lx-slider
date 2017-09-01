//幻灯片插件
(function($){
	var curNum=0;
	var target;
	var targetParent;
	var targetList;
	//兼容浏览器前缀
	var prefix=["","Webkit", "Moz", "O", "ms"];
	
	var sliderPrefix=function(name, value){
		var o={};
		var str;
		for (var i = 0; i < prefix.length; i++) {
			if (prefix[i]!='') {
				str=name;
				o[str]=value;
			}else{
				str='-'+prefix[i]+'-'+name;
				o[str]=value;
			} 
			
			//console.log(str);
		}
		return o;
	}
	//sliderPrefix('opacity',1);

	$.fn.lxslider=function(options){
		var settings= $.extend({}, $.fn.lxslider.defaults , options);

		$(this).css({
			'height':settings.boxHeight,
			'min-width':400,
			'margin':'20px auto',
			'border':'1px solid blue',
			'position': 'relative'
		});
		console.log($.fn.lxslider.defaults);
		console.log(options);
		var el =this;
		target=el.find(settings.sliderItem); //目标的每个图片项
		targetParent=target.parent();  //图片项的父框
		targetNum=target.length;   //图片项的总数
		console.log(targetParent);
		targetParent.append('<ul class="targetList"></ul>');  //加入bar显示栏
		targetList=$('.targetList');  
		console.log($(this)[0].id);

		//容器宽高
		var sliderWidth=$(el).width();
		var sliderHeight=$(this).height();
		console.log('sliderHeight '+sliderHeight+ '| sliderWidth '+sliderWidth);
		//图片宽高
		var img_height= settings.boxHeight*0.9 ;
		var img_width=img_height*settings.imgRatio;	
		var _left= (sliderWidth-img_width)/2;
		console.log('img_height '+img_height+ '| img_width '+img_width);
		//bar圆圈长宽
		var list_height=(settings.boxHeight/50)>5?(settings.boxHeight/50):5;
		var list_width=(settings.boxHeight/50)>5?(settings.boxHeight/50):5;
		var list_margin=(settings.boxHeight/25)>10?(settings.boxHeight/25):10;
		//pre、next按钮的高度
		var pre_height=$(settings.pre_button).height();
		var next_height=$(settings.next_button).height();
		
		
		//初始化
		if (settings.autoFlag==false) {
			$(settings.stop_button).html('开启');
		}
		target.each(function(index){
			//图片的位置
			$(this).find('img').css({
				'height': img_height ,
				'width': img_width
			});
			$(this).css("position","absolute");
			$(this).css({
				'positon':'absolute',
				'top':'5%',
				'left':_left
			});
			if (settings.changeType=='animate') {
				$(this).css({
					'z-index':'2'
				});
				$(this).css(sliderPrefix('opacity',0));
				if (index==0) {
					$(this).css({
						'z-index':'3'
					});	
					$(this).css(sliderPrefix('opacity',1));
				}
			}
			if (settings.changeType!='animate'&&index!=0) {
				$(this).css('display','none');
			}
		});
		for(var i=0;i<targetNum;i++){
			targetList.append('<li data-target="'+i+'"><div></div></li>');
		}
		console.log($(el).height());  //slider高度
		//targetList.css("position","absolute");

		//bar
		targetList.find('li').find('div').css({
			'background-color':'#aaa',
			'margin-right':list_margin,
			'width':list_width,
			'height':list_height
		});
		targetList.css({"top":settings.boxHeight*0.85 ,'left':( (sliderWidth-$('.targetList').width() )/2)});		
		targetList.find('li').eq(0).find('div').css('background-color','#fff');

		//按键
		$(settings.pre_button).css({'left':sliderWidth*0.05,'top':(sliderHeight-pre_height)/2,'position':'absolute'});
		$(settings.next_button).css({'right':sliderWidth*0.05,'top':(sliderHeight-next_height)/2,'position':'absolute'});
		$(settings.stop_button).css({'right':0,'top':0,'position':'absolute'});
		

		//图片切换方式 fade、slide、animate、zindex
		var sliderDisplay=function(){
			
			if (settings.changeType=='fade') {
				$(target[curNum]).fadeIn('fast');
			}else if(settings.changeType=='slide'){
				$(target[curNum]).slideDown('fast');
			}else if(settings.changeType=='animate'){
				var style={};
				//["Webkit", "Moz", "O", "ms", "khtml"]
				style['transition']='opacity '+settings.animateTime+'ms ease-in-out';
				style['-ms-transition']='-ms-opacity '+settings.animateTime+'ms ease-in-out';
				style['-moz-transition']='-moz-opacity '+settings.animateTime+'ms ease-in-out';
				style['-webkit-transition']='-webkit-opacity '+settings.animateTime+'ms ease-in-out';
				style['-o-transition']='-o-opacity '+settings.animateTime+'ms ease-in-out';
				//style['opacity'] = 1;
				style['z-index'] = 3;
				$(target[curNum]).css(sliderPrefix('opacity',1));
				$(target[curNum]).css(style);
				
			}
			settings.changeEnd();
		}
		//图片切换函数，先全部初始在渲染选择的那一个
		var imgChange=function(){
			//全部clean
			target.each(function(index,element){
				if (settings.changeType!='animate') {
					$(this).css('display','none');
				}else{
					$(this).css({
						'z-index':'2'
					});
					$(this).css(sliderPrefix('opacity',0));
				}		
				targetList.find('li').find('div').css('background-color','#aaa');
			});
			targetList.find('li').eq(curNum).find('div').css('background-color','#fff');
			sliderDisplay();
		}

		//计时器
		var timer;
		var Timer=function(auto){
			if (auto) {
				clearInterval(timer);
				timer=setInterval(function(){
					console.log(curNum);
					curNum++;
					if(curNum==(targetNum)){
						curNum=0;
						imgChange();					
					}else{
						imgChange();
					}
				},settings.changeTime);
			}
			
		}
		Timer(settings.autoFlag);

		//点击bar事件
		targetList.find('li').click(function(){
			//alert($(this).attr('data-target'));
			curNum=$(this).attr('data-target');
			imgChange();
			Timer();
			
		});
		//点击上一页下一页按钮事件
		$(settings.pre_button).click(function(){
			console.log(curNum);
			if (curNum >0 ) {
				curNum--;
				console.log("上一页:"+curNum);	
			
			}else if (curNum == 0) {
				curNum=targetNum-1;
			}
			imgChange();
			settings.preEnd();
			Timer(settings.autoFlag);
			return;
		});
		$(settings.next_button).click(function(){
			console.log(curNum);
			if (curNum < targetNum-1 ) {
				curNum++;
				console.log("下一页:"+curNum);
				console.log(target[curNum]);
				
			}else if(curNum == targetNum-1){
				curNum = 0;
			}
			imgChange();
			settings.nextEnd();
			Timer(settings.autoFlag);
			return;
		});

		$(settings.stop_button).click(function(){
			if (settings.autoFlag) {
				clearInterval(timer);
				settings.autoFlag=false;
				$(this).html("开启");
			}else{
				settings.autoFlag=true;
				Timer(settings.autoFlag);
				$(this).html("停止");
			}
		});

		$(settings.pre_button).hover(function(){
			$(this).addClass(settings.pre_hover_style_className);
		}).mouseout(function(){
			$(this).removeClass(settings.pre_hover_style_className);
		});
		$(settings.next_button).hover(function(){
			$(this).addClass(settings.next_hover_style_className);
		}).mouseout(function(){
			$(this).removeClass(settings.next_hover_style_className);
		});
		$(settings.stop_button).hover(function(){
			$(this).addClass(settings.stop_hover_style_className);
		}).mouseout(function(){
			$(this).removeClass(settings.stop_hover_style_className);
		});
		
	};
	
	/*
		使用说明：
		可以通过boxHeight设置图片外层即div#slider的大小，imgRatio设置宽高比，但是要求所有图片是统一的;
		sliderItem为内部子项可以自己命名，animateTime为动画延迟时间;
		pre_button、next_button、stop_button分别为上一页、下一页、自动滚动按钮，可以自己命名;
		changeType为幻灯片切换的种类：fade、animate、slide;
		changeTime为幻灯片切换延迟时间;
		autoFlag为自动滚动开关，默认为开;
		changeEnd、preEnd、nextEnd分别为：幻灯片切换后回调函数 和 上一页、下一页后的回调函数;
		pre_hover、next_hover、stop_hover为鼠标鼠标放在按键上的样式设置的类名;
	*/
	$.fn.lxslider.defaults={
		boxHeight:600,
		imgRatio: (5/6) ,   //宽高比如本例为5/6
		sliderItem:'.sliderItem',  //幻灯片的子项
		animateTime:500,   
		pre_button:'.cover_pre',  //上一页  
		next_button:'.cover_next',  //下一页
		stop_button:'.stop',  //停止幻灯片自动滚动按钮
		changeType:'fade',
		changeTime:2000,
		autoFlag:true,
		pre_hover_style_className:'btn_hover',     //鼠标放在按键上的样式设置的类名
		next_hover_style_className:'btn_hover',
		stop_hover_style_className:'btn_hover',
		changeEnd:function(){ console.log(this.changeType+" Finish!") },
		preEnd:function(){
			console.log("pre Finish!")
		},
		nextEnd:function(){
			console.log("next Finish!")	
		}
	}
})(jQuery);