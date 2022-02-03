const { models: {User} } = require('../db')

const isUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const user = await User.findByToken(token)
        req.user = user
        next()
    }
    catch(err) {
        next(err)
    }
}

const isAdmin = async (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).send('No, no, no! Let me stop you right there!')
    } else {
        next()
    }
}

module.exports = {
   isUser,
   isAdmin
}