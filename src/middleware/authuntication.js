import jwt from "jsonwebtoken";




export const auth = async(req,res,next)=>{
    const token = req.header('token')
    
    if(!token)
        return res.status(401).json({message:'No token provided!!'})
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        req.user = decoded

        next()
    } catch (err) {
        return res.status(401).json({message:"Invalid Token!!"})
    }
    
}


    
    // export const auth = (req, res, next) => {
    //     let token = req.header('token')
    //     jwt.verify(token, process.env.JWT_KEY , function (err, decoded) {
    //         if (err) {
    //             res.json({ err })
    //         } else {
    //             req.user = decoded
                
    //             next()
    //         }
    //     });
    // }