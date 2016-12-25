var url = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?",
	getQuote, shareUrl, color, getRandomColor;

getQuote = function (data) {
	color = getRandomColor();
	shareUrl = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.quoteText) + ' Author: ' + encodeURIComponent(data.quoteAuthor);
	if (data.quoteAuthor === "") {
		data.quoteAuthor = "Unknown";
	}
	
	$('.url').attr('href', shareUrl);
	
	$('.quote-text').animate({
		opacity: 0
	}, 500, function(){
		$('.quote-text').animate({
			opacity: 1
		}, 500);
		$('.quote-text').html(data.quoteText);
	});
	
	$('.quote-author').animate({
		opacity: 0
	}, 500, function(){
		$('.quote-author').animate({
			opacity: 1
		}, 500);
		$('.author').html(data.quoteAuthor);
	});
	
	$('body').animate({
		backgroundColor: color,
		color: color
	}, 1000);
	
	$('button').animate({
		backgroundColor: color
	}, 1000);
};

getRandomColor = function () {
		 return '#' + (function(h) {
	      return new Array(7 - h.length).join("0") + h
	    })((Math.random() * 0x1000000 << 0).toString(16));
	};

$(document).ready(function(){
	$.getJSON(url, getQuote, 'jsonp');
	$('.quote').click(function(){
		$.getJSON(url, getQuote, 'jsonp');
	});
});



