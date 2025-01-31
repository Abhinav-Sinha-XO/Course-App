const jwt = require("jsonwebtoken")
const { JWT_secret } = require('../context')



function adminmiddleware(req,res,next){
  const token = req.headers.authorization
  const words = token.split(" ");
  const jwttoken = words[1]
  const decodedvalue= jwt.verify(jwttoken, JWT_secret)
  if(decodedvalue.username){
    next()
  }else{
    res.status(403).json({
      msg:"Admin not authenticated"
    })
  }
}




module.exports = adminmiddleware;