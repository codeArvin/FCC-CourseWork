$(document).ready(function(){
	var config = {
		syncURL: "https://eggmu.wilddogio.com/"
	},
		arr = [],
		ref, moveObj, randomColor, getAndRun;

	//创建Sync实例
	wilddog.initializeApp(config);
	ref = wilddog.sync().ref();

	//数据提交至野狗云
	$('.send').click(function() {
		var text = $('.input').val();
		ref.child('messages').push(text);
		$('.input').val('');
	});

	//响应按键点击事件
	$('.input').keypress(function(event) {
		if (event.keyCode == '13') {
			$('.send').trigger('click');
		}
	});

	//响应按键清除事件
	$('.del').click(function () {
		ref.child('messages').remove();
	});

	//监听云端数据变更，云端数据变化，弹幕数据同步变化
	ref.child('messages').on('child_added', function (snapshot) {
		var text = snapshot.val(),
			textObj = $('<div class=\"message\"></div>');
		arr.push(text);
		textObj.text(text);
		$('.screen').append(textObj);
		moveObj(textObj);
	});

	ref.child('messages').on('child_removed', function () {
		arr = [];
		$('.screen').empty();
	});

	//弹幕移动函数
	moveObj = function (obj) {
		var top = $('.screen').height() * Math.random() - obj.height(),
			left = $('.screen').width() - obj.width(),
			color = randomColor(),
			time = 20000 + 10000 * Math.random();

		if (top < 0) {
			top = 0;
		}

		obj.css({
			top : top,
			left : left,
			color : color
		});

		obj.animate({left : "-" + left + "px"}, time, function () {
			obj.remove();
		});

	};

	//随机颜色
	randomColor = function () {
		 return '#' + (function(h) {
	      return new Array(7 - h.length).join("0") + h;
	    })((Math.random() * 0x1000000 << 0).toString(16));
	};

	//定时数据发送至弹幕 3s
	getAndRun = function () {
		var n, obj;

		if (arr.length > 0) {
			n = Math.floor(Math.random() * arr.length);
			obj = $('<div class=\"message\">' + arr[n] + '</div>');
			$('.screen').append(obj);
			moveObj(obj);
		}

		setTimeout(getAndRun, 5000);
	};

	getAndRun();

});
