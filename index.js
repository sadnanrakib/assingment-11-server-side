const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

// servicedb
// 4kyWcsduOhXBm9yE



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tsk4obg.mongodb.net/?retryWrites=true&w=majority`;
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
 try{
   const serviceCollection = client.db('serviceProduct').collection('services');
   

   app.get('/services',async (req,res)=>{
    const query = {};
    const cursor = serviceCollection.find(query);
    const services = await cursor.toArray();
    res.send(services);
   })

   app.get('/services/:id',async(req,res)=>{
    const id = req.params.id;
    const query ={_id:ObjectId(id)};
    const service = await serviceCollection.findOne(query);
    res.send(service);
   })
 }
 finally{

 }
}

run().catch(err=>console.error(err))


app.get('/',(req,res)=>{
    res.send("Assingment 11 is Running");
})

app.listen(port,()=>{
    console.log(`app running on port ${port}`)
})