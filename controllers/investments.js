const InvestmentModel = require('../models/Investment');

async function create(req, res){ 
    console.log('request body is',req.body);
    try {
        await InvestmentModel.create({
            name: req.body.name, 
            description: req.body.description, 
            value: parseInt(req.body.value)
        });
        res.status(200).json('ok')
    } catch(e) {
        res.status(400).json(e);
    }
}

module.exports = {
    create, 
}