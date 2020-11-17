
const fs = require('fs')
const dinoRouter = require('express').Router()

dinoRouter.get("/", (req, res) => {

    const rawDinos = fs.readFileSync("./dinosaurs.json")
    const dinos = JSON.parse(rawDinos)
    res.render('dinosaurs/index', { dinos })
})

dinoRouter.get('/new', (req, res) => {
    res.render('dinosaurs/new')
})

dinoRouter.get("/:id", (req, res) => {
    const rawDinos = fs.readFileSync("./dinosaurs.json")
    const dinos = JSON.parse(rawDinos)
    const id = parseInt(req.params.id)
    const dino = dinos[id]

    res.render('dinosaurs/show', { dino })
})

dinoRouter.post('/', (req, res) => {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    dinos.push(newDino)
  
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
  
    res.redirect('/dinosaurs')
})

dinoRouter.get('/search/:searchTerm', (req, res) => {
    const newDino = req.body
    const rawDinos = fs.readFileSync('./dinosaurs.json')
    const dinos = JSON.parse(rawDinos)
    const searchTerm = req.params.searchTerm
    //note that the details of the search are up to you
    //do partial matches count? do we look at the type as well as the name prop? 
    //this is a crude, 1st draft kind of search
    const filterDinos = dinos.filter((dino) => dino.name.toLowerCase() === searchTerm.toLowerCase())

    res.render('dinosaurs/index', { dinos: filterDinos})

})

module.exports = dinoRouter