const express = require('express');
const path=require('path');
const bodyParser=require("body-parser")
const multer =  require("multer");

const common= require('./routes/common');
const localupload=require("./routes/localupload");

const app = express();
const port=3000;
const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //FIXME  if folder doesnot exist it will return an error
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.fieldname + '-' + Date.now() +"."+ file.originalname.split(".")[1])
    }
})
const upload = multer({ storage })
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(bodyParser({limit:"50mb"}))
app.use("/public",express.static(path.join(__dirname,"public")))

app.get("/",common.mainPage)
app.post("/localupload", upload.array('files',10), localupload.localFileUpload);
app.post("/localFileUploadByFileReader", localupload.fileUploadViaFileReader)
app.use(common.welcomePage)

app.listen(port,()=>{
    console.log(`listeing at ${port}`)
})