const express = require("express");
const path = require("path");
var crud = require('./db.js');
const cors = require('cors');
const multer = require("multer");
const fileCheck = require('./fileCheck');


const router = express.Router();
const app = express();

app.use(cors({
    origin: 'http://localhost:2000/',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/home", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/booklist", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/cart", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/user", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/booksavailable", (req, res) =>{
    res.sendFile(path.resolve("index.html"));
});
app.get("/login", (req, res) =>{
    res.sendFile(path.resolve("index.html"));
});

router.use(cors({
    origin: 'http://localhost:2000/',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//---------------------API ENDPOINTS---------------------//
router.post("/login", (req, res) =>{
    var login = {
        username : req.body.username,
        password : req.body.password 
    }
    crud.login(login, function(result){
        return res.send(result);
    });
    
});

router.post("/register", (req, res) =>{ 

    var user = {
        username : req.body.username,
        password : req.body.password 
    }
    crud.registerUser(user, function(result){
        return res.status(200).json(result);
    });
});

router.get("/books", (req, res) =>{
    crud.getBooks(function(data){
        return res.status(200).json(data);
    });
});

router.get("/book", (req, res) =>{ 
    var name = req.query.name;
    crud.getBookByName(name, function(data){
        return res.status(200).json(data);
    });
});

router.get("/user", (req, res) =>{ 
    var name = req.query.name;
    console.log(req.params)
    crud.getUser(name, function(data){
        return res.status(200).json(data);
    });
});
router.put("/user/:name", (req, res) =>{ 
    var name = req.params.name;
    var user = {
        username : req.body.username,
        password : req.body. password 
    }
    console.log(name,user)
    crud.updateUser(name, user,function(data){
        return res.status(200).json(data);
    });
});

router.post("/book", (req, res) =>{
    var book = {
        name : req.body.name,
        author : req.body.author,
        date: req.body.date 
    }
    crud.insertBook(book, function(result){
        return res.status(200).json(result);
    });
});

app.use("/js",express.static(path.resolve(__dirname,"js")));
app.use("/api/",router);
//--------------------------------------File Upload ----------------------------------------------------------------

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'upload/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

app.post('/upload', (req, res) => {
    let upload = multer({ storage: storage, fileFilter: fileCheck.imageFilter }).single('profile_pic');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        res.send(`Upload successful<p><a href="http://localhost:2000/BookList">Click here to go the previous page</a></p>`);
    });
});

app.use(express.static(__dirname + '/upload'));


//------------------------------Server Start ----------------------------------------------------------------
//run "node server.js"
app.listen(process.env.PORT || 2000, () => console.log("Server running..."));



