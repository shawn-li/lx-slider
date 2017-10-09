(function(){
	var user_agent=navigator.userAgent;

	var client= function(){

		//浏览器引擎
		var engine = {
			//呈现引擎
			ie:0,
			gecko:0,
			webkit:0,
			khtml:0,
			opera:0,

			//具体版本号
			version:null
		};

		//浏览器
		var browser={
			ie:0,
			chrome:0,
			firefox:0,
			safari:0,
			opera:0,
			konq:0,

			version:null
		}

		if (window.opera) {
			engine.version = browser.version = window.opera.version();
			engine.opera = browser.opera = parseFloat(engine.version);
		}else if(/AppleWebKit\/(\S+)/.test(user_agent)){
			engine.version =  RegExp["$1"];
			//console.log(engine.version);
			engine.webkit = parseFloat(engine.version);

			//判断是chrome浏览器还是Satari
			if (/Chrome\/(\S+)/.test(user_agent)) {
				browser.version = RegExp["$1"];
				browser.chrome = parseFloat(browser.version);
			}else if(/Version\/(\S+)/.test(user_agent)){
				browser.version = RegExp["$1"];
				browser.safari = parseFloat(browser.version);
			}else{
				//近似的确认版本号
				var safariVersion=1;
				if ( engine.webkit<100 ) {
					safariVersion = 1;
				}else if( engine.webkit<312 ){
					safariVersion =1.2;
				}else if( engine.webkit<412 ){
					safariVersion =1.3;
				}else{
					safariVersion =2;
				}
				browser.safari =browser.version =safariVersion;
			}
		}else if(/KHTML\/(\S+)/.test(user_agent)){

			engine.version = browser.version =  RegExp["$1"];
			engine.khtml = browser.konq = parseFloat(engine.version);

		}else if(/Gecko\/(\S+)/.test(user_agent)){

			engine.version =  RegExp["$1"];
			engine.gecko =parseFloat(engine.version);
			if (/Firefox\/(\S+)/.test(user_agent)) {
				browser.version = RegExp["$1"];
				browser.firefox =parseFloat(engine.version);
			}
		}else if(/Trident\/(\S+)/.test(user_agent)){

			engine.version = browser.version =  RegExp["$1"];
			engine.ie = browser.ie = parseFloat(engine.version);

		}
		return {
			engine:engine,
			browser:browser
		}
	}
	var cli=client();
	console.log("浏览器引擎版本："+cli.engine.version);
	console.log(cli.engine);
	console.log("浏览器版本："+cli.browser.version);
	console.log(cli.browser);
})();