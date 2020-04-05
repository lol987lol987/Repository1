console.log("內插腳本載入");

chrome.storage.local.get(['idList'], setIdList);

var idList = [];
var rr;

// 由popup -> popup綁定的js -> this  顯示目前idList
const onMessage = (message) => {
	console.log('顯示目前idList');

	saveList(idList); // 儲存到storage.local

	alert(idList);


}

chrome.runtime.onMessage.addListener(onMessage);


function setIdList(result) { // 讀入idList	
	//idList = rr.split("\r\n");
	idList = result['idList'];
	console.log(idList);

	getRows();
	getRows_commonThread();
}



function getRows() {
	console.log("抓欄位");

	//置頂資訊
	var topthreads = document.getElementsByClassName("topthreads");
	console.log(topthreads.length);

	for (let i = 0; i < topthreads.length; i++) {
		var topthread = topthreads.item(i);

		// 取出作者id
		var el_author = getAuthorFromTopthread(topthread);


		var newTd = document.createElement("td");
		var newSelectionBox = document.createElement("select");
		//console.log(idList);

		//建立下拉式選單
		var option = document.createElement("option");
		option.innerHTML = "--";
		newSelectionBox.appendChild(option);
		for (let j = 0; j < idList.length; j++) {
			var option = document.createElement("option");

			// 作者上色
			if (idList[j][2].includes(el_author.innerText)) {
				//console.log(idList[j]);
				el_author.style.color = idList[j][1] + '';
				option.setAttribute("selected", "selected")
			}

			option.innerHTML = idList[j][0];
			newSelectionBox.appendChild(option);

		}
		newSelectionBox.setAttribute('class', 'selectBox1');
		newSelectionBox.addEventListener('change', onSelectChanged_Top)
		newTd.appendChild(newSelectionBox);
		topthread.appendChild(newTd);

	}


}

function getRows_commonThread() {
	console.log("抓欄位common_timubiao");


	var commonThreads = document.getElementsByClassName('common timubiao');
	console.log(commonThreads.length);

	for (let i = 0; i < commonThreads.length; i++) {
		// 取出commonThread
		var commonThread = commonThreads[i].parentElement;
		// 取出作者id
		var el_author = getAuthorFromTopthread_Common(commonThread);		


		var newTd = document.createElement("td");
		var newSelectionBox = document.createElement("select");
		//console.log(idList);

		//建立下拉式選單
		var option = document.createElement("option");
		option.innerHTML = "--";
		newSelectionBox.appendChild(option);
		for (let j = 0; j < idList.length; j++) {
			var option = document.createElement("option");

			// 作者上色
			if (idList[j][2].includes(el_author.innerText)) {
				//console.log(idList[j]);
				el_author.style.color = idList[j][1] + '';
				option.setAttribute("selected", "selected")
			}

			option.innerHTML = idList[j][0];
			newSelectionBox.appendChild(option);

		}
		newSelectionBox.setAttribute('class', 'selectBox1');
		newSelectionBox.addEventListener('change', onSelectChanged_Common)
		newTd.appendChild(newSelectionBox);
		commonThread.appendChild(newTd);


	}
}


// 下拉式選單事件
function onSelectChanged_Top(event) {
	//console.log(event);	
	var topthread = event['path'][2];
	//console.log(topthread);

	var el_author = getAuthorFromTopthread(topthread);
	var selectBox = topthread.getElementsByClassName("selectBox1")[0];

	if ("--" == selectBox.value) {
		el_author.style.color = 'black';
	}

	for (let j = 0; j < idList.length; j++) {
		if (idList[j][0] == selectBox.value) {
			//console.log(idList[j]);
			//el_author.innerText
			el_author.style.color = idList[j][1] + '';
			idList[j][2].push(el_author.innerText);

		} else {
			removeFromArray(idList[j][2], el_author.innerText);
		}
	}

	saveList(idList); // 儲存到storage.local
}

// 下拉式選單事件 common
function onSelectChanged_Common(event) {
	console.log(event);	
	var commonThread = event['path'][2];
	//console.log(topthread);

	var el_author = getAuthorFromTopthread_Common(commonThread);
	
	var selectBox = commonThread.getElementsByClassName("selectBox1")[0];

	if ("--" == selectBox.value) {
		el_author.style.color = 'black';
	}

	for (let j = 0; j < idList.length; j++) {
		if (idList[j][0] == selectBox.value) {
			//console.log(idList[j]);
			//el_author.innerText
			el_author.style.color = idList[j][1] + '';
			idList[j][2].push(el_author.innerText);

		} else {
			removeFromArray(idList[j][2], el_author.innerText);
		}
	}

	saveList(idList); // 儲存到storage.local
}