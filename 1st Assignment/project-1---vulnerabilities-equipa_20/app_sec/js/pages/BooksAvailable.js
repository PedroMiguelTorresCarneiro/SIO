import AbstractPage from "./AbstractPage.js";
var debug = localStorage.getItem("debug");

export default class extends AbstractPage {
    constructor() {
        super();
        this.setTitle("BooksAvailable");
    }

    async getHtml() {
        return `
        <h1> Welcome to our BooksAvailable</h1>

        <h6> Available books</h6>
        <h6><p>A Gentleman in Moscow</h6></p>
        <h6><p>Song of Achiles</h6></p>
        <h6><p>The Human Zoo</h6></p>
        <h6><p>Sapiens</h6></p>

         
        <label for="name">
        <input type="text" id="bookName" name="bookName"><br><br>
        <input type="button" value="Submit" id="searchBtn">
        <div id="table">

        </div>
        
        `;
    }

    async getJS() {
        document.getElementById("searchBtn").onclick = GetBookByName;
        
        getTable();
        
        function getTable(){
            var table = document.getElementById("table");
            var html = "";
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    
                    var xmlDoc=JSON.parse(xhttp.response);
                    
                    html += "<table><tr><th>Book Name</th><th>Author</th><th>Date</th></tr>";
                    
                    var records=xmlDoc;
                    for(var i=0; i<records.length; i++){
                        var values = Object.values(records[i]);
                        html +="<tr><td>";
                        html +=values[0];
                        html +="</td><td>";
                        html +=values[1];
                        html +="</td><td>";
                        html += values[2];
                        html +="</td></tr>";
                    }
                    html +="</td></tr>";
                    table.innerHTML = html; 
                }
            }
            
            xhttp.open("GET", "http://localhost:2000/api/books");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send();
            
        }

        function GetBookByName() {
            var bookName = document.getElementById("bookName").value;
            const xhttp = new XMLHttpRequest();
            var html = "";
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    var xmlDoc=JSON.parse(xhttp.response);
                    
                    html += "<table><tr><th>Book Name</th><th>Author</th><th>Date</th></tr>";
                    
                    var records=xmlDoc;
                    for(var i=0; i<records.length; i++){
                        var values = Object.values(records[i]);
                        html +="<tr><td>";
                        html +=values[0];
                        html +="</td><td>";
                        html +=values[1];
                        html +="</td><td>";
                        html += values[2];
                        html +="</td></tr>";
                    }
                    html +="</td></tr>";
                    table.innerHTML = html; 
                }
            }
            xhttp.open("GET", "http://localhost:2000/api/book?name="+bookName);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send();
        
        }
    }

}