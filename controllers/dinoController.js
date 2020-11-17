const { raw } = require('express')
const fs = require('fs')
const dinoRouter = require('express').Router()

dinoRouter.get("/", (req, res) => {

    const rawDinos = fs.readFileSync("./dinosaurs.json")
    const dinos = JSON.parse(rawDinos)
    res.render('dinosaurs/index', { dinos })
})

module.exports = dinoRouter