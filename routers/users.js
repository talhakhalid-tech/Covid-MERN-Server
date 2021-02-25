const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth.js')

const router = new express.Router()

router.post('/users/register',async (req,res) => {
    try{
        const user = new User(req.body)
        await user.save()
        res.status(200).send()
    } catch {
        res.status(400).send()
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.userCredentials(req.body.email,req.body.password)
        const token = await user.genAuthToken()
        res.status(200).send(token)
    } catch(e) {
        res.status(404).send(e)
    }
})

router.get('/users/profile/me',auth ,async (req,res) => {
    try{
        const newUser = req.user.toObject()

        delete newUser.password

        res.status(200).send(newUser)
    } catch{
        res.status(404).send()
    }
})

router.delete('/users/delete/me',auth , async(req,res) => {
    try{
        await req.user.remove()
        res.send()
    }catch{
        res.status(500).send()
    }
})

router.patch('/users/update/me',auth, async(req,res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','age','password','email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'})
    }
    try{
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save() 
        res.send(req.user)       
    } catch {
        res.status(500).send()
    }
})

module.exports = router