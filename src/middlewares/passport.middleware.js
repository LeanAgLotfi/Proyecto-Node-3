import passport from 'passport'

const passportCall = (strategy, options = {}) =>{
    return async(req, res, next) =>{
        await passport.authenticate(strategy, {session: false, ...options},
            (error, user, info) => {
            if(error){
                return next(error)
            }
            if(!user){
                return res.status(401,'User Unauthorized').send({error: info?.messages ?? `${info}`})
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

export default passportCall;