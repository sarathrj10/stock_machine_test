const bcrypt = require('bcrypt');
const user = require('../models/user');
const product = require('../models/product');


module.exports = {
    login: (req, res) => {
        try {
            res.render('user/login')
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    signup: (req, res) => {
        try {
            res.render('user/signup')
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    signUpPost: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;
            let ifExists = await user.find({ email: Email }).exec()
            if (ifExists.length) {
                res.render('user/signup', { signUpErr: 'Email ID already exists' })
            } else {
                let password = await bcrypt.hash(Password, 10)
                await new user({
                    Name,
                    email: Email,
                    password: password
                }).save()
                res.redirect('/login')
            }

        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    dash: async (req, res) => {
        try {
            let user = null;
            if (req.session && req.session.user) {
                user = req.session.user
            }
            let products = await product.find({}).exec()
            res.render('index', { products, user });

        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    loginPost: async (req, res) => {
        try {
            const { Email, Password } = req.body;
            let userProfile = await user.findOne({ email: Email }).exec()
            if (userProfile) {
                if (await bcrypt.compare(Password, userProfile.password)) {
                    req.session.user = userProfile.Name;
                    res.redirect('/')
                } else {
                    res.render('user/login', { loginErr: 'invalid email or password' })
                }
            } else {
                res.render('user/login', { loginErr: 'invalid email or password' })
            }

        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.clearCookie('StockCookie');
        res.redirect('/login')
    },
    filter: async (req, res) => {
        const { filter } = req.query;
        let products = await product.find({ Name: { $regex: `${filter}` } }).exec();
        res.send(products);
    }

}
