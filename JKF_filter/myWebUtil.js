// 取出標題
function getTitle(topthread) {
	var title = topthread.getElementsByClassName('s xst').item(0).innerText;

	return title;
}

// 取出作者id Common
function getAuthorFromTopthread_Common(commonThread) {
	var els_a = commonThread.getElementsByTagName('a');
	var el_author = '';
	if (els_a.length == 7) {
		var el_author = commonThread.getElementsByTagName('a')[4];
	} else if (els_a.length == 8) {
		var el_author = commonThread.getElementsByTagName('a')[5];
	}
	return el_author;
}

// 取出作者id TOP
function getAuthorFromTopthread(topthread) {
	var els_a = topthread.getElementsByTagName('a');
	var el_author = '';
	if (els_a.length == 6) {
		el_author = topthread.getElementsByTagName('a').item(3);
	} else if (els_a.length == 5) { // 無縮圖的時候 <a>的數量不一樣多
		el_author = topthread.getElementsByTagName('a').item(2);
	}
	return el_author;
}

// 取出上個回應者
function getLastResponserFromTopthread(topthread) {
	var els_a = topthread.getElementsByTagName('a');
	var el_author = '';
	var el_lastResponser = '';
	if (els_a.length == 6) {
		el_lastResponsed = topthread.getElementsByTagName('a').item(4);
	} else if (els_a.length == 5) { // 無縮圖的時候 <a>的數量不一樣多
		el_lastResponser = topthread.getElementsByTagName('a').item(3);
	}
	return el_lastResponser;
}

function saveList(idList) {
	chrome.storage.local.set({
		'idList': idList
	}, function() {
		console.log('存入storage成功');
	});
}


function removeFromArray(array, value) {
	const index = array.indexOf(value);
	if (index > -1) {
		array.splice(index, 1);
	}
	return array;
}

function pri(str) {
	if (true) {
		console.log(str);
	}
}

var xTest= 'test';
function getTest() {
	return xTest;
}