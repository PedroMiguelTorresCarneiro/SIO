import AbstractPage from "./AbstractPage.js";

export default class extends AbstractPage {
    constructor(){
        super();
        this.setTitle("My List");
    }

    async getHtml() {
        return `
        <h4> 
            This page serves to help you organize what books you are interested in. 
             You can use the box below to write the name of the books and they will 
             stay there until you delete them. You can also upload pictures from the books,such as covers, 
             that you downloaded from the internet to give more of a visual appearance. You're free to navigate the rest 
             of the bookstore and you can always come back to this page. 
        </h4>
        
        <ul id="books"></ul>

        <form> 
            <input name="book" type="text">
            <input type="submit" value="Add Book">
            <input id="buttonClear" type="button" value="Clear List">
        </form>
        
        <h3>Upload your book cover</h3>
        
        <form method="POST" action="/upload" enctype="multipart/form-data">
            <div>
                <label>Select your image:</label>
                <input type="file" name="profile_pic" />
            </div>
            <div>
                <input type="submit" name="btn_upload_profile_pic" value="Upload" />
            </div>
        </form>

        <h3> If your upload doesn't show your image, click below </h3>
            <input type="file" id="Image"/>
            <img src="" id="tableBanner"/>
        `;
    }

    async getJS() {
        let form  = document.querySelector('form')
        let input = document.querySelector("[name='book']")
        let bookList = document.getElementById('books')

        document.getElementById("buttonClear").onclick = ClearBooks
        
    
        let existingBooks = JSON.parse(localStorage.getItem('books')) || []

        const books = []
        
        existingBooks.forEach(book => {
            addBook(book)        
        })

        function addBook(bookText) {    
            books.push(bookText)
            var li = document.createElement('li')
            li.innerText = bookText
            deleteBookButton(li,bookText)
            bookList.appendChild(li)
            localStorage.setItem('books', JSON.stringify(books))
            input.value = ''
        }

        function ClearBooks() {
            bookList.parentNode.removeChild(bookList)
            localStorage.clear('books')
            window.location.reload()
        }

        function deleteBookButton(parent, bookText) {
            var buttonElem = parent.appendChild(document.createElement("button"))
            buttonElem.innerHTML = "Delete"
            buttonElem.onclick = function() {
                this.parentElement.remove()
                var bookIndex = books.indexOf(bookText)
                books.splice(bookIndex, 1);
                localStorage.setItem('books', JSON.stringify(books))
            }
        }

        form.onsubmit = (e) => {
            e.preventDefault() 
            if(input.value != '')
            addBook(input.value)
        }

    //----------------------Show image and store in localStorage-----------------------

    var image = document.getElementById('Image');
    var img = document.getElementById('tableBanner');


    image.addEventListener('change', function() {
        var file = this.files[0];
        // File checking.
        if (file.type.indexOf('image') < 0) {
            res.innerHTML = 'invalid type';
            return;
        }

        var fReader = new FileReader();


        fReader.onload = function() {
            img.src = fReader.result;
            localStorage.setItem("imgData", getBase64Image(img));
        };

        fReader.readAsDataURL(file);
    });

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    function fetchimage () {
        var dataImage = localStorage.getItem('imgData');
        img.src = "data:image/png;base64," + dataImage;
    }

    fetchimage();
        
    }
        
}