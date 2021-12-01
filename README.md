# PageBox IT5007 Final Proj
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
## Attention

- port 3000 and port 5000 are used, open them before you test

- You must Login first before you addlink, otherwise you will get a warning

- You must have the mongodb preinstalled

- When you try with pagenote, you are recommended to use our sample input(show in the following), since we load a html in our page dynamically, some webpage will reject our request and you will not see the perfect result. You can try your own link, but not every one is successful.



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

## Sample Input

- we provide some samples for you to play with

- You should login with your google account, otherwise you can not add new link.

- press the "plus" button  at the right of the navigation bar and enter the first pageInfo as follow.

    ```
    link: https://getbootstrap.com/docs/4.0/components/buttons/
    title: Buttons
    summary: Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.
    ```

- Press home at sidebar. You will the see the page has been added to the category "home"

- then add another link. The following is its info.
    ```
    link: https://tworedbowls.com/2013/06/17/spicy-ahi-poke/
    title: hy_Spicy Ahi Poke Salad
    summary: hy_Explore Allrecipes Allrecipes Allrecipes Find a Recipe Explore The Foolproof Way to Cook Bacon in the Microwave The Foolproof Way to Cook Bacon in the Microwave
    ```

- If you want to change the summary and title you made before, click the pencil-like button of the panel and you can make your change

- If you want to make some notes to the page you added, you can click the "open" link on the panel. for example, you can add the following note to the `hy_Spicy Ahi Poke Salad` page, click the "open", and on the right text input, paste the following: 

    ```
        Ingredient
        1 pound ahi tuna, cut into 1/2-inch cubes
        ¼ cup minced green onion
        2 tablespoons ground roasted macadamia nuts
        2 tablespoons chopped fresh cilantro, or more to taste
        1 tablespoon fresh lime juice
        2 teaspoons sesame oil, or more to taste
        1 teaspoon minced fresh ginger
        1 teaspoon red pepper flakes
        1 teaspoon sriracha sauce, or to taste
        
        Steps
        1. Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; 
        2. Refrigerate for 2 hours.
    ```

