const express = require("express");
const path = require("path");
var crud = require('./db.js');
const cors = require('cors');
const multer = require("multer");


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
app.get("/login", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/booklist", (req, res) =>{ 
    res.sendFile(path.resolve("index.html"));
});
app.get("/user", (req, res) =>{
    res.sendFile(path.resolve("index.html"));
});
app.get("/cart", (req, res) =>{
    res.sendFile(path.resolve("index.html"));
});
app.get("/booksavailable", (req, res) =>{
    res.sendFile(path.resolve("index.html"));
});

router.use(cors({
    origin: 'http://localhost:2000/',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

router.post("/login", (req, res) =>{
    var login = {
        username : req.body.username,
        password : req.body.password 
    }
    crud.login(login,function name(result) {
        return res.status(200).json(result);
    });
    
});

router.post("/register", (req, res) =>{ 

    var user = {
        username : req.body.username,
        password : req.body. password 
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
    console.log(req.params)
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
    console.log(req.params,req.body)
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
  destination: (req, file, cb) => {
    cb(null, '../app');
  },
  filename: (req, file, cb) => {
    const { originalname} = file;
    cb(null, originalname);
  }
});

const upload = multer({storage: storage});

app.post('/upload', upload.single('something'), (req, res) => {
  return (res.json({ status : 'File uploaded, please go the previous page'}))
});

app.get("/testImage.png", (req, res) => {
    res.sendFile("/testImage.jpeg");
  });


//------------------------------Server Start ----------------------------------------------------------------

app.listen(process.env.PORT || 2000, () => console.log("Server running..."));



