const express = require('express')
const { user } = require('pg/lib/defaults')
const router = express.Router()


const UserRepository = require('../database/repository/user')

let uRepo = new UserRepository()

// Buscar todos os Users
router.get('/', async(req, res) => {
    const users = await uRepo.findAll()
    resp = {
        status: 'OK',
        data: users
    }
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(resp))
})
// Buscar um User pelo id
router.get('/:id', async(req, res) => {

    let uid = parseInt(req.params.id)

    const users = await uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }

    resp = {
        status: 'OK',
        data: users
    }
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(resp))
})
// Cadastrar um novo User
router.post('/', async (req, res) => {
    let u = req.body

    if(u.name == undefined || u.email == undefined){
        resp = {
            status: 'Error',
            description:`User JSON with id, name and email fields must be provided.`
        }
        res.status(400).send(JSON.stringify(resp))
        return
    }

    const user = await uRepo.insert(u)
    resp = {
        status: 'OK',
        data: `User id ${user.id} created successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
// Atualizar um User já criado
router.put('/:id', async(req, res) => {

    let uid = parseInt(req.params.id)
    let u = req.body

    if(u.name == undefined || u.email == undefined){
        resp = {
            status: 'Error',
            description:`User JSON must be provided.`
        }
        res.status(400).send(JSON.stringify(resp))
        return
    }

    const user = await uRepo.find(uid)
    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }

    await uRepo.update(u, uid)

    resp = {
        status: 'OK',
        data: `User id ${uid} updated successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
// Excluir um usuário
router.delete('/:id', async(req, res) => {

    let uid = parseInt(req.params.id)
    const user = await uRepo.find(uid)

    if(user == undefined){
        resp = {
            status: 'Error',
            description:`User id ${uid} was not found.`
        }
        res.status(404).send(JSON.stringify(resp))
        return
    }
    await uRepo.delete(uid)

    resp = {
        status: 'OK',
        data: `User id ${uid} deleted successfully`
    }
    res.status(200).send(JSON.stringify(resp))
})
module.exports = router
