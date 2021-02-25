const express = require('express')
const axios = require('axios')

const router = new express.Router()

router.get('/corona/global/stats',async (req,res) => {
    try{
        const response = await axios.get('https://api.thevirustracker.com/free-api?global=stats', { responseType: 'json' })
        res.send(response.data.results)
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/countries/stats/:FL',async (req,res) => {
    try{
        const response = await axios.get(`https://api.thevirustracker.com/free-api?countryTotal=${req.params.FL}`,{responseType:'json'})
        res.send(response.data.countrydata)
    } catch(error){
        res.status(500).send(error)
    }
})

router.get('/countries/timeline/:FL',async (req,res) => {
    try{
        const response = await axios.get(`https://api.thevirustracker.com/free-api?countryTimeline=${req.params.FL}`,{responseType:'json'})
        res.send(response.data)
    } catch(error){
        res.status(500).send(error)
    }
})

module.exports = router