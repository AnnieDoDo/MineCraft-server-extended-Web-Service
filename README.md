# MineCraft-server-extended-Web-Service

自己架一個Minecraft server後，套了一些別人寫好的plugin
想要用自己架一個網站去擴充服務

目前規劃主要有3個功能：

１．登入（此部份已完成）

  套用loginsecurity這個plugin，
  使得進去遊戲後需要先輸入密碼才能開始玩
  （原本Minecraft只要有遊戲名字就能進去）
  由於Minecraft與其套件是用JAVA寫的，
  因此需要去loginsecurity作者的github trace code，
  才能確定網站該怎麼寫
  
  我用node.js 套用express.js，
  再用Sequelize來操作loginsecurity的資料庫
  登入後會用redis存session去確保權限
  網站的其他功能（市場及地圖）需要登入才能使用
  
 2.市場功能（此部份開發中）
 
  套用商店以及金流的plugin，
  讓玩家能在Minecraft裡能買賣商品
  規劃能在網站中提供查詢商店物品的服務
  讓玩家能在網站中search自己想要的物品能在哪個商店買到
  
 3.地圖功能（此部份已完成）
 
  套用有地圖功能的plugin，
  讓玩家能看到地圖中目前有誰
  並且能知道自己目前所在的位置
  
  
