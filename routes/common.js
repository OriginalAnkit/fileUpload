const path=require('path');
let welcomePage=function (req,res) {
    res.sendFile(path.join(__dirname,"../public/welcome.html"))
}

let mainPage=function (req,res) {
    res.sendFile(path.join(__dirname, "../public/main.html"))
}

module.exports ={
    welcomePage,
    mainPage
}