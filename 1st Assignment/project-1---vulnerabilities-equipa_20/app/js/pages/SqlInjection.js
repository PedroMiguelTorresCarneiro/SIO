import AbstractPage from "./AbstractPage.js";
var debug = localStorage.getItem("debug");
export default class extends AbstractPage {
    userLogged = {};
    
    constructor() {
        super();
        this.setTitle("Sql Injection");        
    }
    
    
    

    async getHtml() {
        return `
        <h2>Login</h2>
        <div id="login">
            <label for="user">username:</label>
            <input type="text" id="user" name="user"><br><br>
            <label for="password">password:</label>
            <input type="password" id="password" name="password"><br><br>
            <input type="button" value="Submit" id="loginBtn" onclick="login()">
            <p id="loginMsg"></p>
        </div>
        <!--h2>User Data</h2>
        <input type="text" id="loggedUser" name="loggedUser"><br><br>
        <input type="button" value="Submit" id="userBtn">
        <p id="userData"></p>
        <h2>Search Book by name</h2>
        <div id="book">
            <label for="name">
            <input type="text" id="bookName" name="bookName"><br><br>
            <input type="button" value="Submit" id="searchBtn">

        </div-->
        `;
    }

    async validate() {
        return `
        <h1> This is the code from Sql Injection validate </h1>
        `;
    }

    async getJS(){
        document.getElementById("loginBtn").onclick = login;
        document.getElementById("userBtn").onclick = GetBookUser;
        
        function login() {
            var user = document.getElementById("user").value;
            var password = document.getElementById("password").value;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    var response = JSON.parse(xhttp.response);
                    if(debug === "true"){
                        alert(xhttp.responseText);
                        console.log(response);
                    }
                    document.getElementById("loginMsg").innerHTML = response.message;
                }
            }
            xhttp.open("POST", "http://localhost:2000/api/login",true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({
                "username":user,
                "password":password
                
            }));
    
        }
        
        

        function GetBooks() {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    alert(xhttp.responseText);
                }
            }
            xhttp.open("GET", "http://localhost:2000/api/books");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send();
        
        }

        function GetBookUser() {
            var username = document.getElementById("loggedUser").value;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    alert(xhttp.responseText);
                }
            }
            xhttp.open("GET", "http://localhost:2000/api/user?name="+username);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send();
        
        }
    }

    

}