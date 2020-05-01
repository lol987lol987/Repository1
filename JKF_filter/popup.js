/*
var getSelectedTab = (tab) => {
	var tabId = tab.id;
	var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
	
	
	sendMessage({action: 'ROTATE'});
	
	document.getElementById('rotate').addEventListener('click', () => sendMessage({
		action: 'ROTATE'
	}));
	document.getElementById('reset').addEventListener('click', () => sendMessage({
		action: 'RESET'
	}))
	
}
*/

//chrome.tabs.getSelected(null, getSelectedTab);
//pri('12345');

var dButtonEvent = document.getElementById("button1");

dButtonEvent.addEventListener('click', function(ce) {
	//dButtonEvent.innerText ='!??';
	//op.innerHTML = '12345';
	//document.getElementById("output").innerHTML = 'failed';


	// 從擴充套件向 contentScript 發送訊息
	// tabs.sendMessage(<tabId>, <message>, callback<response>)
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			greeting: 'get_idList'
		}, function(response) {
			console.log(response.farewell);
			var res = response.farewell;
			// 還原成txt需要的格式 方便使用者直接複製貼上 
			var op = '';
			for (let i = 0; i < res.length; i = i + 1) {
				op = op + res[i][0] + ',' + res[i][1] + ',' + '<br>' + res[i][2] + '<br>';
			}
			document.getElementById("output").innerHTML = op;
		});
	});

});



/*
chrome.tabs.executeScript( {
    code: "window.getSelection().toString();" //選擇被圈選的文字
}, function(selection) {
	//pri('12345');
	//chrome.storage.local.get(['idList'], setIdList);

    document.getElementById("output").innerHTML = selection[0];
});
*/