$(document).ready(function(){
	var player = '', // -1
		comp = '', // 1
		gameNum = 0,
		idBroad = [['#top-left','#top-middle','#top-right'],['#center-left','#center-middle','#center-right'],['#bottom-left','#bottom-middle','#bottom-right']],
		broad = [[0,0,0,],[0,0,0,],[0,0,0,]],
		allSquare = idBroad.join(", "),
		draw, playerTurn, compTurn, outFreeAndAddBroad,
		checkWin, over, init, outAllSquare,
		
	
			evalute, minimax;
			
	evalute = function (arr) {
			var Arr = [[0,0,0,],[0,0,0,],[0,0,0,]], count = 0;
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].length; j++){
					Arr[i][j] = arr[i][j];
				}
			}
			if (checkWin(0) === 1) {
				return 100;
			} else if (checkWin(0) === -1) {
				return -100;
			}
			// comp
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].length; j++){
					if (arr[i][j] === 0) {
						Arr[i][j] = 1;
					}
				}
			}
			for (i = 0; i < 3; i++) {
				count += parseInt((Arr[i][0] + Arr[i][1] + Arr[i][2])/3);
			}
			for (i = 0; i < 3; i++) {
				count += parseInt((Arr[0][i] + Arr[1][i] + Arr[2][i])/3);
			}
			count += parseInt((Arr[0][0] + Arr[1][1] + Arr[2][2])/3);
			count += parseInt((Arr[0][2] + Arr[1][1] + Arr[2][0])/3);
			
			// player
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].length; j++){
					if (arr[i][j] === 0) {
						Arr[i][j] = -1;
					}
				}
			}
			for (i = 0; i < 3; i++) {
				count += parseInt((Arr[i][0] + Arr[i][1] + Arr[i][2])/3);
			}
			for (i = 0; i < 3; i++) {
				count += parseInt((Arr[0][i] + Arr[1][i] + Arr[2][i])/3);
			}
			count += parseInt((Arr[0][0] + Arr[1][1] + Arr[2][2])/3);
			count += parseInt((Arr[0][2] + Arr[1][1] + Arr[2][0])/3);
			console.log(count);
			return count;
		};
		
	minimax = function () {
		var getList,count, bestMove;
		//console.log('?--'+broad.toString());
		getList = function () {
			var count = 0, list = [];
			for (var i = 0;i < broad.length; i++) {
				for (var j = 0; j < broad[i].length; j++) {
					if (broad[i][j] === 0) {
						list[count++] = [i,j];
					}
				}
			}
			return list;
		};
		var list1 = getList(), Best = -10000;
		for (var i = 0; i < list1.length; i++) {
			broad[list1[i][0]][list1[i][1]] = 1;
			
			var list2 = getList(), bestValue = 10000;
			for (var j = 0; j < list2.length; j++) {
				console.log(list1[i]+'-'+list2[j]);
				broad[list2[j][0]][list2[j][1]] = -1;
				var value = evalute(broad);
				if (value < bestValue) {
					bestValue = value;
					//console.log(bestValue);
				}
				broad[list2[j][0]][list2[j][1]] = 0;
			}
			if (bestValue > Best) {
				
				Best = bestValue;
				bestMove = list1[i];
			}
			broad[list1[i][0]][list1[i][1]] = 0;
		}
		//console.log('!--'+broad.toString());
		return bestMove;
	};
	
	outAllSquare = function (remove) {
		var arr = allSquare.split(", ");
		for (var i in arr) {
			if (arr[i] === remove) {
				arr.splice(i,1);
			}
		}
		var str = arr.join(", ");
		return str;
	};
	
	init = function () {
		gameNum = 0;
		allSquare = idBroad.join(", ");
		broad = [[0,0,0,],[0,0,0,],[0,0,0,]];
		$(allSquare).find('span').remove();
		if (player === 'X') {
			playerTurn();
		} else {
			compTurn();
		}
	};
	
	playerTurn = function () {
		gameNum++;
		$(allSquare).click(function () {
			var id = '#' + $(this).attr('id'),
				value = $(this).attr('value');
			$(allSquare).off('click');
			allSquare = outAllSquare(id);
			draw(player, id);
			addBroad(value);
			
			var checkwin = checkWin(1);
			if (checkwin) {
				over(checkwin);
			} else {
				compTurn();
			}
		});
	};
	
	compTurn = function () {
		gameNum++;
		var bestMove = minimax();
		draw(comp,idBroad[bestMove[0]][bestMove[1]]);
		broad[bestMove[0]][bestMove[1]] = 1;
		var checkwin = checkWin(1);
		if (checkwin) {
			over(checkwin);
		} else {
			playerTurn();
		}
	};
		
	draw = function (str,posId) {
		var div = '<span>' + str + '</span>';
		$(posId).append(div);
	};
	
	addBroad = function (pos) {
		var i = pos.split('-')[0],
			j = pos.split('-')[1];
			broad[i][j] = -1;
	};
	
	checkWin = function (flag) {
		var flag = flag,
			flash = function (id) {
			var count = 0,
				func = function () {
					setTimeout(function(){
						$(id).toggle();
						count++;
						if (count === 6) {
							func = false;
						} else {
							func();
						}
					}, 300);
				};
				
			func();
			
		};
		if (broad[0][0] === broad[0][1] && broad[0][1] === broad[0][2] && broad[0][0] !== 0) {
			if (flag) {
				flash('.top');
			}
			return broad[0][0];
		} else if (broad[1][0] === broad[1][1] && broad[1][1] === broad[1][2] && broad[1][0] !== 0) {
			if (flag) {
				flash('.center');
			}
			return broad[1][0];
		} else if (broad[2][0] === broad[2][1] && broad[2][1] === broad[2][2] && broad[2][0] !== 0) {
			if (flag) {
				flash('.bottom');
			}
			return broad[2][0];
		} else if (broad[0][0] === broad[1][0] && broad[1][0] === broad[2][0] && broad[0][0] !== 0) {
			if (flag) {
				flash('.left');
			}
			return broad[0][0];
		} else if (broad[0][1] === broad[1][1] && broad[1][1] === broad[2][1] && broad[0][1] !== 0) {
			if (flag) {
				flash('.middle');
			}
			return broad[0][1];
		} else if (broad[0][2] === broad[1][2] && broad[1][2] === broad[2][2] && broad[0][2] !== 0) {
			if (flag) {
				flash('.right');
			}
			return broad[0][2];
		} else if (broad[0][0] === broad[1][1] && broad[1][1] === broad[2][2] && broad[0][0] !== 0) {
			if (flag) {
				flash('.diagonal1');
			}
			return broad[0][0];
		} else if (broad[0][2] === broad[1][1] && broad[1][1] === broad[2][0] && broad[0][2] !== 0) {
			if (flag) {
				flash('.diagonal2');
			}
			return broad[0][2];
		}
		if (gameNum === 9) {
			return 2
		}
		return 0;
	};
	
	over = function (checkwin) {
		if (checkwin === 1) {
			console.log('You Lose!');
		} else if (checkwin === -1) {
			console.log('You Win!');
		} else if (checkwin === 2) {
			console.log('Tie!');
		}
		setTimeout(function(){
			init()
		}, 3000);
	};
	
	$('#leftButton').click(function(){
		$('.container').css('display','block');
		$('.main').css('display','none');
		player = 'X';
		comp = 'O';
		$('#leftButton').off('click');
		init();
	});
	
	$('#rightButton').click(function(){
		$('.container').css('display','block');
		$('.main').css('display','none');
		player = 'O';
		comp = 'X';
		$('#rightButton').off('click');
		init();
	});
});
