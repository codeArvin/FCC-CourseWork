$(document).ready(function(){
	// sonud
	var audioContext = new AudioContext();
	var frequencies = [415,310,252,209];
	var errOsc = audioContext.createOscillator();
	errOsc.type = 'triangle';
	errOsc.frequency.value = 440;
	errOsc.start();
	var errNode = audioContext.createGain();
	errOsc.connect(errNode);
	errNode.gain.value = 0;
	errNode.connect(audioContext.destination);
	var ramp = 0.1;
	var vol = 0.5;
	var oscillators = frequencies.map(function(frq){
		var osc = audioContext.createOscillator();
		osc.type = 'sine';
		osc.frequency.value = frq;
		osc.start();
		return osc;
	});
	var gainNodes = oscillators.map(function(osc){
		var gNode = audioContext.createGain();
		osc.connect(gNode);
		gNode.gain.value = 0;
		gNode.connect(audioContext.destination);
		return gNode;
	});
	var playGoodTone = function (num) {
		gainNodes[num].gain.linearRampToValueAtTime(vol, audioContext.currentTime + ramp);
		game.currColor = $('#'+num);
		game.currColor.addClass('light');
	};
	var stopGoodTones = function () {
		if (game.currColor) {
			game.currColor.removeClass('light');
		}
		gainNodes.forEach(function(g){
			g.gain.linearRampToValueAtTime(0, audioContext.currentTime + ramp);
		});
		game.currColor = undefined;
	};
	var playErrTone = function () {
		errNode.gain.linearRampToValueAtTime(vol, audioContext.currentTime + ramp);
	};
	var stopErrTone = function () {
		errNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + ramp);
	};
	
	// function
	var game = {};
	game.arr = [];
	game.clickArr = [];
	game.click = function (id) {
		game.clickArr.push(id);
	};
	game.check = function () {
		for (var i = 0; i < game.clickArr.length; i++) {
			if (game.clickArr[i] != game.arr[i]) {
				return false;
			}
		}
		if (game.clickArr.length === 20) {
			return 'win';
		}
		return true;
	};
	game.start = function () {
		game.end();
		game.comp();
	};
	game.comp = function () {
		game.addStep();
		game.show();
	};
	game.player = function () {
		$('.lay').addClass('hover');
		$('.lay').click(function(){
			var id = $(this).attr('id');
			game.clickArr.push(id);
			var ans = game.check();
			if (!ans){
				$('.lay').removeClass('hover');
				$('.lay').off('click');
				game.clickArr = [];
				game.showErr();
				return;
			}
			playGoodTone(id);
			setTimeout(stopGoodTones, 200);
			if (ans === 'win') {
				alert('You Win!!!');
				game.start();
				return;
			}
			if(game.clickArr.length === game.arr.length) {
				$('.lay').removeClass('hover');
				$('.lay').off('click');
				game.clickArr = [];
				game.comp();
			}
		});
	};
	game.showErr = function () {
		var a = setInterval(function(){
			playErrTone();
			setTimeout(function(){
				stopErrTone();
				if (game.strict) {
					game.start();
				} else {
					setTimeout(game.show, 1500);
				}
			}, 1000);
			clearInterval(a);
		},1000);
	};
	game.show = function () {
		var i = 0;
		$('.screen').text(game.arr.length);
		var a = setInterval(function(){
			playGoodTone(game.arr[i]);
			setTimeout(stopGoodTones, 500);
			i++;
			if (i === game.arr.length) {
				clearInterval(a);
				game.player();
			}
		}, 1000);
	};
	game.addStep = function () {
		var rand = Math.floor(Math.random()*4);
		game.arr.push(rand);
	};
	game.end = function () {
		game.arr = [];
		game.clickArr = [];
		$('.screen').text('');
	};
	
	
	$('.on-off').click(function(){
		if ($('.change').attr('id')==='off') {
			$('.screen').text('- -');
			$('.change').addClass('on').attr('id','on');
			$('.str-btn, .bg-btn').addClass('hover');
			$('.bg-btn').click(function(){
				if ($('.bg-btn').attr('id')==='off') {
					$('.bg-btn').attr('id','on');
					$('.bg-btn').css('backgroundColor','red');
					game.start();
				} else {
					$('.bg-btn').attr('id','off');
					$('.bg-btn').css('backgroundColor','lavender');
					game.end();
				}
			});
			$('.str-btn').click(function(){
				if ($('.str-btn').attr('id')==='nostr') {
					$('.str-btn').css('backgroundColor','yellow');
					game.strict = true;
					$('.str-btn').attr('id','str');
				} else {
					$('.str-btn').css('backgroundColor','lavender');
					game.strict = false;
					$('.str-btn').attr('id','nostr');
				}
			});
		} else {
			$('.change').removeClass('on').attr('id','off');
			$('.bg-btn, .str-btn').off('click');
			$('.bg-btn').attr('id','off');
			$('.bg-btn').css('backgroundColor','lavender');
			$('.str-btn').css('backgroundColor','lavender');
			$('.str-btn').attr('id','nostr');
			game.end();
		}
	});
});
