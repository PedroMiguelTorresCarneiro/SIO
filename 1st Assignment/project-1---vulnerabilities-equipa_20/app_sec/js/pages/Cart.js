import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(){
        super();
        this.setTitle("Basket");
    }

    async getHtml() {
        return `
        <h1>Shoping Basket</h1>

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
        //let inputPrice = document.getElementById("book_price")
        let Unitprice = 19
        let bookName = document.getElementById("book_name").value
        let bookQuantity = document.querySelector("[name=book_quantity]")
        
        document.getElementById("checkoutButton").onclick = getReceipt
        
        
        
        function getReceipt(){   
            bookVerify() 
            
        }
        
        function bookVerify(){
            if (bookQuantity.value<1){
                window.alert("Please enter a positive quantity!! ")
            }else{
                window.prompt("BookStore Receipt \n \n"+ bookName+ " x"+bookQuantity.value + " ------------------- "+(Unitprice)+"€ \nActual Balance: ------------------- " + -(Unitprice * bookQuantity.value)+ "€ \n \n Add your card number")
            }
        }
        
    }
        
}