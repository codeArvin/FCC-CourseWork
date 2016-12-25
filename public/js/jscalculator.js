$(document).ready(function(){
	var ans = '',
		calcu = '',
		clear = true;
	$('button').click(function () {
		var text = $(this).attr('value'),
			screen = document.getElementsByClassName('screen')[0];
		if (parseInt(text,10) == text || text === '+' || text === '-' || text === '*' || text === '/' || text === '%' || text === '.') {
			if (clear === false) {
				calcu += text;
				screen.innerHTML = calcu;
			} else {
				calcu = text;
				screen.innerHTML = calcu;
				clear = false;
			}
		} else if (text === 'AC') {
			calcu = '';
			screen.innerHTML = calcu;
		} else if (text === 'CE') {
			calcu = calcu.slice(0,-1);
			screen.innerHTML = calcu;
		} else if (text === '=') {
			ans = eval(calcu);
			if (isNaN(parseInt(ans,10))) {
				return false;
			}
			screen.innerHTML = ans;
			clear = true;
		}
	});
});