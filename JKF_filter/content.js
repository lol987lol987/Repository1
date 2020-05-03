// 使用者清單
var idList = [];

activeWhenReadHTML();

// 開始content script運作 
async function activeWhenReadHTML() {
	
	console.log("開始content script運作 00019");

	try {
		// 取得論壇提供的業面路徑, 錯誤則回傳''
		var els_pt = await JKFElementUtil.getPath_pt();

		// 由 chrome.storage.local 取得id list
		idList = await ChromeStorageUtil.getIdList(); 

		console.log(idList);

		if (els_pt.length == 4 && els_pt[3].innerText == '按摩/指油壓/理容') {
			console.log("內插腳本: 主要版面");
			Process_pt4 .start();
			

		} else if (els_pt.length == 5 && els_pt[3].innerText == '按摩/指油壓/理容') {
			console.log("內插腳本: 各別頁面");
			Process_pt5 .start();
		} else {
			// do nothing
			console.log("非目標位置");
		}
	} catch (e) {
		console.log(e);
	}
}


