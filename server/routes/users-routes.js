const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post('/signup', [
    check('name').not().isEmpty(),
    check('email').not().isEmpty().isEmail().normalizeEmail(),
    check('password').not().isEmpty().isLength({ min: 6 })
], usersController.signup);

router.post('/login', [
    check('email').not().isEmpty().isEmail().normalizeEmail(),
    check('password').not().isEmpty().isLength({ min: 6 }) 
], usersController.login);

module.exports = router;
