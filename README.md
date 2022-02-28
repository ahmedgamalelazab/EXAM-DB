# project Build commands : 
- # how two release the beast ? 😂
    - system config :
        1. make sure your system has mssql... because this application build upon mssql data base
        2. make sure ur database connection allow tcp .
        3. create a user using `WIZARD` or whatever but make sure that the userName and password = `root` .
        4. create Database call it `ExamDB`
    - what next ? 😂 follow me ! :
        1. download the app or clone it .
        2. in the same folder open vscode using this command `code .`
        3. make sure that u are in Exam-DB folder .
        4. use this command `cd server ` very important .
        5. run npm scripts `npm install`
        6. after downloading the application dependencies you are done from project setup steps .
    - still lost ? yeah i know ! me too 😂
    - next is very simple steps .. follow it carefully : 
        1. commands to build and seed the database `database automation` : 
            - `npx knex migrate:up`
            - `npx knex seed:run`
        2. if u wanna add new feature or something make sure to call this commands : 
            - `npx knex migrate:down`
            - `add what u like `
            - `adding tables cost u modify the migration file .. remember to drop first children then parent tables`
        3. if u followed the steps above u know owns a copy of database working fine . 
        4. now lets run this command : 
            - `npm run dev` it will run the server .. but the server won't launch and u will get a bunch of errors why ? 
                - u need to have `config.env` and `include` it in ur project then add some `secrets` of ur own and `ports` and etc .. extra details to have special tokens and protected roles on the server .. `why i didn't upload it ?` because i must not do it .. `it's a bad practice of deploy` .. but it u are our master then i can share the file with u and the server after it will run immediately .
        5. if the server runs well , u will be ok to run the client and test whatever u want . 
# Out of our scope : 
- we supported only those features : 
    1. `Authentication and Authorization` :
        - our app register users following a hierarchy of rules . 
        - each user can login and get different screen .
    2. `Admin` : 
        - simply he can do what ever he likes using his token .. but in my application i restricted his rules a little bit .
    3. `Instructor`:
        - simply he can do whatever he likes with students but `only and only his students` . 
    4. `Students` :
        - they can login and go try `Practical exam`
        - result not take more than 5 seconds to show up . 
        - if he has problem with his result he can check his answers using `Student Answer Exam history Report` and he will get all what he or she has done in the exam . 
        - he can follow up his progression in each exam . `track using Exam history table`
    # `Any` thing else `not` mentioned `above` ? `out of our scope` .. sorry for that . 
    # `Plans ?` Oh yeah we have .. we wanna make the `instructor` able to `publish` to his `students` exams and run a timer on a `SOCKET.IO`
- ## why not all what u expect not included ? 
    1. we were running out of time . 
    2. `huge pressure` , `loads` and etc .. from `ITI` .
    3. we were working on `2` projects and still remains one more . 
    4. we are in middle of framework season in `ITI` .
    5. `Angular` hide on push 😂
# Project ( dev names and rules )   📢 `US` : 
- `Eng ahmed gamal` .. `full stack`
![gamal](https://github.com/ahmedgamalelazab)
- `Eng Reem Khalil` .. `Backend`
![reem](https://github.com/Reem395)
- `Eng Yasser Abdelhady` .. `Backend`
![yasser](https://github.com/Yasser-Abd-El-Hady)
- `Eng Ahmed Esmail` .. `frontend`
- `Eng Abrar` .. `frontend`

# App `documentation` soon : 

- soon .. 


# Time for Demo :
![this is demo](./demo/demo.gif)
