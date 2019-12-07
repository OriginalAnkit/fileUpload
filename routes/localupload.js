let localFileUpload = function (req, res) {
    console.log(req.files, req.body);
    let urls = req.files.map(f => f.path.replace(/\\/g, "/"))
    res.json({ msg: "success", urls })
}

let fileUploadViaFileReader = function (req, res) {
    data = req.body.file;
    type=null;
    let reg=null
    switch (req.body.fileType) {
        case "image/jpeg":
            reg = /^data:image\/jpeg;base64,/;
            type=".jpeg";
            break;
    }
    let base64Data = data.replace(reg, "");
    base64Data += base64Data.replace('+', ' ');
    binaryData = new Buffer(base64Data, 'base64').toString('binary');
    require("fs").writeFile(__dirname+"/../public/uploads/"+Date.now()+type, binaryData, "binary", function (err) {
        console.log(err);
    });
}

module.exports = {
    localFileUpload,
    fileUploadViaFileReader
}