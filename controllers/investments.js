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

async function index (req, res)  {
    try {
        // 1. grab all items from DB, sorted by date descending (being fancy!)
        let investments = await InvestmentModel.find().exec();
        console.log(investments);
        // 2. send to frontend
        res.status(200).json(investments)         
      } catch(err) {
        res.status(400).json(err);
      }
}

module.exports = {
    create, 
    index,
}