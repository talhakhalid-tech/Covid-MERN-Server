const jwt = require('jsonwebtoken')
const User = require('../models/users.js')

const auth = async(req,res,next) => {
    try{
        const decoded = await jwt.verify(req.header('Authorization').replace('Bearer ',''),'covid19')
        req.user = await User.findById({_id: decoded._id})
        next()
    } catch {
        res.status(404).send({Error: "user not authenticated"})
    }
}

module.exports = auth