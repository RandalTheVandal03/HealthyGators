const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService')

const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.get('/getAll', (request,response)=>{
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/search/:name/:tag', (request, response) =>{
    nam = request.params.name;
    tag = request.params.tag;
    const db = dbService.getDbServiceInstance();

    if(nam == 'null' && tag != 'null'){
        const result = db.searchT(tag);
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
    }
    else if(nam != 'null' && tag == 'null'){
        const result = db.searchN(nam);
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
    }
    else if(nam != 'null' && tag != 'null'){
        const result = db.searchB(nam,tag);
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
    }
    else{
        
        const result = db.getAllData();
    
        result
        .then(data => response.json({data : data}))
        .catch(err => console.log(err));
    }
})

app.listen(3000, () =>{
    console.log('Server Started on port 3000')
});