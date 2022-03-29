const InvestmentModel = require('../models/Investment');

async function create(req, res){ 
    console.log('request body is',req.body);
    try {
        await InvestmentModel.create({
            name: req.body.name, 
            description: req.body.description, 
            address: req.body.address,
            value: parseInt(req.body.value)
        });
        res.status(200).json('ok')
    } catch(e) {
        res.status(400).json(e);
    }
}

async function index (req, res)  {
    try {
        let investments = await InvestmentModel.find().exec();
        res.status(200).json(investments)         
    } catch(err) {
        res.status(400).json(err);
    }
}

module.exports = {
    create, 
    index,
}