const jwt = require("jsonwebtoken")

const auth = async (req,res,next) =>{
    const token = req.headers.authorization
  if(!token){
    return res.status(400).json({message:"Invalid token Login first"})
  }
  jwt.verify(token,"masai",function(err,decoded){
      if(err){
        res.status(400).json({message:"Please Login first"})
      }else{
        req.body.userID = decoded.userID
        next()
      }
  })
}

module.exports = {
    auth
}