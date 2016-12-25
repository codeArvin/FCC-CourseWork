var createDiv, bindBtn,
	list = ["medrybw","freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"],
	key = "?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?",
	url = "https://api.twitch.tv/kraken/";

bindBtn = function() {
	$('#all').click(function(){
		$('#all').addClass('active');
		$('#on,#off').removeClass('active');
		$('#allContent').css('display','block');
		$('#onContent, #offContent').css('display','none');
	});

	$('#on').click(function(){
		$('#on').addClass('active');
		$('#all,#off').removeClass('active');
		$('#onContent').css('display','block');
		$('#allContent, #offContent').css('display','none');
	});

	$('#off').click(function(){
		$('#off').addClass('active');
		$('#on,#all').removeClass('active');
		$('#offContent').css('display','block');
		$('#onContent, #allContent').css('display','none');
	});
};


$(document).ready(function(){
	bindBtn();
	var a = function(i) {

		var name = list[i];
		var obj = {};
		$.getJSON(url + 'users/' + name + key, function(userdata){
			obj.username = userdata['display_name'];
			obj.logo = userdata['logo'];
			if (!obj.logo) {
				obj.logo = 'http://oiovk17jy.bkt.clouddn.com/Head.jpg';
			}

			$.getJSON(url + 'streams/' + name + key, function(streamsdata){
				if (streamsdata['stream'] === null) {
					obj.state = 'Offline';
					obj.title = '';
					obj.Url = 'https://www.twitch.tv/' + name;
				} else {
					obj.state = 'Online';
					obj.title = streamsdata['stream']['channel']['status'];
					obj.Url = streamsdata['stream']['channel']['url'];
					if (obj.title.length > 30) {
						obj.title = obj.title.substring(0,30);
						obj.title += '...';
					}
				}
				var div = '<div class="content"><a target="_blank" href="' + obj.Url + '"><div class="left"><img src="' + obj.logo +  '"/></div>' +
					'<div class="text"><div class="name">' + obj.username + '</div>' +
					'<div class="title">' + obj.title + '</div>' +
					'</div><div class="state">' + obj.state + '</div></a></div>';


				if (obj.state === 'Online') {
					$('#allContent').append(div);
					$('#onContent').append(div);
				} else {
					$('#allContent').append(div);
					$('#offContent').append(div);
				}
			});

			if (i++ < list.length - 1) {
				a(i);
			} else {
				return;
			}

		});


	};

	a(0);
});
