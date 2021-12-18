import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(){
        super();
        this.setTitle("Basket");
    }

    async getHtml() {
        return `
        <h1>Shoping Basket</h1>

        <input id="showButton"type="button" value="Show Books">

        <form> 
        <table>
            <tr>
                <th>Book Name</th>
                <th id="boobk_author">Author</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            <tr>
                <td id="book_name">A Gentleman in Moscow</td>
                <td>Amor Tobles</td>
                <td id="book_price">19€</td>
                <td><input name="book_quantity" type="number" min="1"></input></td>
                <td><input id="checkoutButton"type="button" value="Proceed to Checkout"></td>
                </tr>
        </table>


       
        
        <p id="book_chosen"></p>
              
  
        </form>

        `;
    }

    async getJS() {

        document.getElementById("showButton").onclick = getTable

        

        //let inputPrice = document.getElementById("book_price")
        let Unitprice = 19
        let bookName = document.getElementById("book_name").value
        let bookQuantity = document.querySelector("[name=book_quantity]")
        
        document.getElementById("checkoutButton").onclick = getReceipt
    
        function getTable(){
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                    alert(xhttp.responseText);
                    var xmlDoc=JSON.parse(xhttp.response);
                    console.log(xmlDoc);
                    document.write("<table><tr><th>Book Name</th><th>Author</th></tr>");
                    
                    var records=xmlDoc;
                    for(var i=0; i<records.length; i++){
                        document.write("<tr><td>");
                        document.write(records[i].name);
                        document.write("</td><td>");
                        document.write(records[i].author);
                        document.write("</td></tr>");
                    }
                    document.write("</td></tr>");
                }
            }
            
            xhttp.open("GET", "http://localhost:2000/api/books");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send();
            
        }
    
        function getReceipt(){    
            window.prompt("BookStore Receipt \n \n"+ bookName+ " x"+bookQuantity.value + " ------------------- "+(Unitprice)+"€ \nActual Balance: ------------------- " + -(Unitprice * bookQuantity.value)+ "€ \n \n Add your card number")
        }
    
    }
        
}