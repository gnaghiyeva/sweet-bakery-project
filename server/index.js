const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const admin_router = require('./routes/admin.routes')
const logo_router = require('./routes/navLogo.routes')
dotenv.config();
app.use(bodyParser.json());
app.use(cors());


app.use('/api', admin_router)

app.use('/images', express.static('images'))

app.get('/api', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/api/logo', logo_router)  

DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(()=>{
    console.log('MongoDB Connected')
})


PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})