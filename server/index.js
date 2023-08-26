const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const admin_router = require('./routes/admin.routes')
const logo_router = require('./routes/navLogo.routes');
const slider_router = require('./routes/slider.routes');
const service_router = require('./routes/services.routes');
const category_router = require('./routes/categories.routes');
const work_router = require('./routes/works.routes');
const prices_router = require('./routes/prices.routes');
const team_router = require('./routes/team.routes');
const skill_router = require('./routes/skills.routes');
const progress_router = require('./routes/progress.routes');
const blog_router = require('./routes/blogs.routes');
const blog_slider_router = require('./routes/blogSlider.routes');
const blog_detail_router = require('./routes/blogDetail.routes');
const product_router = require('./routes/products.routes');
const product_slider_router = require('./routes/productSlider.routes');
const comments_router = require('./routes/comments.routes');
const contact_slider_router = require('./routes/contactSlider.routes');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());


app.use('/api', admin_router)

app.use('/images', express.static('images'))

app.use('/detailimages', express.static('detailimages'))

app.get('/api', (req, res) => {
    res.send('Hello World!')
  })

app.use('/api/logo', logo_router)  

app.use('/api/sliders', slider_router)  

app.use('/api/services', service_router)  

app.use('/api/categories', category_router)  

app.use('/api/works', work_router)  

app.use('/api/prices', prices_router)

app.use('/api/team', team_router) 

app.use('/api/skills', skill_router)

app.use('/api/progress', progress_router)

app.use('/api/blogs', blog_router)

app.use('/api/blogslider', blog_slider_router)

app.use('/api/blogdetail', blog_detail_router)

app.use('/api/products', product_router)

app.use('/api/product-slider', product_slider_router)

app.use('/api/comments', comments_router)

app.use('/api/contact-slider', contact_slider_router)

DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(()=>{
    console.log('MongoDB Connected')
})


PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})