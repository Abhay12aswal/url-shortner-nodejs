const express = require('express');
const urlRoute= require('./routes/url');
const { connectTomongoDB } = require('./connect');
const URL = require('./models/url');

const app = express();
const PORT= 8000;
app.use(express.json());

connectTomongoDB('mongodb://localhost:27017/short-url')
.then(()=> console.log('mongodb connected')).catch((err)=>{
    console.log(err)
})


app.use('/url',urlRoute)

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    })

    res.redirect(entry.redirectURl);
})


app.listen(PORT,()=>{
    console.log(`app listening to ${PORT}`)
})