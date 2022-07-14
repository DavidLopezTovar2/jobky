const { 
    createUser,
    deleteAll,
    findUserWithExperience,
    getUsers,
    getUserById,
    deleteUser,
    ingreso,
    login,
    logout
 } = require('../controllers/user.controller');
 const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/users/create',createUser);
    app.post('/api/users/login', login);
    app.get('/api/users/ingreso', authenticate, ingreso);
    app.delete('/api/users/delete/all',deleteAll);
    app.get('/api/users/findByExperience/:experience',findUserWithExperience);
    app.get('/api/users',getUsers);
    app.get('/api/user/:id',getUserById);
    app.delete('/api/user/delete/:id',deleteUser);
    app.get('/api/users/logout',authenticate,logout)
}
