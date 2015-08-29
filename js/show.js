window.onload = function() {
	var btnDown = JSHELPER.$("#goDown"),
		btnUp = JSHELPER.$("#goUp"),
		wrap = JSHELPER.$("#banner"),
		liList = wrap.children[0].children,
		len = liList.length;
	wrap.style.overflow = "visible";
	//设置 left 和  top
	for(var i = 0; i < len; i++) {
		liList[i].style.left = liList[i].offsetLeft + "px";
		if(i >= 12) {
			liList[i].style.top = "400px";
		} else {
			liList[i].style.top = liList[i].offsetTop + "px";
		}
	}
	//添加 position:absolute
	for(var i = 0; i < len; i++) {
		liList[i].style.position = "absolute";
	}
	//把容器外的设置为透明
	for(var i = 8; i < len; i++) {
		liList[i].style.filter = "alpha(opacity=0)";
		liList[i].style.opacity = 0;
		liList[i].style.display = "none";
	}
	
	var now = 0;
	//上一个
	btnUp.onclick = function() {
		if(now == 0) {
			return;
		}
		var i = now + 8;
		i = i >= len ? (len-1) : i;
		var timerDo = setInterval(function() {
			if(i < now) {
				liList[i].style.display = "block";
				JSHELPER.animate(liList[i], {top: 0, opacity: 100});
			} else if(i < now + 4) {
				JSHELPER.animate(liList[i], {top: 200});
			} else {
				JSHELPER.animate(liList[i], {top: 400, opacity: 0});
			}
			i--;
			if( i == now - 5 ) {
				now -= 4;
				for(var m = len-1; m > now+7; m--) {
					liList[m].style.display = "none";
				}
				clearInterval(timerDo);
			}
		}, 50);
	};
	//下一个
	btnDown.onclick = function() {
		if(now >= len - 8) {
			return;
		}
		var i = now;
		var timerDo = setInterval(function() {
			if(i < now + 4) {
				JSHELPER.animate(liList[i], {top: -200, opacity: 0});
			} else if(i < now + 8) {
				JSHELPER.animate(liList[i], {top: 0});
			} else {
				liList[i].style.display = "block";
				JSHELPER.animate(liList[i], {top: 200, opacity: 100});
			}
			i++;
			if( i == now + 12 ) {
				now += 4;
				for(var m = 0; m < now; m++) {
					liList[m].style.display = "none";
				}
				clearInterval(timerDo);
			}
		}, 50);
	};
	
	//放大镜
	for(var i = 0; i < len; i++) {
		(function(i) {
			liList[i].children[0].onmouseover = function() {
				liList[i].style.zIndex = 100;
				JSHELPER.animate(liList[i].children[0], {width:280, height: 280, left: -50, top: -50});
				JSHELPER.animate(liList[i].children[1], {width:300, height: 300, left: -50, top: -50});
			};
			liList[i].children[0].onmouseout = function() {
				liList[i].style.zIndex = 10;
				JSHELPER.animate(liList[i].children[0], {width:170, height: 170, left: 5, top: 5});
				JSHELPER.animate(liList[i].children[1], {width:190, height: 190, left: 5, top: 5});
			};
		})(i);
	}
	
};

      
	

	
	