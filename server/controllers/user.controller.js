
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.createUser = (req, res) => {
    console.log(req.body.user);
    User.create(req.body.user)
        .then(newUser => res.json({ newUser }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}

module.exports.login = async(req, res) => {
    try{
        //const user = await User.findOne({ email: req.body.user.email });
        //if(!user){
        if(req.body.user.email !== 'admin'){
            return res.status(403).json({ msg: 'Usuario no existe en base de datos' });
        }else{
            //const isValidPassword = await bcrypt.compare(req.body.user.password, user.password);
            //if(isValidPassword){
            if(req.body.user.password === '12345'){
                const newJwt = jwt.sign({
                    _id: 'admin'
                    //_id: user._id,
                //name: user.name
            }, process.env.SECRETKEY);
            res
                .cookie('_usertoken', newJwt, { httpOnly: true})
                .json({ msg: 'Se ha logueado', 'cookie': newJwt})
                .send('Done');
            }else{
                return res.status(403).json([{ msg: 'Contraseña incorrecta'}])
            }
        }
    }catch(err){
        return res.status(403).json({ msg: 'Credenciales invalidas', err })
    }        
}

module.exports.logout = (_,res) => {
    try {
        return res
                .clearCookie('_usertoken')
                .json({ msg: 'Token eliminado'})
    }catch(err){
        return res.status(403).json({ msg: 'Usuario sin token', err })
    }
}

module.exports.ingreso = (_, res) => {
    try{
        res.json({ msg: 'Bienvenido' });
    }catch(err){
        return res.status(403).json({ msg: 'Te vas ahora mismo, no tienes permisos', err })
    }
}

module.exports.getUsers = (req, res) => {
    User.find()
        .then(users => res.json({ users }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the users' }))
}

module.exports.getUserById = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json({ user }))
        .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the user' }));
}

module.exports.deleteAll = async (req, res) => {
    await User.deleteMany()
        .then(deleted => res.json({ deleted }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the user' }));
}

module.exports.findUserWithExperience = (req, res) => {
    const exp = req.params.experience;
    console.log(exp);
    User.aggregate().match({ experience: { $in: [exp] } })
        .then(users => res.json({ users }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the users with that experience' }));
}

module.exports.deleteUser= (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({ deleteConfirmation }))
        .catch(err => res.status(500).json({ msg: 'Ups no hemos podido contratar el usuario', error: err }));
}