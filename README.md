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

## Environment required :
- mongodb [skip this if you have had mongodb installed]

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

    ```
    npm run dev
    ```

## Port Allocation

- server: `localhost:5000`

    - you can also type `localhost:5000/graphql` in your browser to test with the database.

- client: `localhost:3000`

- open `localhost:3000` in your browser and you can play with the app



