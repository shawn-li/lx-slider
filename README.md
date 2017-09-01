# lx-slider
### A simple plugin to create a slideshow with some pics

+ [Usage](#usage)
	+[HTML](#html)
	+[JS](#js)
  	+[CSS](#css)
  
+ [Options](#options)


## Usage
  就像我们看到的示例一样，我们需要引入插件的lx-slider.js和slider.css，当然还有jquery。另外这个示例用到了[fullpage插件jquery.fullpage.js](https://github.com/alvarotrigo/fullPage.js)，可以自行选择。
  As we can see in the example files, you will need to include the JavaScript file lx-slider.js and the css file slider.css of the plugin, as well as jQuery.Besides,this example also use fullpage plugin,and the choice is up to you.
  
  ### HTML
  ~~~
  <div id="wrap" style="margin: 10px auto;width: 800px;"> 
		<div class="section">            //jquery.fullpage要求每页class设为section
			<div class="" id="slider">     //幻灯片的父框id固定为slider
				<div class="sliderItem">   
					<img src="./images/img1.jpg">
				</div> 
				<div class="sliderItem">
					<img src="./images/img2.jpg">
				</div>
				<div class="sliderItem">
					<img src="./images/img3.jpeg">
				</div>
				<div class="sliderItem">
					<img src="./images/img4.jpeg">
				</div>
				<div class="sliderItem">
					<img src="./images/img5.jpg">
				</div>
				<button class="pre_button">上一页</button>
				<button class="next_button">下一页</button>
				<button class="stop_button">停止</button>
			</div>
		</div>
		<div class="section">第二页</div>
		<div class="section">第三页</div>
		<div class="section">第四页</div>
	</div>
~~~

### JS
~~~
  //lx-slider插件
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
~~~
