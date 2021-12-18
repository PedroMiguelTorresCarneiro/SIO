import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(){
        super();
        this.setTitle("User");
    }

    async getHtml() {
        return `
            <h2>User Profile Card</h2>

            <div class="card">
                <p id="name" >Tiago</p>
                <p id="age" >22 years</p>
                <p>Aveiro, Portugal</p>
                <p id="booksRead">50 books read</p>
                <p><a href="#" id="homepage">user homepage</a></p>
            <div>

            <h3>Update Info</h3>
            <form>
                <input name="nomecompleto" type="text" placeholder="Enter your name" required>
                <input name="datanascimento" type="date" >
                <input name="facebookpage" type="url" placeholder="Enter your homepage">
                <input id="doneButton" type="button" value="Update Info">
            </form>
        `;
    }

    async getJS() {
            //let form  = document.querySelector('form')
            let inputUrl = document.querySelector("[name='facebookpage']")
            let inputName = document.querySelector("[name='nomecompleto']")
            let inputDate = document.querySelector("[name='datanascimento']")

            document.getElementById("doneButton").onclick = refreshInfo

            function change_text(){
                document.getElementById("name").innerHTML = "Pedro Carneiro"
            }

            function refreshInfo(){
                updateAge()
                updateName()
                addHomepage()
            }

            function updateAge(){
                let now = new Date();
                let currentY= now.getFullYear();

                let inDate = inputDate.value;
                let userAge = new Date(inDate);
                let prevY= userAge.getFullYear();

                let ageY =currentY - prevY;

                document.getElementById('age').innerHTML = ageY + 'years';
            }

            function updateName(){
                document.getElementById('name').innerHTML = inputName.value
            }

            function addHomepage(){
                document.getElementById('homepage').href = inputUrl.value
                document.getElementById('homepage').innerHTML = inputUrl.value
            }

        }

}