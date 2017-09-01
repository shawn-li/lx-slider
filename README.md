# lx-slider
### A simple plugin to create a slideshow with some pics

+ [Usage](#usage)
	- [HTML](#html)
	- [JS](#js)
  	- [CSS](#css)
  
+ [Options](#options)


## Usage
就像我们看到的示例一样，我们需要引入插件的lx-slider.js和slider.css，当然还有jquery。另外这个示例用到了[fullpage插件jquery.fullpage.js](https://github.com/alvarotrigo/fullPage.js)，可以自行选择。<br/>
As we can see in the example files, you will need to include the JavaScript file lx-slider.js and the css file slider.css of the plugin, as well as jQuery.Besides,this example also use fullpage plugin,and the choice is up to you.
  
  ### HTML
  ~~~
  	<div id="wrap" style="margin: 10px auto;width: 800px;"> 
		<div class="section">                           //jquery.fullpage要求每页class设为section
			<div class="" id="slider">              //幻灯片的父框id固定为slider
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
		//配置选项
		...
	});

	//fullpage插件
	$('#wrap').fullpage();
	
~~~

### CSS
~~~
	body,div{
		margin: 0;
		padding: 0;
	}

	#slider button{
		width: 80px;
		height: 30px;
		cursor: pointer;
	}
	#slider ul{
		list-style: none;
		padding: 5px;
		position: absolute;
		top: 20px;
		z-index:4;
	}
	#slider li{
		float: left;
		cursor: pointer;
		//transition:all 150ms;
	}
	#slider li>div{
		-moz-border-radius: 999px; /* Firefox */
		-webkit-border-radius: 999px; /* Safari 和 Chrome */
		border-radius: 999px; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
	}
	//上一页、下一页、停止/开启按键hover样式可自行设置
	.btn_hover{
		background: #aaa;
		cursor: pointer;
	}
~~~


## Options
+ boxHeight: 幻灯片父框，即div#slider
+ imgRatio:  宽高比如本例，默认为5/6
+ sliderItem: 幻灯片的子项，默认为'.sliderItem'
+ animateTime:  动画延迟，默认为500 
+ pre_button: 上一页按键的className（加.），默认为'.cover_pre'   
+ next_button:  下一页按键的className（加.），默认为'.cover_next'
+ stop_button:  停止幻灯片自动滚动按钮的className（加.），默认为'.stop'
+ changeType:  图片切换方式选择，有animate、fade、slide，默认为'animate'
+ changeTime:  图片切换延迟，默认为2000,
+ autoFlag:  幻灯片自动切换开关，默认为true,
+ pre_hover_style_className:  鼠标放在“上一页”按键上的样式设置的类名，默认为'btn_hover'
+ next_hover_style_className:  鼠标放在“下一页”按键上的样式设置的类名，默认为'btn_hover'
+ stop_hover_style_className:  鼠标放在“停止/开启一页”按键上的样式设置的类名，默认为'btn_hover'
+ changeEnd:  图片切换回调函数，默认为function(){ console.log(this.changeType+" Finish!") }
+ preEnd:  点击“上一页”按键切换回调函数，默认为function(){console.log("pre Finish!")},
+ nextEnd: 点击“上一页”按键切换回调函数，默认为function(){console.log("next Finish!)}


**联系方式：707361845@qq.com**
