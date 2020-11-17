
const fs = require('fs')
const crytpidController = require('express').Router()

crytpidController.get("/", (req, res) => {
    const rawCryptid = fs.readFileSync("./cryptids.json")
    const cryptids = JSON.parse(rawCryptid)
    res.render('cryptids/index', { cryptids })
})

crytpidController.get('/new', (req, res) => {
    res.render('cryptids/new')
})

crytpidController.get("/edit/:id", (req, res) => {
    res.render('cryptids/edit')
})

crytpidController.get("/:id", (req, res) => {
    const rawCryptid = fs.readFileSync("./cryptids.json")
    const cryptids = JSON.parse(rawCryptid)
    const id = parseInt(req.params.id)
    const cryptid = cryptids[id]

    res.render('cryptids/show', { cryptid })
})

crytpidController.post('/', (req, res) => {
    const newCryptid = req.body
    const rawCryptid = fs.readFileSync('./cryptids.json')
    const cryptids = JSON.parse(rawCryptid)
    cryptids.push(newCryptid)

    console.log(newCryptid)
  
    fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids))
  
    res.redirect('/cryptids')
})

module.exports = crytpidController