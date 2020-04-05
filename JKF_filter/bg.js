console.log("bg");

//取得路徑裡的資料
var idCList = [];
var idList = [];
chrome.runtime.getPackageDirectoryEntry(function(root) {
	console.log(root);
	root.getFile("myIdList.txt", {}, function(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				console.log('讀取的內容:');
				//console.log(this["result"]);

				// 轉成 array	
				// [ 類別1 , 顏色 , [ id1 , id2 ] ] 
				// [ 類別2 , 顏色 , [ id1 , id2 ] ] 
				idCList = this["result"].split("\r\n");
				for (let i = 0; i < idCList.length; i = i + 2) {
					var categoryList = [idCList[i].split(",")[0], idCList[i].split(",")[1]];
					var sIdList = idCList[i + 1].split(",");
					categoryList.push(sIdList);

					idList.push(categoryList);
				}
				console.log(idList);
				//存入storage
				chrome.storage.local.set({
					'idList': idList
				}, function() {
					console.log('存入storage成功');
				});
			};
			reader.readAsText(file);
		}, errorHandler);
	}, errorHandler);
});



function errorHandler() {
	console.log('errorHandler');
}