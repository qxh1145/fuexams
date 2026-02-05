const checkRoles = (allowedRoles) => {
    return (req,res,next) => {
        if(!req.user) {
            return res.status(401).json({message: "You are not login yet"})
        }
        const userRole = req.user.role

        if(allowedRoles.includes(userRole)){
            next();
        }else{
            return res.status(403).json({message:"You are not allow to access this"})
        }
    } 
}
module.exports = checkRoles