// 注意! util檔在manifest必須擺在content的前面,優先被讀取



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

var xTest = 'test';

function getTest() {
	return xTest;
}


// 在接收訊息的那端,需要設定 runtime.onMessage 的事件監聽器來處理此訊息，
// 不論是從 content script 或 extension page 的做法都一樣
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log(
		sender.tab ?
		'req from a content script:' + sender.tab.url :
		'req from the extension'
	);
	if (request.greeting == 'get_idList') {
		sendResponse({
			farewell: idList
		});
	}
});



// 取得JKF element工具,客製化程度高
var JKFElementUtil = new(function() {

	// 取出標題
	this.getTitle = function(topthread) {
		var title = topthread.getElementsByClassName('s xst').item(0).innerText;

		return title;
	};

	// 取出作者id TOP , 置頂
	this.getAuthorFromTopthread = function(topthread) {
		var els_a = topthread.getElementsByTagName('a');
		var el_author = '';
		if (els_a.length == 6) {
			el_author = topthread.getElementsByTagName('a').item(3);
		} else if (els_a.length == 5) { // 無縮圖的時候 <a>的數量不一樣多
			el_author = topthread.getElementsByTagName('a').item(2);
		}
		return el_author;
	}

	// 取出作者id , 非置頂 Common
	this.getAuthorFromTopthread_Common = function(commonThread) {
		var els_a = commonThread.getElementsByTagName('a');
		var el_author = '';
		if (els_a.length == 7) {
			var el_author = commonThread.getElementsByTagName('a')[4];
		} else if (els_a.length == 8) {
			var el_author = commonThread.getElementsByTagName('a')[5];
		}
		return el_author;
	}

	// 取出上個回應者
	this.getLastResponserFromTopthread = function(topthread) {
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

	// 取得論壇提供的業面路徑, 錯誤則回傳''
	this.getPath_pt = function() {
		return new Promise(resolve => {
			try {
				resolve(document.getElementById("pt").getElementsByTagName('a'));
			} catch (e) {
				console.log(e);
				resolve('');
			}
		});
	}

})();

// chrome.storage 相關的工具,例如儲存清單跟取出
const ChromeStorageUtil = new(function() {

	// 由 chrome.storage.local 取得id list, Promise
	this.getIdList = function() {
		return new Promise(resolve => {
			chrome.storage.local.get(['idList'], function(result) { // 讀入idList	
				resolve(result['idList']);
			});
		});
	};

	// 由 chrome.storage.local 儲存id list
	this.saveList = function(idList) {
		chrome.storage.local.set({
			'idList': idList
		}, function() {
			console.log('idList存入chrome.storage.local成功:');
		});
	};

})();