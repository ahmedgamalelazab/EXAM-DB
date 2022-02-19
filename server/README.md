## BACK END TASK : 

* make stored procedure to serve the instructor and the students 
    - Implementation steps : 
        1. first the instructor is a user 
        2. second the student is a user 
        3. this `procedure` should serve with the `authentication` and `authorization`
        4. required operations on each proc : 
            - `send` user data from html form then the server communicate with the user database and pick the proper proc to talk with the database
            - `instructor` [REQUEST] procedure get the data from the front side and fill the user table and the instructor table if the email is not exist before || else [user-exists] send message to the front tell him that the user is exist and login instead 
            - `student` [REQUEST] procedure take the data from the front and fill the user table and the student table if not exists .. make sure that the instructor id is included within the request
            - `GET` [REQUEST] for any of the instructor or the student we should first authenticate who is asking for the data then we return back to the front side the data includes the instructor or the student data with the user data because the instructor and the student all are a users 
            - `DELETE` [REQUEST] we should scan first if the target who we need to delete is exist first or not if exist then we need to delete him from the instructor [TARGET] or the student [TARGET] then we delete from the user 
            `update` [REQUEST] update the target first [instructor-or-student] then we can update the user table if the update data includes any requires in the user for example if we wanna update the instructor phone number and his email address then we can update first his phone number then we can update the email address next from the user table 
        5. we need to make authentication and authorization middle ware injected with the procedures created above .. 
