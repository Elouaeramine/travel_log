const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const mongoose = require ('mongoose');

const logs = require('./api/logs');

const app = express();


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser : true ,
    useUnifiedTopology : true,
    
}).then( ()=> console.log("Database Connected ! ")
).catch(    
    err => console.log(err)
)

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin : process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/',(req,res)=> {
    res.json({
        message: 'Hello World!'
    })
});

app.use('/api/logs' , logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);



const port = process.env.PORT || 1337;

app.listen(port, ()=>{
    console.log(`Listenning at https://localhost:${port}`);
});