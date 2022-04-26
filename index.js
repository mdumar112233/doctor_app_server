const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json())

const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('doctor app server')
})


client.connect(err => {
  const appointmentCollection = client.db("doctor_app").collection("appointment");
  // const userCollection = client.db("akIndustry").collection("userInfo");
  // const reviewsCollection = client.db("akIndustry").collection("reviews");
  // const adminCollection = client.db("akIndustry").collection("admin");

  app.post('/appointment', (req, res) => {
    const appointment = req.body;
    console.log(appointment)
    appointmentCollection.insertOne(appointment)
    .then(result => {
        res.send(result.insertedCount > 0);
    })
  })

  app.patch('/update/:id', (req, res) => {
    appointmentCollection.updateOne({_id: ObjectID(req.params.id)},
    {
      $set:{ status: req.body.status}
    })
    .then(result => {
      console.log('updated')
    })
  })
  
  app.get('/getallappointment', (req, res) => {
    appointmentCollection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
    })
  app.get('/getuserappointment', (req, res) => {
  appointmentCollection.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents)
  })
  })

  app.delete('/delete/:id', (req, res) => {
  appointmentCollection.deleteOne({_id: ObjectID(req.params.id)})
  .then(result => {
    res.send(result.deletedCount > 0);
  })
  })
});
app.listen(port)



