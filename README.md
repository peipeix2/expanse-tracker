# 廣志的家庭記帳本

使用者能根據日期、支出類別，輕鬆的紀錄日常開支，獲得專屬記帳本，並追蹤不同類別的支出情況。

## 功能

1. 使用者註冊後，透過“新增支出”功能，紀錄日常大小支出
2. 內建5大類別，幫助使用者追蹤支出情況
3. 點擊右上角”家庭記帳本“，回到首頁

## 開發工具

1. Node.js
2. Express 4.17.1
3. Express Handlebars 4.0.2
4. MongoDB
5. Mongoose 5.9.7
6. dotenv 16.3.1
7. nodemon 6.14.11
8. bcrypt 2.4.3
9. connect-flash 0.1.1
10. express-session 1.17.1
11. method-override 3.0.0
12. passport 0.4.1
13. passport-local 1.0.0

## 開始使用

1. 確認電腦中安裝開發工具，以及npm和nodemon
2. 將專案clone到本地
3. 在本地，進入專案資料夾，輸入

```jsx
npm install
```

4. 確認下載開發工具及所需套件
5. 在專案內新建.env檔案，並輸入MongoDB連線資訊

```jsx
MONGODB_URI = mongodb+srv://<Your account>:<Your password><server location>/<database name>?retryWrites=true&w=majority
```

6. 在終端機輸入以下，建立種子資料

```jsx
npm run seed
```

7. 在終端機輸入以下，啟動程式

```jsx
npm run dev
```

8. 當終端機出現以下字樣，伺服器啟動，連線成功

```jsx
App is running on http://localhost:3000
mongodb connected!
```

9. 在瀏覽器輸入以下網址，連線到首頁

```jsx
http://localhost:3000
```
