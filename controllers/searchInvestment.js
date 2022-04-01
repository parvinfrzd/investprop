const InvestmentModel = require('../models/Investment');

async function search(req, res){ 
    console.log('request body is',req.body);
    try {
        let investArray = await InvestmentModel.find({ name: { $regex: req.body.name, $options: "i" } }).exec();
        res.status(200).json(investArray)
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
    search, 
    index,
}