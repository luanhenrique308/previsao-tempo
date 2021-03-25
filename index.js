var expess = require('express');
var app = expess();
var dotenv = require('dotenv').config()
var axios = require('axios');
var cors = require('cors')

const url = `http://api.openweathermap.org/data/2.5/weather?q=Recife&appid=${process.env.API_KEY}&lang=pt_br&units=metric`

app.use(cors());

app.get('/', (req, res)=>{
    axios.get(url).then((data)=>{
        console.log(data.data)
        return res.send(data.data)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

app.listen(8080, ()=>{
    console.log('servidor rodando');
});
