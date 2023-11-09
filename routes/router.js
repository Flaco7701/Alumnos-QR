const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    res.render('index', {user:req.user})
})
router.get('/login', (req, res)=>{
    res.render('login', {alert:false})
})
router.get('/register', (req, res)=>{
    res.render('register', {alert:false})
})
router.get('/createqr', (req, res)=>{
    res.render('createqr', {alert:false})
})
router.get('/buscar', (req, res)=>{
    res.render('buscar')
})

//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/buscar', authController.buscar)
router.post('/createqr', authController.createqr)


module.exports = router