const Joboffer = require('../models/joboffer.model');


module.exports.createJoboffer = (req, res) => {
    Joboffer.create(req.body.joboffer)
        .then(newJoboffer => res.json({ newJoboffer }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to create the offer' }));
}

module.exports.getJoboffers = (req, res) => {
    Joboffer.find()
        .then(joboffers => res.json({ joboffers }))
        .catch(err => res.status(500).json({ error: err, msg: 'Ups havent been able to bring the offers' }));
};

module.exports.getJobById = (req, res) => {
    Joboffer.findById(req.params.id)
        .then(joboffer => res.json({ joboffer }))
        .catch(err => res.status(404).json({ error: err, msg: 'Ups havent been able to bring the offer' }));
}

module.exports.deleteJob= (req, res) => {
    Joboffer.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({ deleteConfirmation }))
        .catch(err => res.status(500).json({ msg: 'Ups no hemos podido borrar la oferta', error: err }));
}

module.exports.updateJob = (req, res) => {
    Joboffer.findByIdAndUpdate(req.params.id, req.body.joboffer, { new: true })
        .then(updateJoboffer => res.json({ updateJoboffer }))
        .catch(err => res.status(500).json({ msg: 'Ups no hemos podido actualizar el Dojo', error: err }))
}

module.exports.addVisitsCounter = (req, res) => {
    Joboffer.findByIdAndUpdate(req.params.id, {$inc: { visits: 1} }, { new: true }  )
    .then(addVisists => res.json({ addVisists }))
    .catch(err => res.status(500).json({ msg: 'No se pudo actualizar las visitas', error: err }))
}
