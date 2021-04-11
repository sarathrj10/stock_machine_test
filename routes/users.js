var express = require('express');
var router = express.Router();

//controllers
let controller = require('../controllers/index');
let feedController = require('../controllers/feeder');

//middlewares
const redirectToDash = require('../middlewares/index').redirectToDash
const protectDash = require('../middlewares/index').protectDash

//get routes
router.get('/',protectDash,controller.dash)
router.get('/login',redirectToDash, controller.login);
router.get('/signup',redirectToDash, controller.signup);
router.get('/feed',feedController.feed);
router.get('/logout',controller.logout);
router.get('/search',controller.filter)

//post routes
router.post('/signup', controller.signUpPost);
router.post('/login',controller.loginPost);

module.exports = router;
