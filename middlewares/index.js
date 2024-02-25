const fs = require("fs")

const logReqRes = (fileName) => {
    return (req,res,next) => { 
        fs.appendFile(
            fileName,
            `\n${Date.now()}:${req.ip} ${req.method} : ${req.path}\n`,
            (err,data)=>{
                if(!err){
                    next()
                }
                else{
                    console.log("Error at middleware:", err);
                }
            }
        )
    }
}

module.exports = {logReqRes} 