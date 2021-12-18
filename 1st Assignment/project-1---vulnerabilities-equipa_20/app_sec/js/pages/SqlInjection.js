import AbstractPage from "./AbstractPage.js";
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
        `;
    }

    async validate() {
        return `
        <h1> This is the code from Sql Injection validate </h1>
        `;
    }

    async getJS(){
        document.getElementById("loginBtn").onclick = login;
        
        function login() {
            var user = document.getElementById("user").value;
            var password = document.getElementById("password").value;
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    var response = JSON.parse(xhttp.response);
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
    }

    

}