import express from 'express';
import resto from './resto'


const app = express();

app.use('/resto', resto);

app.listen(5000,()=> console.log('server run'));


