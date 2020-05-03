// 內插腳本: 主要版面, 也就是 els_pt.length == 4


// 在主要版面的動作由此控制
const Process_pt4 = new(function() {
	this.start = function() {
		try {
			dealRowsById_TopThread();
			dealRowsById_CommonThread();
		} catch (e) {
			console.log(e);
		}
	}
})();



// 置頂的row 取出發文者id處理,變色與添加SelectionBox
function dealRowsById_TopThread() {
	console.log("抓欄位 置頂");

	//置頂資訊
	var topthreads = document.getElementsByClassName("topthreads");
	console.log(topthreads.length);

	for (let i = 0; i < topthreads.length; i++) {
		var topthread = topthreads.item(i);

		// 取出作者id
		var el_author = JKFElementUtil.getAuthorFromTopthread(topthread);


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

// 非置頂的row 取出發文者id處理
function dealRowsById_CommonThread() {
	console.log("抓欄位common_timubiao");


	var commonThreads = document.getElementsByClassName('common timubiao');
	console.log(commonThreads.length);

	for (let i = 0; i < commonThreads.length; i++) {
		// 取出commonThread
		var commonThread = commonThreads[i].parentElement;
		// 取出作者id
		var el_author = JKFElementUtil.getAuthorFromTopthread_Common(commonThread);


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


// 置頂的下拉式選單事件
function onSelectChanged_Top(event) {
	//console.log(event);	
	var topthread = event['path'][2];

	var el_author = JKFElementUtil.getAuthorFromTopthread(topthread);
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

	ChromeStorageUtil.saveList(idList); // 儲存到storage.local
}

// 非置頂的下拉式選單事件 common
function onSelectChanged_Common(event) {
	var commonThread = event['path'][2];

	var el_author = JKFElementUtil.getAuthorFromTopthread_Common(commonThread);

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

	ChromeStorageUtil.saveList(idList); // 儲存到storage.local
}