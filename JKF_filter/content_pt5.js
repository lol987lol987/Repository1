// 內插腳本: 各別頁面, 也就是 els_pt.length == 5

// 在各別頁面的動作由此控制
const Process_pt5 = new(function() {
	this.start = function() {
		console.log('1111111');
		addBox();
	};


})();


function addBox() {
	let el_id = document.getElementsByClassName('name xi2')[0];
	let el_rightSideOfId = document.getElementsByClassName('u-add link0 cl')[0];
	let el_ParentOfId = document.getElementsByClassName('post-hd')[0];

	console.log(el_id.title);

	//建立下拉式選單
	var newSelectionBox = document.createElement("select");
	var option = document.createElement("option");
	option.innerHTML = "--";
	newSelectionBox.appendChild(option);
	for (let j = 0; j < idList.length; j++) {
		var option = document.createElement("option");

		// 作者上色
		if (idList[j][2].includes(el_id.title)) {
			//console.log(idList[j]);
			el_id.style.color = idList[j][1] + '';
			option.setAttribute("selected", "selected")
		}

		option.innerHTML = idList[j][0];
		newSelectionBox.appendChild(option);

	}
	newSelectionBox.setAttribute('class', 'selectBox1');
	newSelectionBox.addEventListener('change', onSelectChanged_pt5)

	el_ParentOfId.insertBefore(newSelectionBox, el_rightSideOfId);


}


// 置頂的下拉式選單事件
function onSelectChanged_pt5(event) {
	console.log(event);

	var el_author = event['path'][1].getElementsByClassName('name xi2')[0];
	var selectBox = event['path'][0];

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