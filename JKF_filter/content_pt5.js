// 內插腳本: 各別頁面, 也就是 els_pt.length == 5

function aa() {
	console.log('aa');
}


// 在各別頁面的動作由此控制
const Process_pt5 = new(function() {
	this.start = function() {
		console.log('1111111');
		aa();
		console.log(idList);
	}
})();