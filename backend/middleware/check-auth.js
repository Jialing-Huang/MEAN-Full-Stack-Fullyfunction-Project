const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    let token;
    try{
        //Parse the header info and get jwt string
        this.token = req.headers.authorization.split("Bearer")[1];
        //Verify the jwt info correct or not the verified string issued by jwt.sign() in user.js file 
        jwt.verify(this.token,"secret_this_should_be_longer");
        next();
    }catch(error){
        res.status(401).json({
            token: this.token,
            message:"Auth failed at middleware!"
        });
    }
    
};