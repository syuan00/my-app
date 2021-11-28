# PageBox IT5007 Final Proj

## 进度汇报

- hy
    - 11.25 17：00 目前只做了前后端分离，后端的内容和graphql以及数据库初始化都还没写，里面由内容都是从tut5移植过来的，可进行修改

    - 11.26 00：06 
        - 添加了addlink的功能，目前只是添加url到后端,添加以后home可以显示新增的内容，后端通过graphql可以查询到信息。但是显示在home部分关于该页面的title summary等内容可能需要进行页面抓取，这部分没做，当前用占位符代替
        - 初始化了schema.graphql。定义了一些数据结构和功能
        - App.js获取initialEntries已经修改成从后端获取，运行之前记得运行数据库初始化代码，来加载初始数据
            - To hx： initialEntries 接口仍然放在代码中了，发现你写的一部分内容是直接获取的initialEntries[i]，可能需要你改一下你引用该部分的代码
        - 添加了部分注释，简略
    
    - 11.28 凌晨
        - init.mongo.js改为4条，新增2条我的user_id
        - 后端代码拆开
        - 修改了schema.graphql、issue.js

    - 11.29 03:00
        - 以教材11章末时的代码为模板，模块化前端代码
        - Google登陆：user_id是Page的state，作为props传给调用的函数；同时Page中定义了setCurUser函数用于setState，其作为参数传给NavBar，NavBar相应谷歌登录时可以调用该函数改变use_id的值
        - 实现Edit界面

## Component Hierachy
- index.js -> App.js -> Page.js
    - NavBar
        - IssueAddNavItem [TODO: url解析功能]
    - Contents
        - IssueList [TODO: 把Homelogic搬进去\*\*\*]
            - IssueFilter
            - IssueTable
            - ...
        - IssueEdit [TODO: 打算用html的隐藏实现三种阅读编辑模式切换，类似Tut2，把#free slots隐藏以及Homepage和Waitlist之间的切换]
        - IssueReport [可以删除，先放着]
    - Footer

\* 除了IssueList以及其所调用的代码\*\*，其他代码都已仿照教材11章末时的代码。

\*\* 指没有仔细检查，参考代码版本可能是9-11章之间的，因为跑不通时会退一下版本。

\*\*\* 侧边栏可以参考IssueFilter，IssuePanel取代IssueTable，其中的按钮、链接可能可以参考IssueRow中的“Edit”和“Select”。

## Environment required :
- mongodb [skip this if you have had mongodb installed]
Cancel changes
    ```
    apt install gnupg
    apt install curl

    curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -

    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list 
    apt update
    apt install mongodb-org
    apt install screen
    screen mongod
    ```

    - If mongod screen exits instantly, then you have a problem. Do the following: mkdir -p /data/db, redo the screen mongod and press Ctrl+a followed by d to return to terminal. You are ready to run mongo CLI using $mongo.

## Commands for running  PageBox

- install dependencies for client[ in "client" folder ]

    ```
    cd client 
    npm install
    ```

- install dependencies for client[ in "cli" folder ]

    ```
    cd ../cli 
    npm install
    ln -s ../node_modules/bootstrap/dist public/bootstrap
    ```

- install dependencies for server[in "server" folder]

    ```
    cd ../server
    npm install 
    ```

- start the mongodb and init the databases [in "server" folder]

    ```
    screen mongod
    mongo issuetracker scripts/init.mongo.js
    ```

    - Press Ctrl+a followed by d to return to terminal

- run the program [in "server" folder]
    Homelogic的界面
    ```
    npm run dev-client
    ```
    Home是表格，edit能用的界面
    ```
    npm run dev-cli
    ```
    这两者后端代码是一样的。

## Port Allocation

- server: `localhost:5000`

    - you can also type `localhost:5000/graphql` in your browser to test with the database.

- client: `localhost:3000`

- open `localhost:3000` in your browser and you can play with the app



