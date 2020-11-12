import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

const makeCallback = require ('./call-back')
import {getMenuRestaurant, addPostMenu, addPostOrder} from './controller'

app.use(cors());

app.use(bodyParser.json());
app.get('/getMenuByIdRestaurant', makeCallback(getMenuRestaurant));
app.post('/postMenu', makeCallback(addPostMenu));
app.post('/orderFood', makeCallback(addPostOrder));


export default app;