const router = require('express').Router()

const Person = require('../models/Person');

// Rotas da API e create de dados
router.post('/', async(req, res) => {

    const {name, salary, approved} = req.body

    // Validar
    if(!name) {
        res.status(422).json({error: 'É necessario ter um dado para cadastrar'})
        // Com o return ele para a requisição por aqui
        return
    }
    
    const person = {
        name,
        salary,
        approved
    }

    // Criar dados no MongoDB
    try {
        await Person.create(person)

        res.status(201).json({message: 'Cadastro efetuado com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Read / lendo dados
router.get('/', async (req, res) => {

    try {

        // Retornar todos os dados
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Filtrar
router.get('/:id', async (req, res) => {

    // Extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        
        // findOne() encontra SOMENTE um dado
        const person = await Person.findOne({_id: id})

        // Se não encontrar
        if(!person) {
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Update / atualização dos dados (PUT, PATCH)
// O put espera que a gente mande o objeto completo para mudar
// Patch é atualização parcial, não espera a mudança total dos dados
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved,
    }

    try {
        
        const updatedPerson = await Person.updateOne({_id: id}, person)

        // Validar
        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuario não encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Delete / deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id})

    // Se não encontrar
    if(!person) {
        res.status(422).json({message: 'Usuario não encontrado'})
        return
    }

    try {
        
        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Deletado com sucesso'})

    } catch (error) {
        
    }

})

module.exports = router