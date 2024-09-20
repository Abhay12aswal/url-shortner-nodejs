const URL = require('../models/url');
const shortid = require('shortid');


exports.handleGenerateNewShortUrl = async (req,res)=>{
    const body= req.body;
    if(!body.url){
        return res.status(400).json({
            error: 'url is requried'
        })
    }

    const shortId= shortid();

    await URL.create({
        shortId: shortId,
        redirectURl: body.url,
        visitHistory: [],
    })

    return res.json({
        id: shortId
    })  
}

exports.handleGetAnalytics = async(req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
}