const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ipansuryadi:ipansuryadi@cluster0-x6osf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  if (err) {
    console.log(err)
  }
});


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res)=>{
  res.send('Hallo')
})

app.get('/posts', (req, res) => {
  setTimeout(() => {
    
    res.send(
      [
        {
          title: "hello world",
          description: "how are you?"
        }
      ]
      )
    }, 2000);
})

app.get('/todos', (req, res) => {
  const collection = client.db("test").collection("todos")
  collection.find().toArray((err, result) => {
    if (err) {
      console.log(err)
      res.send([])
      return
    }
    res.send(result)
  })
})
let count = 0
app.post('/login', (req, res) => {
  setTimeout(() => {
    if (count%2===0) { 
      res.status(400).send({ error: 'Something failed!' })
    }else{
      res.status(200).send({
        data:{...req.body}
      })
    }
    count++
  }, 2000);
})

app.listen(process.env.PORT || 8081)