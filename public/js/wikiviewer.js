var search, addData;

search = function () {
	var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + $('.search').val();
	
	$.ajax({
		url: url,
		dataType: 'jsonp',
		type: 'post',
		headers: {
			'Api-User-Agent': 'Example/1.0'
		},
		success: function(data) {
			$('.searchDetails').empty();
			addData(data);
		}
	});
};

addData = function (data) {
	var dataArr = data.query.search,
			i, title, snippet, div, url;
	
	for (i in dataArr) {
		title = dataArr[i].title;
		snippet = dataArr[i].snippet;
		url = 'https://en.wikipedia.org/wiki/' + title;
		div = "<div class='detail'><a target='_blank' href='" + url + "'><h3>" + title +
					"</h3><p>" + snippet + "</p></a></div>";
		
		$('.searchDetails').append(div);
	}
};

$(document).ready(function(){
	$('.search').keyup(function(){
		search();
	});
});
