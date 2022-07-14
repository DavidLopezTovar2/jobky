const { 
    createJoboffer,
    getJoboffers,
    getJobById,
    deleteJob,
    updateJob,
    addVisitsCounter
 } = require('../controllers/joboffer.controller');

 const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/joboffers', getJoboffers);
    app.post('/api/joboffers/create',authenticate,createJoboffer);
    app.get('/api/job/:id',getJobById);
    app.delete('/api/joboffer/delete/:id',authenticate,deleteJob);
    app.put('/api/joboffer/edit/:id',authenticate,updateJob);
    app.put('/api/joboffer/add-visists/:id',addVisitsCounter);
}