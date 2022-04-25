const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('doctor app server')
})


client.connect(err => {
  const appointmentCollection = client.db("doctor_app").collection("appointment");
  // const userCollection = client.db("akIndustry").collection("userInfo");
  // const reviewsCollection = client.db("akIndustry").collection("reviews");
  // const adminCollection = client.db("akIndustry").collection("admin");

  app.post('/appointment', async (req, res) => {
    const appointment = req.body;
    console.log(appointment)
    try {
      const data = await appointmentCollection.insertOne(appointment)
      res.send(data.insertedCount > 0)
    } catch (error) {
      console.log(error)
    }
  })

  app.get('/getappointmentdata', (req, res) => {
  appointmentCollection.find({})
  .toArray((err, documents) => {
    res.send(documents)
  })
  })


  // app.post('/review', (req, res) => {
  //   const review = req.body;
  //   reviewsCollection.insertOne(review)
  //   .then(result => {
  //     res.send(result.insertedCount > 0)
  //   })
  // })

  // app.post('/userInfo', (req, res) => {
  //   const userInfo = req.body;
  //   userCollection.insertOne(userInfo)
  //   .then(result => {
  //     res.send(result.insertedCount > 0);
  //   })
    
  // })

  // app.post('/addAdmin', (req, res) => {
  //   const admin = req.body;
  //   adminCollection.insertOne(admin)
  //   .then(result => {
  //     res.send(result.insertedCount > 0);
  //   })
  // })

  // app.patch('/update/:id', (req, res) => {
  //   userCollection.updateOne({_id: ObjectID(req.params.id)},
  //   {
  //     $set:{ status: req.body.status}
  //   })
  //   .then(result => {
  //     console.log(result);
  //   })
  // })


  // app.get('/reviewData', (req, res)=> {
  //   reviewsCollection.find({})
  //   .toArray((err, documents) => {
  //     res.send(documents)
  //   })
  // })

  // app.get('/serviceInfo/:id', (req, res) => {
  //   const id = req.params.id;
  //   servicesCollection.find({name: id})
  //   .toArray((err, documents) => {
  //     res.send(documents[0])
  //   })
  // })

  // app.get('/allUserData', (req, res) => {
  //   userCollection.find({})
  //   .toArray((err, documents) => {
  //     console.log('data is come');
  //     res.send(documents);
  //   })
  // })

  // app.get('/status', (req, res) => {
  //   userCollection.find({email: req.query.email})
  //   .toArray((err, documents) => {
  //     res.send(documents[0]);
  //   })
  // })

  // app.get('/getAdmin', (req, res) => {
  //   adminCollection.find({})
  //   .toArray((err, documents) => {
  //     res.send(documents)
  //   })
  // })

  // app.delete('/delete/:id', (req, res) => {
  //   servicesCollection.deleteOne({_id: ObjectID(req.params.id)})
  //   .then(result => {
  //     res.send(result.deletedCount > 0);
  //   })
  // })

});






app.listen(port)



