const bodyParser = require('body-parser');
const client = require('./connection.js')
const express = require('express');
const app = express();

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();


// To fetch complete patient list with details

app.get('/medx_voicebot', (req, res)=>{
    client.query(`Select * from medx_voicebot`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

// To fetch patient details by id.

app.get('/medx_voicebot/:id', (req, res)=>{
    client.query(`Select * from medx_voicebot where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//To add new user


app.post('/medx_voicebot', jsonParser, (req, res)=> {
    const user = req.body;
    console.log(user);
    console.log(req);
    let insertQuery = `insert into medx_voicebot(Medicines, Symptoms, AdverseEvents, NoMedicineReason) 
                       values('${user.medicines}', '${user.symptoms}', '${user.adverseevents}', '${user.nomedicinereason}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    client.end;
})
