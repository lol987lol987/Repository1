# some filter

某論壇過濾器<br>

目前架構:<br>
配置檔: <br>
* manifest.json 必要配置檔,詳情參閱google extension文件 <br>

background: 啟動時先跑 <br>
* bg.js 讀取txt,存入存檔 <br>

content_scripts: 即時操作網頁元件,在特定網域下才動作 <br>
* content.js 目前主入口,dispatch <br>
* content_pt4.js 主要頁面 <br>
* content_pt5.js 各別頁面 <br>
* myWebUtil.js 目前用到的工具 <br>

browser_action: 按下icon事件 <br>
* popup.html <br>
* popup.js <br>

目前方向:<br>


1. 整理code 以符合適合專案合作的模式 --> 進行中  
   * a. 增加註解與有意義的說明文件 <br>
   * b. 清理無意義的code跟註解  <br>
   * c. 特殊的function class化  <br>
   ** c1. 或許建立select box可以function化 <br>  
   * d. 調整流程  <br>

2. popup的顯示優化<br>
   * a. popup.html美化 --> 尚未開始 <br>
   * b. 顯示正確的換行 --> 大部分完成,但最後一行複製貼上txt時要記得補一個換行符號 <br>

3. 論壇各別業面也能顯示選取過濾器的功能 --> 進行中 <br>
   * a. 根據id的select box --> 完成 <br>
   * b. 新的清單6. --> 尚未開始 <br>

4. 效能<br>
   * a. 只在正確的頁面跑content --> 完成
   
5. 調整主頁面的html table元件的寬度,避免新增的元件被遮住  --> 尚未開始 <br>

6. 廣告推文id清單,即那些在各個雷下面推好評的免洗帳號 --> 尚未開始 <br>
   * a. 建立清單io,storage  <br>
   * b. select box <br>
   * c. 各別頁面的推文id統計,顯示 <br>

