const express = require("express");
const multer = require("multer");

const app = express();

// with this app start using public folder !!
app.use(express.static("public"));
// body me json data aata hai
app.use(express.json());

// fileFilter => specific file (jpg , jpeg , png , gif)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file.fieldname == "user"){
            cb(null, 'public/img/users')
        }else if(file.fieldname == "plan"){
            cb(null , 'public/img/plans')
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
})

function fileFilter (req, file, cb) {
    // To reject this file pass `false`, like so:
    console.log(file);
    if(file.mimetype.includes('image')){
        cb(null, true)
    }else{
        cb(null, false)
    }
  }

const upload = multer({ storage: storage , fileFilter:fileFilter });

// multer => form data waha se wo images/files unko access
app.post("/uploadProfilePhoto" , upload.single("user")  , function(req , res){
    // console.log("body" , req.body);
    console.log("file" , req.file);
    // console.log("files" , req.files);
    // filePath => mongoDB{   profilePath :"filePath"}
})


app.post("/uploadPlans" , upload.single("plan") , function(req , res){
    console.log("file" , req.file);
})


app.listen(3000 , function(){
    console.log("server started at port 3000");
})

