# project-1---vulnerabilities-equipa_20

db.js is where all our queries are executed for each database operation (login, registerUser, getBooks, getBookByName, getUser, etc..).

If your client app has a different URL of http://localhost:2000, in the server.js you need to add it to the white list of cors.


Bookstore app to better understand cybersecurity\
Tested in Ubuntu

-Made by\
Gonçalo Maranhão\
Filipe Posio\
Pedro Carneiro\
Inês Águia

-Requirements\
nodejs - sudo apt install nodejs\
npm - sudo apt install npm\
npm express, multer, mysql, cors - npm install express multer mysql cors

-How to use\
Insecure version:\
navigate to app folder\
run npm init -y\
run npm i express multer mysql cors\
run mysql_db_script.sql in a mySQL local instance\
configure file db_connection_config.json with your local access to database (for testing purposes configure root/sa user)
run node server.js\
go to a web browser and input localhost:2000 in url

Secure version:\
same as insecure but navigate to app_sec folder





