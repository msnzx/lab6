const express = require('express'); // load express module
const nedb=require('nedb-promises');

const app = express(); // init app
const db=nedb.create('myfile.json');

app.use(express.static('public')); // enable static routing
app.use(express.json());    //enable auto-json conversion


//create route
app.post('/data',(request,response)=>{
        const doc=request.body;
        db.insertOne(doc)
        .then(doc=>{    //i get back the entire document, but I just send back the id of the doc, you can also send back the whole doc
            response.send({_id:doc._id}); //JUST SENDING BACK ID FOR THE DOC
        })
        .catch(err=>{
            response.send({error:"Could not insert document"+error});
    })
});

//read route for just id
app.get('/data/:id',(request,response)=>{
        db.findOne({_id:request.params.id})
        .then(docs=>response.send(docs))
        .catch(err=>response.send(err));
});
//read route for all docs
app.get('/data',(request,response)=>{
    db.find({})
    .then(docs=>response.send(docs))
    .catch(err=>response.send(err));
});


//update route
app.patch('/data/:id',(request,response)=>{
        db.updateOne(
            {_id:request.params.id},
            {$set:request.body}
        ).then(result=>response.send({result}))
        .catch(error=>response.send({error}));
});

//delete route
app.delete('/data/:id',(request,response)=>{
    db.deleteOne({_id:request.params.id})
    .then(result=>response.send({result}))
    .catch(error=>response.send({error}));
})

// default route
app.all('*',(request,response)=>{response.status(404).send('Invalid URL.')});
// start server
const PORT=3000;
app.listen( PORT, ()=>console.log('server started… http://localhost:'+ PORT));