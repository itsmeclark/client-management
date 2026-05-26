export const isUserLoggin = (req, res, next) =>{
    if(!req.session.user){
        return res.json({
            isLoggedIn : false
        })
    }
    next()
}